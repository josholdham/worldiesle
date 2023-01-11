import React, { useState } from 'react';
import {
  BasicAnswer,
  FormattedTeam,
  FullSetOfGuesses,
  GuessFromSuggestion,
} from '../custom-types';
import styles from '../styles/PreviousGuess.module.css';

type PreviousGuessProps = {
  guessIndex: number;
  guess: FullSetOfGuesses;
  answer: BasicAnswer;
};
const PreviousGuess: React.FC<PreviousGuessProps> = ({
  guessIndex,
  guess,
}) => {
  const titleCellCSS = `${styles['cell']} ${styles['title-cell']}`;
  const guessCellCSS = `${styles['cell']} ${styles['guess-cell']}`;
  const indicatorCellCSS = `${styles['cell']} ${styles['indicator-cell']}`;

  return (
    <div className={styles['guess-container']}>
      <div className={styles['guess-title']}>
        Guess {guessIndex + 1}/5
      </div>
      <div className={styles['guess-table']}>
        <div className={styles['row']}>
          <div className={titleCellCSS}>Team A</div>
          <div className={guessCellCSS}>Manchester United</div>
          <div className={indicatorCellCSS}>✅</div>
        </div>
        <div className={styles['row']}>
          <div className={titleCellCSS}>Team B</div>
          <div className={guessCellCSS}>Manchester City</div>
          <div className={indicatorCellCSS}>✅</div>
        </div>
        <div className={styles['row']}>
          <div className={titleCellCSS}>Player</div>
          <div className={guessCellCSS}>David Beckham</div>
          <div className={indicatorCellCSS}>✅</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles['guess-container']}>
      <div className={styles['left-col']}>
        <div className={styles['cell']}>Team A</div>
        <div className={styles['cell']}>Team B</div>
        <div className={styles['cell']}>Player</div>
      </div>
      <div className={styles['middle-col']}>
        <div className={styles['cell']}>Manchester City</div>
        <div className={styles['cell']}>Manchester United</div>
        <div className={styles['cell']}>David Beckham</div>
      </div>
      <div className={styles['right-col']}>
        <div className={styles['cell']}>Manchester City</div>
        <div className={styles['cell']}>Manchester United</div>
        <div className={styles['cell']}>David Beckham</div>
      </div>
    </div>
  );
};

export default PreviousGuess;
