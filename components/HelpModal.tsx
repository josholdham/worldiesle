import React, { useState } from 'react';
import styles from '../styles/Modals.module.css';
import Icon from './Icon';

const labels = {
  teamA: 'Home',
  teamB: 'Away',
  player: 'Player',
  year: 'Year',
};

type HelpModalProps = {};
const HelpModal: React.FC<HelpModalProps> = () => {
  const [showFAQ, setShowFAQ] = useState(false);

  return (
    <>
      <h1 className={styles.header}>How To Play</h1>

      <div className={styles.betaWarning}>
        <span className={styles.betaBold}>NOTE:</span> Worldiesle is
        in beta until mid-Feb. We are testing some features, and
        working on getting more data. It may also mean some of the
        goals you see during this period may be repeated at a later
        date. Thanks!
      </div>

      <div className={styles.howToPlayContainer}>
        <div className={styles.howToPlayBlock}>
          <div className={styles.howToPlayBlockIcon}>
            <Icon size={34} icon="sports_soccer" />
          </div>
          <div className={styles.howToPlayBlockBody}>
            <p>
              Guess the teams, scorer and year of each day&apos;s
              iconic or &apos;worldie&apos; goal.
            </p>
          </div>
        </div>
        <div className={styles.howToPlayBlock}>
          <div className={styles.howToPlayBlockIcon}>
            <Icon size={34} icon="monochrome_photos" />
          </div>
          <div className={styles.howToPlayBlockBody}>
            <p>
              A new picture is revealed after each guess. Previous
              guesses will contain hints to help you to the correct
              answer: hover or tap on each guesses&apos; emojis for
              clues.
            </p>
          </div>
        </div>
        <div className={styles.howToPlayBlock}>
          <div className={styles.howToPlayBlockIcon}>
            <Icon size={34} icon="insert_chart_outlined" />
          </div>
          <div className={styles.howToPlayBlockBody}>
            <p>
              Try to guess the goal in as few goes as possible. Share
              your scores with friends and come back every day for a
              new goal!
            </p>
          </div>
        </div>

        <p className={styles.faqLink}>
          For more information on how to play, check out the{' '}
          <a target="_blank" href="">
            Worldiesle FAQ
          </a>
        </p>
      </div>
    </>
  );
};

export default HelpModal;
