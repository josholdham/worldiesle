import { FormattedTeam } from '../../custom-types';
import {
  Competition,
  fetchAndProcessCompetitions,
  getAndParseExistingFile,
  intlCompetitions,
  updateExistingFile,
} from './utils';

type SimplifiedTeamsResponse = {
  name: string;
  shortName: string;
  tla: string;
  id: string;
  crest: string;
};

type SimplifiedResponse = {
  teams: SimplifiedTeamsResponse[];
  errorCode?: number;
  error?: number;
};

const processResponse = (
  json: SimplifiedResponse,
  existing: FormattedTeam[],
  competition: Competition
): FormattedTeam[] => {
  json.teams.forEach((team) => {
    const uid = `${team.tla}-${team.id}`;
    const exists = existing.find((t) => t.id === uid);

    if (!exists) {
      existing.push({
        id: uid,
        names: [team.name, team.shortName],
        intl: intlCompetitions.includes(competition),
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
  console.log('Done');
};

importTeams();

export {};
