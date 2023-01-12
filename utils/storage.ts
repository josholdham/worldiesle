import { SetOfGuesses, StoredGuesses } from '../custom-types';

export const loadAllGuesses = (): StoredGuesses => {
  const storedGuesses = localStorage.getItem('guesses');
  return storedGuesses != null ? JSON.parse(storedGuesses) : {};
};

export const getTodaysGuesses = (dateStr: string): SetOfGuesses[] => {
  const storedGuesses = loadAllGuesses();
  return storedGuesses[dateStr] || [];
};

export const storeGuess = (dateStr: string, guess: SetOfGuesses) => {
  const allGuesses = loadAllGuesses();
  const todaysGuesses = allGuesses[dateStr] || [];
  todaysGuesses.unshift(guess);

  localStorage.setItem(
    'guesses',
    JSON.stringify({
      ...allGuesses,
      [dateStr]: todaysGuesses,
    })
  );
};
