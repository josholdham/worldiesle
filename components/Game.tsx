import GuessInputs from './GuessInputs';
import styles from '../styles/Game.module.css';
import {
  FormattedTeam,
  FormattedPlayer,
  SetOfGuesses,
  BasicAnswer,
  SetOfGuessesWithFeedback,
  GuessType,
  FormattedYear,
} from '../custom-types';
import { useEffect, useMemo, useState } from 'react';
import PreviousGuess from './PreviousGuess';
import ImagesBrowser from './ImagesBrowser';
import Confetti from './Confetti';
import { getGuessFeedback } from '../utils/evaluateGuesses';
import { getTodaysGuesses, storeGuess } from '../utils/storage';
import PuffLoader from 'react-spinners/PuffLoader';
import GameFinished from './GameFinished';
import { SETTINGS } from '../utils/settings';
import { trackGuess } from '../utils/analytics';

declare global {
  var umami: {
    trackEvent: (eventName: string, data: any) => void;
  };
}

type GameProps = {
  teams: FormattedTeam[];
  players: FormattedPlayer[];
  answer: BasicAnswer;
  years: FormattedYear[];
  imageUrls: string[];
};
const Game: React.FC<GameProps> = ({
  teams,
  players,
  answer,
  years,
  imageUrls,
}) => {
  const [guesses, setGuesses] = useState<SetOfGuessesWithFeedback[]>(
    []
  );
  const [loaded, setLoaded] = useState(false);

  /** When we get a new answer (this includes when the component is initialised)
   * we check local storage to see if any guesses already exist */
  useEffect(() => {
    const existingBasicGuesses = getTodaysGuesses(answer.dateId);
    setGuesses(existingBasicGuesses);
    setLoaded(true);
  }, [answer]);

  const fullPlayerAnswer = useMemo(() => {
    return players.find((o) => o.id === answer.player);
  }, [answer, players]);

  const onSubmit = (basicGuess: SetOfGuesses) => {
    if (guesses.length >= SETTINGS.maxGuesses) return;

    const guessNumber = guesses.length + 1;

    // Create curried fn to get feedback for each guess type
    const getFeedback = (guessKey: GuessType) =>
      getGuessFeedback(
        basicGuess,
        guessKey,
        answer,
        correctGuesses,
        fullPlayerAnswer
      );

    const newGuess = {
      teamA: getFeedback('teamA'),
      teamB: getFeedback('teamB'),
      player: getFeedback('player'),
      year: getFeedback('year'),
    };

    // Add this guess to local storage.
    storeGuess(answer.dateId, newGuess);

    // Add this guess to state
    setGuesses([newGuess, ...guesses]);

    // Track guess with analytics
    trackGuess(newGuess, guessNumber);
  };

  const isGameWon = useMemo(() => {
    if (!guesses.length) return false;
    const guess = guesses[0];
    if (
      guess.teamA?.isCorrect &&
      guess.teamB?.isCorrect &&
      guess.player?.isCorrect &&
      guess.year?.isCorrect
    ) {
      return true;
    }
    return false;
  }, [guesses]);

  const correctGuesses = useMemo<SetOfGuessesWithFeedback>(() => {
    if (!guesses.length) return {};
    const guess = guesses[0];
    return {
      teamA: guess.teamA?.isCorrect ? guess.teamA : undefined,
      teamB: guess.teamB?.isCorrect ? guess.teamB : undefined,
      player: guess.player?.isCorrect ? guess.player : undefined,
      year: guess.year?.isCorrect ? guess.year : undefined,
    };
  }, [guesses]);

  return (
    <>
      <ImagesBrowser
        guessIndex={guesses.length}
        isGameWon={isGameWon}
        imageUrls={imageUrls}
        answer={answer}
      />

      <Confetti isGameWon={isGameWon} />

      {loaded ? (
        <>
          <div className="inner-container">
            {isGameWon || guesses.length >= SETTINGS.maxGuesses ? (
              <GameFinished
                guesses={guesses}
                answer={answer}
                isGameWon={isGameWon}
                teams={teams}
              />
            ) : null}

            {guesses.length < SETTINGS.maxGuesses && !isGameWon ? (
              <GuessInputs
                guessIndex={guesses.length}
                teams={teams}
                players={players}
                years={years}
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
                    guesses={guess}
                    guessIndex={guesses.length - i - 1}
                    key={`prevGuess_${i}`}
                  />
                ))
              : null}
          </div>
        </>
      ) : (
        <div className={styles.loadingContainer}>
          <PuffLoader color="#36d7b7" size={40} />
        </div>
      )}
    </>
  );
};

export default Game;
