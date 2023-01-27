import React, { useEffect, useMemo, useState } from 'react';
import styles from '../styles/OnboardingModal.module.css';
import { loadAllGuesses } from '../utils/storage';
import { BasicAnswer } from '../custom-types';
import Emoji from './Emoji';

type OnboardingModalProps = {};
const OnboardingModal: React.FC<OnboardingModalProps> = ({}) => {
  const [isActive, setIsActive] = useState(0);

  const incrementActive = () => {
    if (isActive < 3) {
      setIsActive(isActive + 1);
    }
  };

  const scrollStyles = useMemo(() => {
    if (isActive < 2) {
      return {};
    }
    if (isActive < 3) {
      return {
        transform: 'translateY(-200px)',
      };
    }

    if (isActive < 4) {
      return {
        transform: 'translateY(-355px)',
      };
    }

    return {};
  }, [isActive]);

  const pseudoNavButtonClass1 = useMemo(() => {
    if (isActive === 1) {
      return styles.pseudoNavButtonAnimation1;
    }
    return '';
  }, [isActive]);

  const pseudoNavButtonClass2 = useMemo(() => {
    if (isActive === 1) {
      return styles.pseudoNavButtonAnimation2;
    }
    return '';
  }, [isActive]);

  const pseudoImageContainerInnerClass = useMemo(() => {
    if (isActive === 1) {
      return styles.pseudoImageContainerInnerAnimation;
    }
    return '';
  }, [isActive]);

  const pseudoTooltipClass = useMemo(() => {
    if (isActive === 3) {
      return styles.pseudoTooltipAnimation;
    }
    return '';
  }, [isActive]);

  const pseudoColRightClass = useMemo(() => {
    if (isActive === 3) {
      return styles.pseudoColRightAnimation;
    }
    return '';
  }, [isActive]);

  return (
    <>
      <div className={styles.pseudoContainer}>
        <div className={styles.pseudoOutline}>
          <div className={styles.browserButtons}>
            <div className={styles.browserButton}></div>
            <div
              className={`${styles.browserButton} ${styles.browserButtonYellow}`}
            ></div>
            <div
              className={`${styles.browserButton} ${styles.browserButtonGreen}`}
            ></div>
          </div>
          <div className={styles.pseudoContent}>
            <div className={styles.pseudoWorldiesle}>
              worldies
              <span className={styles.pseudoHighlight}>le</span>
            </div>
            <div
              className={styles.pseudoContentInner}
              style={scrollStyles}
            >
              <div className={styles.pseudoLead}>
                <div className={styles.pseudoLine}></div>
                <div
                  className={`${styles.pseudoLine} ${styles.pseudoLineShort}`}
                ></div>
              </div>

              <div className={styles.pseudoImageContainerOuter}>
                <div
                  className={`${styles.pseudoImageContainerInner} ${pseudoImageContainerInnerClass}`}
                >
                  <div
                    className={`${styles.pseudoImage} ${
                      isActive === 1 ? styles.shine : null
                    }`}
                  ></div>

                  <div
                    className={`${styles.pseudoImage} ${
                      isActive === 1 ? styles.shine : null
                    }`}
                  ></div>
                </div>
              </div>

              <div className={styles.pseudoNav}>
                <div
                  className={`${styles.pseudoNavButton}  ${pseudoNavButtonClass1}`}
                ></div>
                <div
                  className={`${styles.pseudoNavButton} ${pseudoNavButtonClass2}`}
                ></div>
                <div className={styles.pseudoNavButton}></div>
                <div className={styles.pseudoNavButton}></div>
                <div className={styles.pseudoNavButton}></div>
              </div>

              <div className={styles.pseudoGuesses}>
                <div className={styles.pseudoGuessLabel}>
                  Guess 1/6
                </div>
                <div className={styles.pseudoGuess}>
                  <span className={styles.homeTeamLabel}>
                    Home Team
                  </span>
                  <span className={styles.cursorLabel}>|</span>

                  <div className={styles.pseudoOptions}>
                    <div className={styles.pseudoOption}>
                      Liverpool
                    </div>
                    <div className={styles.pseudoOption}>
                      Manchester City
                    </div>
                    <div className={styles.pseudoOption}>
                      Manchester United
                    </div>
                  </div>
                </div>
                <div className={styles.pseudoGuess}>Away Team</div>
                <div className={styles.pseudoGuess}>Player</div>
                <div className={styles.pseudoGuess}>Year</div>
              </div>

              <div className={styles.pseudoGuessButton}>Guess</div>

              <div className={styles.pseudoDivider}></div>

              <div className={styles.pseudoTable}>
                <div className={styles.pseudoRow}>
                  <div className={styles.pseudoCol}>
                    Manchester United
                  </div>
                  <div className={styles.pseudoColRight}>
                    <Emoji emojiId="correct" />
                  </div>
                </div>
                <div className={styles.pseudoRow}>
                  <div className={styles.pseudoCol}>Liverpool</div>
                  <div className={styles.pseudoColRight}>
                    <Emoji emojiId="correct" />
                  </div>
                </div>
                <div className={styles.pseudoRow}>
                  <div className={styles.pseudoCol}>
                    Marcus Rashford
                  </div>
                  <div className={styles.pseudoColRight}>
                    <Emoji emojiId="homeAway" />
                  </div>
                </div>
                <div className={styles.pseudoRow}>
                  <div className={styles.pseudoCol}>2021</div>
                  <div
                    className={`${styles.pseudoColRight} ${pseudoColRightClass}`}
                  >
                    <Emoji emojiId="upSmall" />

                    <div
                      className={`${styles.pseudoTooltip} ${pseudoTooltipClass}`}
                    >
                      You are within 2 years of the correct answer
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bottomCover}></div>
      </div>

      <div className={styles.pips}>
        <div
          className={`${styles.pip} ${
            isActive === 0 ? styles.pipHighlight : null
          }`}
          onClick={() => setIsActive(0)}
        ></div>
        <div
          className={`${styles.pip} ${
            isActive === 1 ? styles.pipHighlight : null
          }`}
          onClick={() => setIsActive(1)}
        ></div>
        <div
          className={`${styles.pip} ${
            isActive === 2 ? styles.pipHighlight : null
          }`}
          onClick={() => setIsActive(2)}
        ></div>
        <div
          className={`${styles.pip} ${
            isActive === 3 ? styles.pipHighlight : null
          }`}
          onClick={() => setIsActive(3)}
        ></div>
      </div>

      <div className={styles.slidesOuter}>
        <div
          className={styles.slidesInner}
          style={{
            transform: `translateX(-${isActive * 25}%)`,
          }}
        >
          <div className={styles.slide}>
            <h2 className={styles.header1}>Welcome to Worldiesle</h2>

            <p className={styles.description}>
              Every day we choose a famous or iconic football goal,
              and you have to guess who scored it, the teams involved,
              and what year it happened
            </p>
          </div>
          <div className={styles.slide}>
            <p className={styles.description}>
              You will see a series of images leading up to the goal,
              and you will get six guesses to figure out the answers.
            </p>
            <p className={styles.description}>
              After each guess, a new image will be revealed.
            </p>
          </div>
          <div className={styles.slide}>
            <p className={styles.description}>
              For each guess, you should enter a home team, an away
              team, a player, AND a year. Or leave it blank before
              pressing &apos;Guess&apos; to skip.
            </p>
            <p className={styles.description}>
              Start typing in each input box to search for options,
              and then select from the dropdown list.
            </p>
          </div>
          <div className={styles.slide}>
            <p className={styles.description}>
              After each guess, previous guesses will appear below the
              input fields.
            </p>
            <p className={styles.description}>
              You can tap on each emoji for potential clues as to your
              next guess.
            </p>
          </div>
        </div>
      </div>

      <button
        className={`button ${styles.buttonNext}`}
        onClick={incrementActive}
      >
        Next
      </button>
    </>
  );
};

export default OnboardingModal;
