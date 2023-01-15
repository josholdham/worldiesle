import React, { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { GuessType, GuessWithFeedback } from '../custom-types';
import styles from '../styles/Modals.module.css';
import { loadAllGuesses } from '../utils/storage';
import Emoji from './Emoji';

const labels = {
  teamA: 'Home',
  teamB: 'Away',
  player: 'Player',
  year: 'Year',
};

type StatsModalProps = {};
const StatsModal: React.FC<StatsModalProps> = () => {
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [gamesWonPerc, setGamesWonPerc] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [guessDistribution, setGuessDistribution] = useState<
    number[]
  >([]);
  const [maxPerc, setMaxPerc] = useState(100);

  useEffect(() => {
    const guesses = loadAllGuesses();

    const keys = Object.keys(guesses).sort().reverse();

    let gamesPlayedCount = 0;
    let gamesWon = 0;
    let streakCount = 0;
    let maxStreakCount = 0;
    let currentStreakCount = 0;
    let hasLost = false;
    const guessDistributionCount = [0, 0, 0, 0, 0];

    keys.forEach((key) => {
      gamesPlayedCount++;
      const setOfGuesses = guesses[key];
      const lastGuess = setOfGuesses[0];
      const isWon =
        lastGuess.teamA?.isCorrect &&
        lastGuess.teamB?.isCorrect &&
        lastGuess.player?.isCorrect &&
        lastGuess.year?.isCorrect;
      if (isWon) {
        gamesWon++;
        streakCount++;
        maxStreakCount = Math.max(maxStreakCount, streakCount);
        if (!hasLost) {
          currentStreakCount++;
        }
        guessDistributionCount[setOfGuesses.length]++;
      } else {
        streakCount = 0;
        hasLost = true;
      }
    });

    const perc = gamesPlayedCount
      ? (gamesWon / gamesPlayedCount) * 100
      : 0;

    setGamesPlayed(gamesPlayedCount);
    setGamesWonPerc(perc);
    setMaxStreak(maxStreakCount);
    setCurrentStreak(currentStreakCount);
    setGuessDistribution(guessDistributionCount);
    setMaxPerc(Math.max(...guessDistributionCount));
  }, []);

  return (
    <>
      <h1 className={styles.h2}>Statistics</h1>

      <div className={styles.statsRow}>
        <div className={styles.statsBlock}>
          <div className={styles.statsValue}>{gamesPlayed}</div>
          <div className={styles.statsLabel}>Games Played</div>
        </div>
        <div className={styles.statsBlock}>
          <div className={styles.statsValue}>{gamesWonPerc}</div>
          <div className={styles.statsLabel}>Win %</div>
        </div>
        <div className={styles.statsBlock}>
          <div className={styles.statsValue}>{currentStreak}</div>
          <div className={styles.statsLabel}>Current Streak</div>
        </div>
        <div className={styles.statsBlock}>
          <div className={styles.statsValue}>{maxStreak}</div>
          <div className={styles.statsLabel}>Best Streak</div>
        </div>
      </div>

      <div className={styles.statsDivider}></div>

      <h3>Guess Distribution</h3>
      <div className={styles.distributionContainer}>
        {guessDistribution.map((val, i) => {
          const perc = (val / maxPerc) * 100;
          return (
            <div
              className={styles.distributionRow}
              key={`guessdist_${i}`}
            >
              <div className={styles.distributionNumber}>{i + 1}</div>
              <div className={styles.distributionBarContainer}>
                <div
                  className={styles.distributionBarInner}
                  style={val ? { width: `${perc}%` } : {}}
                >
                  {val}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default StatsModal;
