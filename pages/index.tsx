import Head from "next/head";
import styles from "../styles/Home.module.css";
import Game from "../components/Game";
import dayjs from "dayjs";

import path from "path";
import { promises as fs } from "fs";
import {
  FormattedPlayer,
  FormattedTeam,
  BasicAnswer,
  FormattedYear,
} from "../custom-types";
import Header from "../components/Header";
import Icon from "../components/Icon";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { usePrefersColorScheme } from "../hooks/use-prefers-color-scheme";
import { SETTINGS } from "../utils/settings";
import { useShowBirthday } from "../hooks/use-show-birthday";
import { useState } from "react";

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
  const darkOrLight = usePrefersColorScheme();

  const { showBirthdayMessage: eligibleToShowBirthdayMessage } =
    useShowBirthday();
  const [hideBirthdayMessage, setHideBirthdayMessage] = useState(false);

  return (
    <>
      <Head>
        <title>worldiesle | a wordle-inspired guess the goal game</title>
        <meta
          name="description"
          content={`worldiesle #${
            answer.dayNumber + 1
          } Guess the teams, scorer and year of a daily iconic goal from a series of pictures.`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#27272a" />
        <meta
          property="og:title"
          content="worldiesle | a wordle-inspired guess the goal game"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.worldiesle.com/" />
        <meta
          name="og:description"
          content={`worldiesle #${
            answer.dayNumber + 1
          } Guess the teams, scorer and year of a daily iconic goal from a series of pictures.`}
        />
        <meta property="og:image" content={imageUrls[0]} />
        <meta
          name="twitter:title"
          content="worldiesle | a wordle-inspired guess the goal game"
        />
        <meta
          name="twitter:description"
          content={`worldiesle #${
            answer.dayNumber + 1
          } Guess the teams, scorer and year of a daily iconic goal from a series of pictures.`}
        />
        <meta name="twitter:image" content={imageUrls[0]} />
        <meta name="twitter:card" content="summary_large_image" />
        <link
          rel="icon"
          href={`/favicons/${
            darkOrLight === "dark" ? "dark" : "light"
          }/favicon.svg`}
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`/icon-192x192.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`/favicons/${
            darkOrLight === "dark" ? "dark" : "light"
          }/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`/favicons/${
            darkOrLight === "dark" ? "dark" : "light"
          }/favicon-16x16.png`}
        />
        <script
          async
          defer
          src="https://analytics.umami.is/script.js"
          data-website-id="c75ff393-d8c9-4808-8f12-c53675e135cd"
        ></script>
      </Head>
      <main className={styles.main}>
        <Header answer={answer} />

        {eligibleToShowBirthdayMessage && !hideBirthdayMessage ? (
          <div className="inner-container inner-container--image">
            <div className={styles["birthday-banner"]}>
              <div
                className={styles["birthday-banner-close"]}
                onClick={() => setHideBirthdayMessage(true)}
              >
                <Icon icon="clear" size={20} />
              </div>
              <span className={styles["birthday-first-line"]}>
                Hello! It&apos;s my birthday today/yesterday/tomorrow/soon 🎉.
              </span>
              <div className={styles["birthday-banner-break"]}>
                As a birthday present to me please share this game with your
                friends, family, and enemies. I love the fact that this site has
                any users at all, but it doesn&apos;t have many, so any help in
                spreading the word would be very much appreciated. Thanks and
                sorry.
              </div>
            </div>
          </div>
        ) : null}

        <div className={styles.bodyContent}>
          <div className="inner-container inner-container--hero">
            <h1 className={styles.heroText}>
              Guess the teams, scorer and year of this iconic or
              <span className="highlighted-text-secondary"> worldie</span> goal
              from the pictures below
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
      <footer>
        <a
          target="_blank"
          href="https://josholdham.github.io/worldiesle/privacy"
          rel="noreferrer"
        >
          Privacy Policy
        </a>{" "}
        |{" "}
        <a
          target="_blank"
          href="https://josholdham.github.io/worldiesle/faq"
          rel="noreferrer"
        >
          FAQ
        </a>{" "}
        |{" "}
        <a
          target="_blank"
          href="https://twitter.com/worldiesle"
          rel="noreferrer"
        >
          @worldiesle
        </a>
      </footer>
    </>
  );
};

const LAUNCH_DATE = "2023-01-25";
const START_YEAR = 1990;

const getJsonFileFromS3 = async (fileName: string) => {
  const clientParams = {
    region: "eu-west-2",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID_CUSTOM as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_CUSTOM as string,
    },
  };
  const s3Client = new S3Client(clientParams);
  const command = new GetObjectCommand({
    Bucket: "worldiesle",
    Key: fileName,
  });
  // Set expiry to 1 hours
  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 1 * 60 * 60,
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
    Bucket: "worldiesle",
    Key: `${goalId}/${i}.jpeg`,
  });
  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 36 * 60 * 60,
  });

  let newArray = [...signedUrls, signedUrl];
  if (i === SETTINGS.maxGuesses) {
    return newArray;
  }

  return recursivelyGetSignedS3Images(i + 1, newArray, goalId, s3Client);
};

const getSignedS3Images = async (goalId: string) => {
  const clientParams = {
    region: "eu-west-2",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID_CUSTOM as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_CUSTOM as string,
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
  const END_YEAR = dayjs().year();
  const daysSinceLaunch = dayjs()
    .add(1, "hours")
    .add(30, "minutes")
    .diff(LAUNCH_DATE, "day");

  console.log(
    "Getting answer for ",
    dayjs().add(1, "hours").add(30, "minutes").toISOString(),
    "day",
    daysSinceLaunch
  );

  const jsonDirectory = path.join(process.cwd(), "data");
  // Get the teams for suggestions
  const teamsFile = await fs.readFile(jsonDirectory + "/teams.json", "utf8");
  // Get the players for suggestions
  const playersFile = await fs.readFile(
    jsonDirectory + "/players.json",
    "utf8"
  );

  const years: FormattedYear[] = [];
  for (let i = END_YEAR; i >= START_YEAR; i--) {
    years.push({
      id: i.toString(),
      names: [i.toString()],
    });
  }

  // TODO: type expected response?
  const answers = await getJsonFileFromS3("goals.json");
  const answer = answers[daysSinceLaunch];
  answer.dateId = dayjs()
    .add(1, "hours")
    .add(30, "minutes")
    .format("YYYY-MM-DD");
  answer.dayNumber = daysSinceLaunch;

  const signedUrls = await getSignedS3Images(answer.id);

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
