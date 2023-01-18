import React, { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import { GuessType, GuessWithFeedback } from '../custom-types';
import styles from '../styles/Modals.module.css';
import { loadAllGuesses } from '../utils/storage';
import Emoji from './Emoji';
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

        {/* <p>
          Each day a new iconic goal is chosen, and your aim is to
          guess the player who scored it, the teams involved, and the
          year it was scored, from a series of 5 still images.
        </p>

        <p>
          You start with one image, and with each guess, a new image
          is revealed. Your previous guesses may guide your next
          guess: for instance guessing an incorrect year will reveal
          whether you need to guess higher or lower. Any clues can be
          revealed by hovering or tapping on the emojis next to
          previous guesses.
        </p>

        <p>
          Guesses must come from our pre-selected list of teams &
          players, which will appear as you start typing your guess.
        </p>

        <p>
          You can check out the FAQ from the top-right hand menu, but
          for now... good luck!
        </p> */}
      </div>
      {showFAQ ? (
        <>
          <h3 className={styles.faqTitle}>
            Frequently Asked Questions
          </h3>

          <div className={styles.faqBlock}>
            <h4>When is a new Worldiesle available?</h4>
            <p>
              A new Worldiesle is released every day, at midnight UK
              time.
            </p>
          </div>

          <div className={styles.faqBlock}>
            <h4>Why is this site called Worldiesle?</h4>
            <p>
              This game is inspired by{' '}
              <a
                target="_blank"
                href="https://www.nytimes.com/games/wordle/index.html/"
                rel="noreferrer"
              >
                Wordle
              </a>
              , and similar games that appeared in its wake such as{' '}
              <a
                target="_blank"
                href="https://www.nytimes.com/games/wordle/index.html/"
                rel="noreferrer"
              >
                Worldle
              </a>{' '}
              and{' '}
              <a
                target="_blank"
                href="https://www.nytimes.com/games/wordle/index.html/"
                rel="noreferrer"
              >
                Heardle
              </a>
              . As our game follows a similar format, we wanted to pay
              homage with our name. A &apos;Worldie&apos; is a term
              used to describe amazing or world-class goals, so the
              convoluted pun of Worldiesle was too good (/bad) to
              resist. Sorry.
            </p>
          </div>
          <div className={styles.faqBlock}>
            <h4>What games can goals come from?</h4>
            <p>
              Goals are chosen from Premier League, Champions League,
              World Cup and European Championship matches. There will
              be no goals chosen prior to 1990, due to the difficulty
              in finding reliable footage.
            </p>
          </div>
          <div className={styles.faqBlock}>
            <h4>
              Why are some goals chosen that clearly aren&apos;t
              Worldies?
            </h4>
            <p>
              Goals can be memorable for many reasons: not just their
              quality. We wanted to incorporate all sorts of these
              goals into the game,{' '}
            </p>
          </div>
          <div className={styles.faqBlock}>
            <h4>
              The player/team/year I want to guess isn&apos;t
              available. Why?
            </h4>
            <p>
              We don&apos;t have an exhaustive list of teams and
              players, but any teams/players that appear in answers
              will be available to select.
            </p>
          </div>
          <div className={styles.faqBlock}>
            <h4>Does the home/away team distinction matter?</h4>
            <p>
              Yes and no. In Premier League matches, you have to
              ensure the home team and away team are guessed
              correctly. We think there is some fun in identifying the
              stadium from the pictures as part of the game. However,
              given that some cup and most international games are
              played on neutral teritory, for those games the order
              you guess teams in does not matter.
            </p>
          </div>
          <div className={styles.faqBlock}>
            <h4>
              How come I never see clues for my previous guesses?
            </h4>
            <p>
              Our data sets are relatively limited, and it is hard to
              draw meaningful clues for teams and players from
              previous guesses. We are working to improve this, but
              for now, it is mostly each new image that will have to
              guide you.
            </p>
          </div>
          <div className={styles.faqBlock}>
            <h4>How do I save my scores across devices?</h4>
            <p>
              Your previous guesses and results are automatically
              saved on your device, but we do not currently have the
              ability to synchronise your stats across different
              device. We hope to offer this soon.
            </p>
          </div>
          <div className={styles.faqBlock}>
            <h4>Is there a Worldiesle mobile app?</h4>
          </div>
          <div className={styles.faqBlock}>
            <h4>
              Can I suggest a goal for future Worldiesle rounds?
            </h4>
          </div>
          <div className={styles.faqBlock}>
            <h4>How can I support Worldiesle?</h4>
          </div>
        </>
      ) : null}
    </>
  );
};

export default HelpModal;
