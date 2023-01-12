import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { GuessType, GuessWithFeedback } from '../custom-types';
import styles from '../styles/Modals.module.css';
import Emoji from './Emoji';

const labels = {
  teamA: 'Home',
  teamB: 'Away',
  player: 'Player',
  year: 'Year',
};

type StatsModalProps = {};
const StatsModal: React.FC<StatsModalProps> = () => {
  return (
    <>
      <h1 className={styles.h2}>Statistics</h1>

      <div className={styles.statsRow}>
        <div className={styles.statsBlock}>
          <div className={styles.statsValue}>1</div>
          <div className={styles.statsLabel}>Games Played</div>
        </div>
        <div className={styles.statsBlock}>
          <div className={styles.statsValue}>100</div>
          <div className={styles.statsLabel}>Win %</div>
        </div>
        <div className={styles.statsBlock}>
          <div className={styles.statsValue}>1</div>
          <div className={styles.statsLabel}>Current Streak</div>
        </div>
        <div className={styles.statsBlock}>
          <div className={styles.statsValue}>1</div>
          <div className={styles.statsLabel}>Best Streak</div>
        </div>
      </div>

      <div className={styles.statsDivider}></div>

      <h3>Guess Distribution</h3>
    </>
  );
};

export default StatsModal;
