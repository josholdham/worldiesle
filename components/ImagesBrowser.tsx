import Image from 'next/image';

import styles from '../styles/ImagesBrowser.module.css';
import { useEffect, useState } from 'react';
import { SETTINGS } from '../utils/settings';
import Icon from './Icon';
import { BasicAnswer } from '../custom-types';

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
    window.open(answer.url, '_blank');
  };

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
      <div className={`inner-container ${styles.imageNav}`}>
        {navArr.map((i) => (
          <button
            className={`${styles.imageNavButton} ${
              i === currentViewedIndex
                ? styles.imageNavButtonActive
                : ''
            }`}
            key={`imageNav_${i}`}
            disabled={!isGameWon && guessIndex < i}
            onClick={() => {
              setCurrentViewedIndex(i);
            }}
          >
            {i + 1}
          </button>
        ))}
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
