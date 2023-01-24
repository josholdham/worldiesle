import { FormattedTeam } from '../../custom-types';
import { getAndParseExistingFile, updateExistingFile } from './utils';

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

const shuffleGoals = async () => {
  const existing: any[] = await getAndParseExistingFile('goals');
  const shuffled = shuffleArray(existing);
  await updateExistingFile(shuffled, 'goals');
  console.log('Done', shuffled);
};

shuffleGoals();

export {};
