import { FormattedPlayer } from '../../custom-types';
import { getAndParseExistingFile, updateExistingFile } from './utils';

const sortPlayers = async () => {
  const existing: FormattedPlayer[] = await getAndParseExistingFile(
    'players'
  );
  const sorted = existing.sort((a, b) => {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  });
  await updateExistingFile(sorted, 'players');
  console.log('Done', sorted, sorted[0], sorted[sorted.length - 1]);
};

sortPlayers();

export {};
