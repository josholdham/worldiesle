import {
  BasicAnswer,
  GuessType,
  GuessWithFeedback,
  SetOfGuesses,
  SetOfGuessesWithFeedback,
  Suggestion,
} from '../custom-types';

const DEFAULT_FEEDBACK: Omit<GuessWithFeedback, 'guess'> = {
  emojiId: 'noAnswer',
  hoverText: 'No answer was guessed.',
  isCorrect: false,
};

const CORRECT_FEEDBACK: Omit<GuessWithFeedback, 'guess'> = {
  emojiId: 'correct',
  isCorrect: true,
  hoverText: '',
};

const INCORRECT_FEEDBACK: Omit<GuessWithFeedback, 'guess'> = {
  emojiId: 'incorrect',
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
    guessWithFeedback.emojiId = 'homeAway';
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

  const answerAsNumber = parseInt(answer.year, 10);

  /** NOTE: this will always be parse-int-able as there is validation
   * on the guess submit function (well... TODO) */
  const yearAsNumber = yearGuess ? parseInt(yearGuess.id, 10) : 0;
  const diff = yearAsNumber - answerAsNumber;

  if (yearAsNumber === answerAsNumber) {
    // The correct year was guessed
    guessWithFeedback = {
      ...guessWithFeedback,
      ...CORRECT_FEEDBACK,
    };
  } else if (diff >= -2 && diff < 0) {
    guessWithFeedback.emojiId = 'upSmall';
    guessWithFeedback.hoverText =
      'You are within 2 years of the correct answer';
  } else if (diff <= 2 && diff > 0) {
    guessWithFeedback.emojiId = 'downSmall';
    guessWithFeedback.hoverText =
      'You are within 2 years of the correct answer';
  } else if (diff >= -5 && diff < 0) {
    guessWithFeedback.emojiId = 'upMedium';
    guessWithFeedback.hoverText =
      'You are within 5 years of the correct answer';
  } else if (diff <= 5 && diff > 0) {
    guessWithFeedback.emojiId = 'downMedium';
    guessWithFeedback.hoverText =
      'You are within 5 years of the correct answer';
  } else if (diff < 0) {
    guessWithFeedback.emojiId = 'upLarge';
    guessWithFeedback.hoverText =
      'You are a long way off the correct year';
  } else if (diff > 0) {
    guessWithFeedback.emojiId = 'downLarge';
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
