import { BasicAnswer, SetOfGuessesWithFeedback } from "../custom-types";
import { overwriteTodaysGuesses, storeGuess } from "./storage";

const gerrardFix = (existingBasicGuesses: SetOfGuessesWithFeedback[], dateStr: string): SetOfGuessesWithFeedback[] => {
  let hasNeededFix = false;
  const length = existingBasicGuesses.length;
  let editedGuesses: SetOfGuessesWithFeedback[] = [];
  for (let i = length - 1; i >= 0; i--) {
    const guess = existingBasicGuesses[i];
    if (!guess.year?.isCorrect) {
      if (guess.year?.guess?.id === '2006' || hasNeededFix) {
        guess.year = {
          guess: {
            id: '2006',
            names: ['2006'],
          },
          isCorrect: true,
          hoverText: '',
          emojiId: 'correct',
        }

        const isGuessComplete = guess.player?.isCorrect && guess.teamA?.isCorrect && guess.teamB?.isCorrect;

        hasNeededFix = true;

        if (isGuessComplete) {
          editedGuesses.unshift(guess);
          break;
        }
      }
    }
    editedGuesses.unshift(guess);
  }

  if (hasNeededFix) {
    overwriteTodaysGuesses(dateStr, editedGuesses)
  }
  return editedGuesses
}

export const correctPastGuesses = (answer: BasicAnswer, existingBasicGuesses: SetOfGuessesWithFeedback[]): SetOfGuessesWithFeedback[] => {
  if (answer.dayNumber === 35) {
    return gerrardFix(existingBasicGuesses, answer.dateId)
  }
  return existingBasicGuesses;
}