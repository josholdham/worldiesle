import * as dotenv from 'dotenv';
dotenv.config();
import { promises as fs } from 'fs';

export const competitions = [
  'PL', // Premier League
  'CL', // Champions League
  'EC', // Euros
  'WC', // World Cup
  'PD', // La Liga
];

export const intlCompetitions = ['EC', 'WC'];

const MIN_YEAR = 2020;
const MAX_YEAR = 2022;

export type Competition = typeof competitions[number];

export const getAndParseExistingFile = async (
  filename: 'teams' | 'players'
) => {
  const rawdata = await fs.readFile(
    `./data/${filename}.json`,
    'utf8'
  );
  return JSON.parse(rawdata);
};

export const updateExistingFile = async (
  updatedJson: any[],
  filename: 'teams' | 'players'
) => {
  const status = await fs.writeFile(
    `./data/${filename}.json`,
    JSON.stringify(updatedJson)
  );
  return status;
};

const URL_BASE = 'https://api.football-data.org/v4/competitions/';
const URL_PARAMS = '?limit=200&season=';

const getSeason = async function (
  competition: Competition,
  endpoint: 'teams' | 'scorers',
  season: number
): Promise<any> {
  let url = URL_BASE;
  url += competition;
  url += `/${endpoint}`;
  url += URL_PARAMS;
  url += season;

  console.log('getting', url);
  const response = await fetch(url, {
    headers: {
      'X-Auth-Token': process.env.FOOTBALL_DATA_API_KEY as string,
    },
  });

  return await response.json();
};

export const fetchAndProcessSeasons = async <
  SimplifiedResponse,
  Tidied
>(
  competition: Competition,
  endpoint: 'teams' | 'scorers',
  season: number,
  existing: Tidied[],
  processResponse: (
    res: SimplifiedResponse,
    existing: Tidied[],
    competition: Competition
  ) => Tidied[]
): Promise<Tidied[]> => {
  let updatedItems = [...existing];
  const res = await getSeason(competition, endpoint, season);

  if (!res.errorCode && !res.error) {
    updatedItems = processResponse(res, existing, competition);
  }

  if (season >= MAX_YEAR) {
    return updatedItems;
  }

  return new Promise((res) =>
    setTimeout(() => {
      res(
        fetchAndProcessSeasons<SimplifiedResponse, Tidied>(
          competition,
          endpoint,
          season + 1,
          updatedItems,
          processResponse
        )
      );
    }, 10000)
  );
};

export const fetchAndProcessCompetitions = async <
  SimplifiedResponse,
  Tidied
>(
  competitionIndex: number,
  endpoint: 'teams' | 'scorers',
  existing: Tidied[],
  processResponse: (
    res: SimplifiedResponse,
    existing: Tidied[],
    competition: Competition
  ) => Tidied[]
): Promise<Tidied[]> => {
  const competition = competitions[competitionIndex];
  const updatedJson = await fetchAndProcessSeasons(
    competition,
    endpoint,
    MIN_YEAR,
    existing,
    processResponse
  );

  if (competitionIndex >= competitions.length - 1) {
    return updatedJson;
  }

  return new Promise((res) =>
    setTimeout(() => {
      res(
        fetchAndProcessCompetitions<SimplifiedResponse, Tidied>(
          competitionIndex + 1,
          endpoint,
          existing,
          processResponse
        )
      );
    }, 10000)
  );
};
