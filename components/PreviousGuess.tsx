import React from 'react';
import { SetOfGuessesWithFeedback } from '../custom-types';
import styles from '../styles/PreviousGuess.module.css';
import PreviousGuessRow from './PreviousGuessRow';

type PreviousGuessProps = {
  guessIndex: number;
  guesses: SetOfGuessesWithFeedback;
};
const PreviousGuess: React.FC<PreviousGuessProps> = ({
  guessIndex,
  guesses,
}) => {
  return (
    <div className={styles['guess-container']}>
      <div className={styles['guess-title']}>
        Guess {guessIndex + 1}/5
      </div>
      <div className={styles['guess-table']}>
        <PreviousGuessRow
          guessIndex={guessIndex}
          guessWithFeedback={guesses.teamA}
          guessType="teamA"
        />
        <PreviousGuessRow
          guessIndex={guessIndex}
          guessWithFeedback={guesses.teamB}
          guessType="teamB"
        />
        <PreviousGuessRow
          guessIndex={guessIndex}
          guessWithFeedback={guesses.player}
          guessType="player"
        />
        <PreviousGuessRow
          guessIndex={guessIndex}
          guessWithFeedback={guesses.year}
          guessType="year"
        />
      </div>
    </div>
  );
};

export default PreviousGuess;
