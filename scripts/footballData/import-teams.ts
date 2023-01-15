import { FormattedTeam } from '../../custom-types';
import {
  fetchAndProcessCompetitions,
  getAndParseExistingFile,
  updateExistingFile,
} from './utils';

type SimplifiedTeamsResponse = {
  name: string;
  shortName: string;
  tla: string;
  crest: string;
};

type SimplifiedResponse = {
  teams: SimplifiedTeamsResponse[];
  errorCode?: number;
  error?: number;
};

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

const importTeams = async () => {
  const existing = await getAndParseExistingFile('teams');
  const updatedJson = await fetchAndProcessCompetitions<
    SimplifiedResponse,
    FormattedTeam
  >(0, 'teams', existing, processResponse);
  await updateExistingFile(updatedJson, 'teams');
  console.log('done', existing);
};

importTeams();

export {};
