import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Game from '../components/Game';
import dayjs from 'dayjs';

import path from 'path';
import { promises as fs } from 'fs';
import {
  FormattedPlayer,
  FormattedTeam,
  BasicAnswer,
  FormattedYear,
} from '../custom-types';
import Header from '../components/Header';

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

type HomeProps = {
  teams: FormattedTeam[];
  players: FormattedPlayer[];
  years: FormattedYear[];
  answer: BasicAnswer;
  imageUrls: string[];
};

const Home: React.FC<HomeProps> = ({
  teams,
  players,
  answer,
  years,
  imageUrls,
}) => {
  return (
    <>
      <Head>
        <title>worldiesle</title>
        <meta
          name="description"
          content="Generated by create next app"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Header />
        <div className={styles.bodyContent}>
          <div className="inner-container inner-container--hero">
            <h1 className={styles.heroText}>
              Guess the teams, scorer and year of this iconic or
              <span className="highlighted-text-secondary">
                {' '}
                worldie
              </span>{' '}
              goal from the pictures below
            </h1>
          </div>
          <Game
            teams={teams}
            players={players}
            years={years}
            answer={answer}
            imageUrls={imageUrls}
          />
        </div>
      </main>
    </>
  );
};

const LAUNCH_DATE = '2023-01-16';
const START_YEAR = 1994;

const getJsonFileFromS3 = async (fileName: string) => {
  const clientParams = {
    region: 'eu-west-2',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID_CUSTOM as string,
      secretAccessKey: process.env
        .AWS_SECRET_ACCESS_KEY_CUSTOM as string,
    },
  };
  const s3Client = new S3Client(clientParams);
  const command = new GetObjectCommand({
    Bucket: 'worldiesle',
    Key: fileName,
  });
  // return file as json object
  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 36 * 60 * 60,
  });
  const response = await fetch(signedUrl);
  const data = await response.json();
  return data;
};

const recursivelyGetSignedS3Images = async (
  i: number,
  signedUrls: string[],
  goalId: string,
  s3Client: any
): Promise<string[]> => {
  const command = new GetObjectCommand({
    Bucket: 'worldiesle',
    Key: `${goalId}/${i}.png`,
  });
  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 36 * 60 * 60,
  });

  let newArray = [...signedUrls, signedUrl];
  if (i === 5) {
    return newArray;
  }

  return recursivelyGetSignedS3Images(
    i + 1,
    newArray,
    goalId,
    s3Client
  );
};

const getSignedS3Images = async (goalId: string) => {
  const clientParams = {
    region: 'eu-west-2',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID_CUSTOM as string,
      secretAccessKey: process.env
        .AWS_SECRET_ACCESS_KEY_CUSTOM as string,
    },
  };
  const s3Client = new S3Client(clientParams);

  const signedUrls = await recursivelyGetSignedS3Images(
    1,
    [],
    goalId,
    s3Client
  );

  return signedUrls;
};

export async function getStaticProps() {
  console.log('RE-VALIDATING');
  const END_YEAR = dayjs().year();
  const daysSinceLaunch = dayjs().diff(LAUNCH_DATE, 'day');

  const jsonDirectory = path.join(process.cwd(), 'data');
  // Get the teams for suggestions
  const teamsFile = await fs.readFile(
    jsonDirectory + '/teams.json',
    'utf8'
  );
  // Get the players for suggestions
  const playersFile = await fs.readFile(
    jsonDirectory + '/players.json',
    'utf8'
  );

  const years: FormattedYear[] = [];
  for (let i = START_YEAR; i <= END_YEAR; i++) {
    years.push({
      id: i.toString(),
      names: [i.toString()],
    });
  }

  // TODO: type expected response?
  const answers = await getJsonFileFromS3('goals.json');
  const answer = answers[daysSinceLaunch];
  answer.dateId = dayjs().format('YYYY-MM-DD');
  answer.dayNumber = daysSinceLaunch;
  console.log('answer', answer);

  const signedUrls = await getSignedS3Images(answer.id);
  console.log('signedUrls', signedUrls);

  return {
    props: {
      teams: JSON.parse(teamsFile),
      players: JSON.parse(playersFile),
      years,
      answer,
      imageUrls: signedUrls,
    },
  };
}

export default Home;
