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

type HelpModalProps = {};
const HelpModal: React.FC<HelpModalProps> = () => {
  return (
    <>
      <h1 className={styles.h2}>How To Play</h1>

      <p>
        Each day a new world-class or iconic goal is chosen by
        Worldiesle, and your aim is to guess the player who scored it,
        the teams involved, and the year it was scored, from a series
        of 5 still images.
      </p>

      <p>
        You start with one image, and with each guess, a new image is
        revealed. Your previous guesses may guide your next guess: for
        instance guessing an incorrect year will reveal whether you
        need to guess higher or lower. Any clues can be revealed by
        hovering or tapping on the emojis next to previous guesses.
      </p>

      <h3 className={styles.faqTitle}>Frequently Asked Questions</h3>

      <div className={styles.faqBlock}>
        <h4>When is a new Worldiesle available?</h4>
        <p>
          A new Worldiesle is released every day, at midnight UK time.
        </p>
      </div>

      <div className={styles.faqBlock}>
        <h4>Why is this site called Worldiesle?</h4>
        <p>
          I&apos;m jumping on the Wordle bandwagon, albeit one year
          too late.
        </p>
        <p>
          Not sure if you&apos;ve heard the word &apos;Worldie&apos;
          before, used to describe an exceptional or world-class goal?
          I personally hate the phrase: I think it embarasses any
          adult found using it, and is one of the worst things about
          modern football, alongside the phrase GOAT, of scouting via
          Youtube skillz compilations, and hating half-and-half
          scarves. Ban it I say. Anyway, despite all that, it formed a
          nice (awful) pun when combined with Wordle, so I basically
          then had to work backwards from there to squeeze a game out
          of the wretched thing.
        </p>
      </div>

      <div className={styles.faqBlock}>
        <h4>
          If it&apos;s called Worldiesle, how come some of the goals
          are crap?
        </h4>
        <p>
          Look, as I said above, this whole game is the desperate
          attempt of someone to backwards engineer a viable website
          out of a questionable pun. As I started trying to implement
          it, and thinking of goals to use, I found that a lot of
          memorable and iconic goals that sprang to mind weren't just
          'good' ones. There are goals that lodge in the memory
          because of their importance, their timing, their commentary,
          or even just because they're a bit silly.
        </p>
        <p>
          I decided to include these goals because - frankly - who
          doesn't want to re-listen to Gary Neville's voice imploding
          in on itself as Torres scores against Barcelona in the
          Champions League semi-final (#Worldiesle #54 - you're
          welcome)?
        </p>
      </div>

      <div className={styles.faqBlock}>
        <h4>What games can goals come from?</h4>
        <p>
          Yes, your mate Carrot may have scored a worldie in your
          recent Sunday League kick about, but no - he won't be
          featured on this site.
        </p>
        <p>
          To keep things simple, and to fit within the narrow
          parameters of my football viewing memories, I have limited
          eligible games to those from the Premier League, UEFA
          Champions League, The World Cup, and the European
          Championships. And only goals scored after 1990
        </p>
      </div>

      <h4>Why does this site have such a stupid name?</h4>
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
        homage with our name. A &apos;Worldie&apos; is a term used to
        describe amazing or world-class goals, so the convoluted pun
        of Worldiesle was too good (/bad) to resist. Sorry.
      </p>

      <h4>From what games can the goals come from?</h4>
      <p>
        Goals are chosen from Premier League, Champions League, World
        Cup and European Championship matches. There will be no goals
        chosen prior to 1990, due to the difficulty in finding
        reliable footage.
      </p>

      <h4>
        Why are some goals chosen that clearly aren&apos;t Worldies?
      </h4>
      <p>
        Goals can be memorable for many reasons: not just their
        quality. We wanted to incorporate all sorts of these goals
        into the game,{' '}
      </p>

      <h4>
        The player/team/year I want to guess isn&apos;t available.
        Why?
      </h4>
      <p>
        We don&apos;t have an exhaustive list of teams and players,
        but any teams/players that appear in answers will be available
        to select.
      </p>

      <h4>Does the home/away team distinction matter?</h4>
      <p>
        Yes and no. In Premier League matches, you have to ensure the
        home team and away team are guessed correctly. We think there
        is some fun in identifying the stadium from the pictures as
        part of the game. However, given that some cup and most
        international games are played on neutral teritory, for those
        games the order you guess teams in does not matter.
      </p>

      <h4>How come I never see clues for my previous guesses?</h4>
      <p>
        Our data sets are relatively limited, and it is hard to draw
        meaningful clues for teams and players from previous guesses.
        We are working to improve this, but for now, it is mostly each
        new image that will have to guide you.
      </p>

      <h4>How do I save my scores across devices?</h4>
      <p>
        Your previous guesses and results are automatically saved on
        your device, but we do not currently have the ability to
        synchronise your stats across different device. We hope to
        offer this soon.
      </p>

      <h4>Is there a Worldiesle mobile app?</h4>

      <h4>Can I suggest a goal for future Worldiesle rounds?</h4>

      <h4>How can I support Worldiesle?</h4>
    </>
  );
};

export default HelpModal;
