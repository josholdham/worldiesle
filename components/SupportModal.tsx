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
      <h1 className={styles.header}>Support</h1>

      <p>
        Worldiesle is a small hobby project created by Josh{' '}
        <a
          target="_blank"
          href="https://twitter.com/worldiesle"
          rel="noreferrer"
        >
          @worldiesle
        </a>
      </p>

      <p>
        If you&apos;d like to support the project, you can chuck us a
        few quid over at{' '}
        <a
          target="_blank"
          href="https://ko-fi.com/worldiesle"
          rel="noreferrer"
        >
          ko-fi.com/worldiesle
        </a>
        . No pressure though, I made this just because I thought
        it&apos;d be fun - not to make money.
      </p>

      <p>
        Please do spread the word though - and share the site and your
        results with friends!
      </p>

      <p>
        Oh, and if you&apos;d like to get in touch, the best place to
        contact me is on Twitter,{' '}
        <a
          target="_blank"
          href="https://twitter.com/worldiesle"
          rel="noreferrer"
        >
          @worldiesle
        </a>
      </p>
    </>
  );
};

export default SupportModal;
