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
        <div className={styles.imageContainer}>
          <Image
            src={imageUrls[0]}
            alt={`Image ${0 + 1}`}
            width={400}
            height={0.56 * 400}
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </div>
        <div
          className={styles.imagesRowInner}
          style={{
            left: `-${currentViewedIndex * 100}%`,
          }}
        >
          {navArr.map((i) => (
            <div className={styles.imageContainer} key={`image_${i}`}>
              <Image
                src={imageUrls[i]}
                alt={`Image ${i + 1}`}
                width={400}
                height={0.56 * 400}
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
            </div>
          ))}
          {/* <div className={styles.imageContainer}>
            <Image
              src={pic1}
              alt="First Screenshot"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </div>
          <div className={styles.imageContainer}>
            <Image
              src={pic2}
              alt="Second Screenshot"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </div>
          <div className={styles.imageContainer}>
            <Image
              src={pic3}
              alt="Third Screenshot"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </div>
          <div className={styles.imageContainer}>
            <Image
              src={pic4}
              alt="Fourth Screenshot"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </div>
          <div className={styles.imageContainer}>
            <Image
              src={pic5}
              alt="Fifth Screenshot"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </div> */}
        </div>
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
