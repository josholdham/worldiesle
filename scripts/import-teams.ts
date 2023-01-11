import * as dotenv from 'dotenv';
dotenv.config();
import { promises as fs } from 'fs';
import { FormattedTeam } from '../custom-types';

type SimplifiedTeamsResponse = {
  name: string;
  shortName: string;
  tla: string;
  crest: string;
};

type SimplifiedResponse = {
  teams: SimplifiedTeamsResponse[];
  errorCode?: number;
};

const url =
  'https://api.football-data.org/v4/competitions/PL/teams?season=';

const processResponse = (
  json: SimplifiedResponse,
  existing: FormattedTeam[]
): FormattedTeam[] => {
  json.teams.forEach((team) => {
    const exists = existing.find((t) => t.id === team.tla);
    if (!exists) {
      existing.push({
        id: team.tla,
        names: [team.name, team.shortName],
        imgUrl: team.crest,
      });
    }
  });
  return existing;
};

const MIN_YEAR = 2017;
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
  existing: FormattedTeam[]
): Promise<FormattedTeam[]> => {
  let updatedTeams = [...existing];
  const json = await getSeason(season);
  console.log('got data', json);

  if (!json.errorCode) {
    updatedTeams = processResponse(json, existing);
  }

  if (season >= MAX_YEAR) {
    return updatedTeams;
  }

  return new Promise((res) =>
    setTimeout(() => {
      res(recursivelyGetAndProcessSeasons(season + 1, updatedTeams));
    }, 10000)
  );
};

const getAndParseExisting = async () => {
  const rawdata = await fs.readFile('./data/teams.json', 'utf8');
  return JSON.parse(rawdata);
};

const updateTeamsFile = async (updatedTeamsJson: FormattedTeam[]) => {
  const status = await fs.writeFile(
    './data/teams.json',
    JSON.stringify(updatedTeamsJson)
  );
  return status;
};

const importTeams = async () => {
  const existing = await getAndParseExisting();
  const updatedTeamsJson = await recursivelyGetAndProcessSeasons(
    MIN_YEAR,
    existing
  );
  await updateTeamsFile(updatedTeamsJson);
  console.log('done', existing);
};

importTeams();

export {};
