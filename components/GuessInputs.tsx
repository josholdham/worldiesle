import React, { useEffect, useState } from 'react';
import {
  FormattedPlayer,
  FormattedTeam,
  FormattedYear,
  SetOfGuesses,
  SetOfGuessesWithFeedback,
  Suggestion,
} from '../custom-types';
import styles from '../styles/GuessInputs.module.css';
import { SETTINGS } from '../utils/settings';
import { getShouldShowLeaveBlank, setSeenLeaveBlankMessage } from '../utils/storage';
import InputRow from './InputRow';

type GuessInputsProps = {
  teams: FormattedTeam[];
  players: FormattedPlayer[];
  years: FormattedYear[];
  guessIndex: number;
  onSubmit: (guess: SetOfGuesses) => void;
  correctGuesses: SetOfGuessesWithFeedback;
};
const GuessInputs: React.FC<GuessInputsProps> = ({
  guessIndex,
  teams,
  players,
  years,
  onSubmit,
  correctGuesses,
}) => {
  const [showLeaveBlank, setShowLeaveBlank] = useState(false);
  const [leaveBlankIsPaused, setLeaveBlankIsPaused] = useState(false);

  const [teamA, setTeamA] = useState<Suggestion>();
  const [teamB, setTeamB] = useState<Suggestion>();
  const [player, setPlayer] = useState<Suggestion>();
  const [year, setYear] = useState<Suggestion>();

  useEffect(() => {
    const shouldShowLeaveBlank = getShouldShowLeaveBlank();
    console.log('shouldShowLeaveBlank', shouldShowLeaveBlank);
    setShowLeaveBlank(shouldShowLeaveBlank);
    if (shouldShowLeaveBlank) {
      console.log('setSeenLeaveBlankMessage');
      setSeenLeaveBlankMessage('true');
    }
  }, []);

  const onGuessClick = () => {
    onSubmit({
      teamA,
      teamB,
      player,
      year,
    });

    setTeamA(undefined);
    setTeamB(undefined);
    setPlayer(undefined);
  };

  return (
    <div className={styles['guess-container']} onClick={() => {
      setShowLeaveBlank(false);
    }}>
      <div className={styles['guess-title']}>
        Guess {guessIndex + 1}/{SETTINGS.maxGuesses}
      </div>
      <InputRow
        options={teams}
        inputType="teamA"
        onSetValue={setTeamA}
        guessIndex={guessIndex}
        correctGuess={correctGuesses.teamA?.guess}
      />
      <InputRow
        options={teams}
        inputType="teamB"
        onSetValue={setTeamB}
        guessIndex={guessIndex}
        correctGuess={correctGuesses.teamB?.guess}
      />
      <InputRow
        options={players}
        inputType="player"
        onSetValue={setPlayer}
        guessIndex={guessIndex}
        correctGuess={correctGuesses.player?.guess}
      />
      <InputRow
        options={years}
        inputType="year"
        onSetValue={setYear}
        guessIndex={guessIndex}
        correctGuess={correctGuesses.year?.guess}
      />
      <div className={styles.buttonContainer}>
        <button
          className={`button button-highlight`}
          onClick={onGuessClick}
        >
          Guess
        </button>
        {showLeaveBlank ? (<div className={`${styles.leaveBlank} ${!leaveBlankIsPaused ? styles.leaveBlankAnimated : null}`} onMouseEnter={() => setLeaveBlankIsPaused(true)} onMouseLeave={() => setLeaveBlankIsPaused(false)}>
          NOTE: You can click &apos;Guess&apos; without filling out all the fields to skip & reveal a new image. [ <span className="pseudo-link">OK</span> ]
          <div className={styles.leaveBlankBottomArrow}></div>
        </div>) : null}
      </div>

      
    </div>
  );
};

export default GuessInputs;
