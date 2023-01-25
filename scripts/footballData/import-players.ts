import { Competition, FormattedPlayer } from '../../custom-types';
import {
  fetchAndProcessCompetitions,
  getAndParseExistingFile,
  updateExistingFile,
} from './utils';

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
  error?: number;
};

const processResponse = (
  json: SimplifiedResponse,
  existing: FormattedPlayer[],
  competition: Competition
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

const importPlayers = async () => {
  const existing = await getAndParseExistingFile('players');
  const updatedJson = await fetchAndProcessCompetitions<
    SimplifiedResponse,
    FormattedPlayer
  >(0, 'scorers', existing, processResponse);
  await updateExistingFile(updatedJson, 'players');
  console.log('Done', updatedJson);
};

importPlayers();

export {};
