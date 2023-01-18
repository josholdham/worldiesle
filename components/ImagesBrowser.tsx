import Image from 'next/image';

import styles from '../styles/ImagesBrowser.module.css';
import { useEffect, useState } from 'react';

const navArr = [0, 1, 2, 3, 4];

type ImagesBrowserProps = {
  guessIndex: number;
  isGameWon: boolean;
  imageUrls: string[];
};
const ImagesBrowser: React.FC<ImagesBrowserProps> = ({
  guessIndex,
  isGameWon,
  imageUrls,
}) => {
  const [currentViewedIndex, setCurrentViewedIndex] = useState(0);

  useEffect(() => {
    if (!isGameWon) {
      setCurrentViewedIndex(Math.min(guessIndex, 4));
    }
  }, [guessIndex, isGameWon]);

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
            <Image src={imageUrls[i]} alt={`Image ${i + 1}`} fill />
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
      </div>
    </div>
  );
};

export default ImagesBrowser;
