import {
  BasicAnswer,
  GuessType,
  GuessWithFeedback,
  SetOfGuesses,
  SetOfGuessesWithFeedback,
  Suggestion,
} from '../custom-types';

const DEFAULT_FEEDBACK = {
  emoji: {
    symbol: '⬜',
    label: 'White Square',
  },
  hoverText: 'No answer was guessed.',
  isCorrect: false,
};

const CORRECT_FEEDBACK = {
  emoji: {
    symbol: '✅',
    label: 'White Checkmark',
    hoverText: '',
  },
  isCorrect: true,
};

const INCORRECT_FEEDBACK = {
  status: 'incorrect',
  emoji: {
    symbol: '🔴',
    label: 'Red Circle',
  },
  hoverText: 'Incorrect Guess.',
  isCorrect: false,
};

const getTeamGuessFeedback = (
  guesses: SetOfGuesses,
  guessKey: GuessType,
  answer: BasicAnswer
): GuessWithFeedback => {
  let guessWithFeedback: GuessWithFeedback = {
    guess: guesses[guessKey],
    ...DEFAULT_FEEDBACK,
  };

  const teamGuess = guesses[guessKey];
  const secondaryGuessKey = guessKey === 'teamA' ? 'teamB' : 'teamA';
  const secondaryGuess = guesses[secondaryGuessKey];

  if (teamGuess?.id === answer[guessKey]) {
    // The correct team was guessed
    guessWithFeedback = {
      ...guessWithFeedback,
      ...CORRECT_FEEDBACK,
    };
  } else if (
    !answer.homeTeamMatters &&
    teamGuess?.id === answer[secondaryGuessKey] &&
    secondaryGuess?.id !== answer[secondaryGuessKey]
  ) {
    /** The guess matched the _other_ team, but home/away
     * is irrelevant ie int'l matches */
    guessWithFeedback = {
      ...guessWithFeedback,
      ...CORRECT_FEEDBACK,
    };
  } else if (
    answer.homeTeamMatters &&
    teamGuess?.id === answer[secondaryGuessKey] &&
    secondaryGuess?.id !== answer[secondaryGuessKey]
  ) {
    guessWithFeedback.emoji = {
      symbol: '🟩',
      label: 'Green Square',
    };
    guessWithFeedback.hoverText =
      'This team did feature in this match, but not as the home team';
  } else if (teamGuess) {
    guessWithFeedback = {
      ...guessWithFeedback,
      ...INCORRECT_FEEDBACK,
    };
  }
  return guessWithFeedback;
};

const getPlayerGuessFeedback = (
  playerGuess: Suggestion,
  answer: BasicAnswer
): GuessWithFeedback => {
  let guessWithFeedback: GuessWithFeedback = {
    guess: playerGuess,
    ...DEFAULT_FEEDBACK,
  };

  if (playerGuess?.id === answer.player) {
    // The correct player was guessed
    guessWithFeedback = {
      ...guessWithFeedback,
      ...CORRECT_FEEDBACK,
    };
  } else if (playerGuess?.id) {
    guessWithFeedback = {
      ...guessWithFeedback,
      ...INCORRECT_FEEDBACK,
    };
  }

  return guessWithFeedback;
};

const getYearGuessFeedback = (
  yearGuess: Suggestion,
  answer: BasicAnswer
): GuessWithFeedback => {
  let guessWithFeedback: GuessWithFeedback = {
    guess: yearGuess,
    ...DEFAULT_FEEDBACK,
  };

  /** NOTE: this will always be parse-int-able as there is validation
   * on the guess submit function (well... TODO) */
  const yearAsNumber = yearGuess ? parseInt(yearGuess.id) : 0;
  const diff = yearAsNumber - answer.year;

  if (yearAsNumber === answer.year) {
    // The correct year was guessed
    guessWithFeedback = {
      ...guessWithFeedback,
      ...CORRECT_FEEDBACK,
    };
  } else if (diff >= -2 && diff < 0) {
    guessWithFeedback.emoji = {
      symbol: '🔼',
      label: 'Upwards Button',
    };
    guessWithFeedback.hoverText =
      'You are within 2 years of the correct answer';
  } else if (diff <= 2 && diff > 0) {
    guessWithFeedback.emoji = {
      symbol: '🔽',
      label: 'Downwards Button',
    };
    guessWithFeedback.hoverText =
      'You are within 2 years of the correct answer';
  } else if (diff >= -5 && diff < 0) {
    guessWithFeedback.emoji = {
      symbol: '⏫',
      label: 'Double Upwards Button',
    };
    guessWithFeedback.hoverText =
      'You are within 5 years of the correct answer';
  } else if (diff <= 5 && diff > 0) {
    guessWithFeedback.emoji = {
      symbol: '⏬',
      label: 'Double Downwards Button',
    };
    guessWithFeedback.hoverText =
      'You are within 5 years of the correct answer';
  } else if (diff < 0) {
    guessWithFeedback.emoji = {
      symbol: '🔺',
      label: 'Red Up Arrow',
    };
    guessWithFeedback.hoverText =
      'You are a long way off the correct year';
  } else if (diff > 0) {
    guessWithFeedback.emoji = {
      symbol: '🔻',
      label: 'Red Down Arrow',
    };
    guessWithFeedback.hoverText =
      'You are a long way off the correct year';
  }

  return guessWithFeedback;
};

export const getGuessFeedback = (
  guess: SetOfGuesses,
  guessKey: GuessType,
  answer: BasicAnswer,
  correctGuesses: SetOfGuessesWithFeedback
): GuessWithFeedback => {
  /** If there is already a correct guess for this guessType, we want to
   * return that as this round's guess as well (persisting correct answers
   * throughout each round) */
  if (correctGuesses[guessKey]) {
    // TODO: look at type error
    return correctGuesses[guessKey] as GuessWithFeedback;
  }

  if (!guess[guessKey]) {
    return {
      guess: undefined,
      ...DEFAULT_FEEDBACK,
    };
  }

  if (guessKey === 'teamA' || guessKey === 'teamB') {
    return getTeamGuessFeedback(guess, guessKey, answer);
  }

  if (guessKey === 'player') {
    return getPlayerGuessFeedback(guess.player, answer);
  }

  return getYearGuessFeedback(guess.year, answer);
};
