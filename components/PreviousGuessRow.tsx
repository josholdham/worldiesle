import React from 'react';
import Tooltip from 'rc-tooltip';

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
        {guessWithFeedback?.hoverText ? (
          <div className={styles.test}>
            <Tooltip
              placement="top"
              trigger={['click', 'hover']}
              overlay={<span>{guessWithFeedback?.hoverText}</span>}
              overlayInnerStyle={{
                textAlign: 'center',
              }}
            >
              <div>
                <Emoji
                  emojiId={guessWithFeedback?.emojiId}
                  id={`emoji_${guessIndex}_${guessType}`}
                />
              </div>
            </Tooltip>
          </div>
        ) : (
          <Emoji
            emojiId={guessWithFeedback?.emojiId}
            id={`emoji_${guessIndex}_${guessType}`}
          />
        )}
      </div>
    </div>
  );
};

export default PreviousGuessRow;
