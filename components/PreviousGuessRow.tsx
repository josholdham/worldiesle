import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { GuessType, GuessWithFeedback } from '../custom-types';
import styles from '../styles/PreviousGuess.module.css';
import Emoji from './Emoji';

const labels = {
  teamA: 'Home',
  teamB: 'Away',
  player: 'Player',
  year: 'Year',
};

type PreviousGuessRowProps = {
  guessWithFeedback?: GuessWithFeedback;
  guessIndex: number;
  guessType: GuessType;
};
const PreviousGuessRow: React.FC<PreviousGuessRowProps> = ({
  guessWithFeedback,
  guessIndex,
  guessType,
}) => {
  const titleCellCSS = `${styles['cell']} ${styles['title-cell']}`;
  const guessCellCSS = `${styles['cell']} ${styles['guess-cell']}`;
  const indicatorCellCSS = `${styles['cell']} ${styles['indicator-cell']}`;

  return (
    <div className={styles['row']}>
      <div className={titleCellCSS}>{labels[guessType]}</div>
      <div className={guessCellCSS}>
        {guessWithFeedback?.guess?.names[0] || '-'}
      </div>
      <div className={indicatorCellCSS}>
        <Emoji
          emojiId={guessWithFeedback?.emojiId}
          id={`emoji_${guessIndex}_${guessType}`}
        />
        {guessWithFeedback?.hoverText ? (
          <Tooltip
            anchorId={`emoji_${guessIndex}_${guessType}`}
            content={guessWithFeedback?.hoverText}
            place="top"
          />
        ) : null}
      </div>
    </div>
  );
};

export default PreviousGuessRow;
