import { FormattedPlayer } from '../../custom-types';
import { getAndParseExistingFile } from './utils';

const sortPlayers = async () => {
  const existing = await getAndParseExistingFile('players');
  const sorted = existing.sort(
    (a: FormattedPlayer, b: FormattedPlayer) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    }
  );
  // await updateExistingFile(updatedJson, 'players');
  console.log('Done', sorted, sorted[0], sorted[sorted.length - 1]);
};

sortPlayers();

export {};
