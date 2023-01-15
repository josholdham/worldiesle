import * as dotenv from 'dotenv';
dotenv.config();
import { promises as fs } from 'fs';
import { FormattedPlayer } from '../custom-types';

type SimplifiedScorersResponse = {
  player: {
    name: string;
    firstName: string;
    lastName: string;
    nationality: string;
  };
};

type SimplifiedResponse = {
  scorers: SimplifiedScorersResponse[];
  errorCode?: number;
};

const url =
  'https://api.football-data.org/v4/competitions/PL/scorers?limit=50&season=';

const processResponse = (
  json: SimplifiedResponse,
  existing: FormattedPlayer[]
): FormattedPlayer[] => {
  json.scorers.forEach(({ player }) => {
    const exists = existing.find((p) => p.id === player.name);
    if (!exists) {
      let fullName = player.firstName;
      if (player.lastName && player.lastName !== 'null') {
        fullName += ` ${player.lastName}`;
      }
      existing.push({
        id: player.name,
        names: [player.name, fullName],
        nationality: player.nationality,
      });
    }
  });
  return existing;
};

const MIN_YEAR = 2019;
const MAX_YEAR = 2022;

const getSeason = async (
  season: number
): Promise<SimplifiedResponse> => {
  console.log('getting', url + season.toString());
  const response = await fetch(url + season.toString(), {
    headers: {
      'X-Auth-Token': process.env.FOOTBALL_DATA_API_KEY as string,
    },
  });

  return await response.json();
};

const recursivelyGetAndProcessSeasons = async (
  season: number,
  existing: FormattedPlayer[]
): Promise<FormattedPlayer[]> => {
  let updatedPlayers = [...existing];
  const json = await getSeason(season);

  if (!json.errorCode) {
    updatedPlayers = processResponse(json, existing);
  }

  if (season >= MAX_YEAR) {
    return updatedPlayers;
  }

  return new Promise((res) =>
    setTimeout(() => {
      res(
        recursivelyGetAndProcessSeasons(season + 1, updatedPlayers)
      );
    }, 10000)
  );
};

const getAndParseExisting = async () => {
  const rawdata = await fs.readFile('./data/players.json', 'utf8');
  return JSON.parse(rawdata);
};

const updatePlayersFile = async (
  updatedPlayersJson: FormattedPlayer[]
) => {
  const status = await fs.writeFile(
    './data/players.json',
    JSON.stringify(updatedPlayersJson)
  );
  return status;
};

const importTeams = async () => {
  const existing = await getAndParseExisting();
  const updatedPlayersJson = await recursivelyGetAndProcessSeasons(
    MIN_YEAR,
    existing
  );
  await updatePlayersFile(updatedPlayersJson);
  console.log('done');
};

importTeams();

export {};
