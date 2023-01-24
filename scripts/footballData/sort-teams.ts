import { FormattedTeam } from '../../custom-types';
import { getAndParseExistingFile, updateExistingFile } from './utils';

const sortTeams = async () => {
  const existing: FormattedTeam[] = await getAndParseExistingFile(
    'teams'
  );
  const sorted = existing.sort((a, b) => {
    if (a.names[0] < b.names[0]) {
      return -1;
    }
    if (a.names[0] > b.names[0]) {
      return 1;
    }
    return 0;
  });
  await updateExistingFile(sorted, 'teams');
  console.log('Done', sorted, sorted[0], sorted[sorted.length - 1]);
};

sortTeams();

export {};
