import React, { useState } from 'react';
import {
  FormattedPlayer,
  FormattedTeam,
  FormattedYear,
  SetOfGuesses,
  SetOfGuessesWithFeedback,
  Suggestion,
} from '../custom-types';
import styles from '../styles/GuessInputs.module.css';
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
  const [teamA, setTeamA] = useState<Suggestion>();
  const [teamB, setTeamB] = useState<Suggestion>();
  const [player, setPlayer] = useState<Suggestion>();
  const [year, setYear] = useState<Suggestion>();

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
    <div className={styles['guess-container']}>
      <div className={styles['guess-title']}>
        Guess {guessIndex + 1}/5
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
      <button
        className={`button button-highlight`}
        onClick={onGuessClick}
      >
        Guess
      </button>
    </div>
  );
};

export default GuessInputs;
