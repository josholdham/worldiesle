import Image from 'next/image';
import Guess from '../components/Guess';
import styles from '../styles/Game.module.css';
import {
  FormattedTeam,
  FormattedPlayer,
  FullSetOfGuesses,
  BasicAnswer,
  GuessWithFeedback,
} from '../custom-types';
import { useCallback, useMemo, useState } from 'react';
import PreviousGuess from './PreviousGuess';
import ImagesBrowser from './ImagesBrowser';
import Confetti from './Confetti';
import Emoji from './Emoji';

const defaultGuessWithFeedback = {
  status: 'blank',
  emoji: {
    symbol: '🔴',
    label: 'Red Circle',
  },
  hoverText: 'No answer was guessed.',
};

type GameProps = {
  teams: FormattedTeam[];
  players: FormattedPlayer[];
  answer: BasicAnswer;
};
const Game: React.FC<GameProps> = ({ teams, players, answer }) => {
  const [guesses, setGuesses] = useState<FullSetOfGuesses[]>([]);
  const [correctGuesses, setCorrectGuesses] =
    useState<FullSetOfGuesses>({});

  const onSubmit = useCallback(
    (basicGuess: FullSetOfGuesses) => {
      if (guesses.length > 4) return;

      const correctGuessesCopy = { ...correctGuesses };

      const teamAGuess: GuessWithFeedback = {
        guess: basicGuess.teamA,
        ...defaultGuessWithFeedback,
      };
      if (
        basicGuess.teamA?.id === answer.teamA ||
        (!answer.homeTeamMatters &&
          basicGuess.teamA?.id === answer.teamB &&
          basicGuess.teamB?.id !== answer.teamB)
      ) {
        teamAGuess.status = 'correct';
        teamAGuess.emoji = {
          symbol: '✅',
          label: 'White Checkmark',
        };
        teamAGuess.hoverText = '';
      } else if (
        answer.homeTeamMatters &&
        basicGuess.teamA?.id === answer.teamB &&
        basicGuess.teamB?.id !== answer.teamB
      ) {
        teamAGuess.status = 'close';
        teamAGuess.emoji = {
          symbol: '🔄',
          label: 'Clockwise Arrows',
        };
        teamAGuess.hoverText =
          'This team did feature in this match, but not as the home team';
      } else {
        teamAGuess.status = 'incorrect';
        teamAGuess.emoji = {
          symbol: '🔴',
          label: 'Red Circle',
        };
        teamAGuess.hoverText = 'Incorrect guess';
      }

      const teamBGuess: GuessWithFeedback = {
        guess: basicGuess.teamB,
        ...defaultGuessWithFeedback,
      };
      if (
        basicGuess.teamB?.id === answer.teamB ||
        (!answer.homeTeamMatters &&
          basicGuess.teamB?.id === answer.teamA &&
          basicGuess.teamA?.id !== answer.teamA)
      ) {
        teamBGuess.status = 'correct';
        teamBGuess.emoji = {
          symbol: '✅',
          label: 'White Checkmark',
        };
        teamBGuess.hoverText = '';
      } else if (
        answer.homeTeamMatters &&
        basicGuess.teamB?.id === answer.teamA &&
        basicGuess.teamA?.id !== answer.teamA
      ) {
        teamBGuess.status = 'close';
        teamBGuess.emoji = {
          symbol: '🔄',
          label: 'Clockwise Arrows',
        };
        teamBGuess.hoverText =
          'This team did feature in this match, but not as the away team';
      } else {
        teamBGuess.status = 'incorrect';
        teamBGuess.emoji = {
          symbol: '🔴',
          label: 'Red Circle',
        };
        teamBGuess.hoverText = 'Incorrect guess';
      }

      const playerGuess: GuessWithFeedback = {
        guess: basicGuess.player,
        ...defaultGuessWithFeedback,
      };
      if (basicGuess.player?.id === answer.player) {
        playerGuess.status = 'correct';
        playerGuess.emoji = {
          symbol: '✅',
          label: 'White Checkmark',
        };
        playerGuess.hoverText = '';
      } else {
        playerGuess.status = 'incorrect';
        playerGuess.emoji = {
          symbol: '🔴',
          label: 'Red Circle',
        };
        playerGuess.hoverText = 'Incorrect guess';
      }

      setCorrectGuesses(correctGuessesCopy);
      setGuesses([...guesses, basicGuess]);
    },
    [guesses, correctGuesses, answer]
  );

  const isGameWon = useMemo(() => {
    const { teamA, teamB, player } = correctGuesses;
    return !!(teamA && teamB && player);
  }, [correctGuesses]);

  return (
    <>
      <ImagesBrowser guessIndex={isGameWon ? 4 : guesses.length} />

      <Confetti isGameWon={isGameWon} />

      <div className="inner-container">
        {isGameWon ? (
          <>
            <div className={styles.wonBanner}>
              You guessed correctly in {guesses.length} guess
              {guesses.length > 1 ? 'es' : ''}!
            </div>
            <button className={`button ${styles.shareButton}`}>
              Share
            </button>
            <p>
              The goal scored was the {answer.year} goal scored by{' '}
              {answer.player} in the {answer.competition} match
              between {answer.teamA} and {answer.teamB}.{' '}
              {answer.link
                ? `You should be able to watch the goal here`
                : ''}
            </p>
          </>
        ) : null}

        {guesses.length <= 4 && !isGameWon ? (
          <Guess
            guessIndex={guesses.length}
            teams={teams}
            players={players}
            onSubmit={onSubmit}
            correctGuesses={correctGuesses}
          />
        ) : null}
      </div>

      {guesses.length ? (
        <div className={styles.previousGuesses}>
          <span className={styles.line}></span>
          <span className={styles.previousGuessesTitle}>
            Previous Guesses
          </span>
          <span className={styles.line}></span>
        </div>
      ) : null}

      <div className="inner-container">
        {guesses.length
          ? guesses.map((guess, i) => (
              <PreviousGuess
                guess={guess}
                guessIndex={i}
                key={`prevGuess_${i}`}
              />
            ))
          : null}
      </div>
    </>
  );
};

export default Game;
