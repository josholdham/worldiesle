import Image from 'next/image';
import pic1 from '../public/images/1.png';
import pic2 from '../public/images/2.png';
import pic3 from '../public/images/3.png';
import pic4 from '../public/images/4.png';
import pic5 from '../public/images/5.png';

import Guess from '../components/Guess';
import styles from '../styles/ImagesBrowser.module.css';
import { FormattedTeam } from '../custom-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import PreviousGuess from './PreviousGuess';

const navArr = [0, 1, 2, 3, 4];

type ImagesBrowserProps = {
  guessIndex: number;
};
const ImagesBrowser: React.FC<ImagesBrowserProps> = ({
  guessIndex,
}) => {
  const [currentViewedIndex, setCurrentViewedIndex] = useState(0);

  useEffect(() => {
    setCurrentViewedIndex(guessIndex);
  }, [guessIndex]);

  return (
    <>
      <div className={styles.imagesRowOuter}>
        <div className={styles.imageContainer}>
          <Image
            src={pic1}
            alt="First Screenshot Dummy"
            style={{
              width: '100%',
              height: 'auto',
              visibility: 'hidden',
            }}
          />
        </div>
        <div
          className={styles.imagesRowInner}
          style={{
            left: `-${currentViewedIndex * 100}%`,
          }}
        >
          <div className={styles.imageContainer}>
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
          </div>
        </div>
      </div>
      <div className={styles.imageNav}>
        {navArr.map((i) => (
          <button
            className={`${styles.imageNavButton} ${
              i === currentViewedIndex
                ? styles.imageNavButtonActive
                : ''
            }`}
            key={`imageNav_${i}`}
            disabled={guessIndex < i}
            onClick={() => {
              setCurrentViewedIndex(i);
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default ImagesBrowser;
