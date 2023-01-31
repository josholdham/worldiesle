import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Tooltip from 'rc-tooltip';

import styles from '../styles/ImagesBrowser.module.css';
import { SETTINGS } from '../utils/settings';
import Icon from './Icon';
import { BasicAnswer } from '../custom-types';
import { sendAnalyticsEvent } from '../utils/analytics';

const navArr = Array.from(
  { length: SETTINGS.maxGuesses },
  (_, i) => i
);

type ImagesBrowserProps = {
  guessIndex: number;
  isGameWon: boolean;
  imageUrls: string[];
  answer: BasicAnswer;
};
const ImagesBrowser: React.FC<ImagesBrowserProps> = ({
  guessIndex,
  isGameWon,
  imageUrls,
  answer,
}) => {
  const [currentViewedIndex, setCurrentViewedIndex] = useState(0);

  useEffect(() => {
    if (!isGameWon) {
      setCurrentViewedIndex(
        Math.min(guessIndex, SETTINGS.maxGuesses - 1)
      );
    }
  }, [guessIndex, isGameWon]);

  const openLink = () => {
    sendAnalyticsEvent('Open Video', {url: answer.url});
    window.open(answer.url, '_blank');
  };

  const clickableButtons = useMemo(() => {
    return navArr.filter((i) => isGameWon || guessIndex >= i);
  }, [isGameWon, guessIndex]);

  const unclickableButtons = useMemo(() => {
    return navArr.filter((i) => !isGameWon && guessIndex < i);
  }, [isGameWon, guessIndex]);

  const Button = useCallback(
    (buttonNumber: number) => {
      return (
        <button
          className={`${styles.imageNavButton} ${
            buttonNumber === currentViewedIndex
              ? styles.imageNavButtonActive
              : ''
          }`}
          onClick={() => {
            if (isGameWon || guessIndex >= buttonNumber) {
              setCurrentViewedIndex(buttonNumber);
            }
          }}
          disabled={!isGameWon && guessIndex < buttonNumber}
        >
          {buttonNumber + 1}
        </button>
      );
    },
    [currentViewedIndex, isGameWon, guessIndex]
  );

  return (
    <div className="inner-container inner-container--image">
      <div className={styles.imagesRowOuter}>
        {navArr.map((i) => (
          <div
            className={styles.imageContainer}
            key={`image_${i}`}
            style={{
              visibility:
                i === currentViewedIndex ? 'visible' : 'hidden',
            }}
          >
            <div className={styles.imageOverlay}>Image {i + 1}/6</div>
            <Image
              src={imageUrls[i]}
              alt={`Image ${i + 1}`}
              fill
              priority={i <= 0 ? true : false}
            />
          </div>
        ))}
      </div>
      <div
        className={`inner-container ${styles.imageNavContainer} ${styles.imageNav}`}
      >
        {clickableButtons.map((i) => Button(i))}

        {unclickableButtons.length > 0 ? (
          <Tooltip
            key={`nav_tooltip`}
            placement="top"
            trigger={['click', 'hover']}
            overlay={
              <span>
                You will be able to navigate to more images after each
                guess
              </span>
            }
            overlayInnerStyle={{
              textAlign: 'center',
            }}
          >
            <div className={`${styles.imageNav}`}>
              {unclickableButtons.map((i) => Button(i))}
            </div>
          </Tooltip>
        ) : null}
        {answer.url &&
        (isGameWon || guessIndex >= SETTINGS.maxGuesses) ? (
          <button
            className={`${styles.imageNavButton} `}
            onClick={openLink}
          >
            <Icon icon="play_circle_outline" size={22} />
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default ImagesBrowser;
