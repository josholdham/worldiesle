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

type SupportModalProps = {};
const SupportModal: React.FC<SupportModalProps> = () => {
  return (
    <>
      <h1 className={styles.h2}>Statistics</h1>
    </>
  );
};

export default SupportModal;
