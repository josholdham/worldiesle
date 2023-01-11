import React, { useState } from 'react';
import {
  FormattedPlayer,
  FormattedTeam,
  FullSetOfGuesses,
  GuessFromSuggestion,
} from '../custom-types';
import styles from '../styles/Guess.module.css';
import InputRow from './InputRow';

type GuessProps = {
  teams: FormattedTeam[];
  players: FormattedPlayer[];
  guessIndex: number;
  onSubmit: (guess: FullSetOfGuesses) => void;
  correctGuesses: FullSetOfGuesses;
};
const Guess: React.FC<GuessProps> = ({
  guessIndex,
  teams,
  players,
  onSubmit,
  correctGuesses,
}) => {
  const [teamA, setTeamA] = useState<GuessFromSuggestion>();
  const [teamB, setTeamB] = useState<GuessFromSuggestion>();
  const [player, setPlayer] = useState<GuessFromSuggestion>();
  const [year, setYear] = useState<GuessFromSuggestion>();

  const onGuessClick = () => {
    onSubmit({
      teamA,
      teamB,
      player,
      year,
    });
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
        correctGuess={correctGuesses.teamA}
      />
      <InputRow
        options={teams}
        inputType="teamB"
        onSetValue={setTeamB}
        guessIndex={guessIndex}
        correctGuess={correctGuesses.teamB}
      />
      <InputRow
        options={players}
        inputType="player"
        onSetValue={setPlayer}
        guessIndex={guessIndex}
        correctGuess={correctGuesses.player}
      />
      {/* <InputRow
        options={teams}
        inputType="year"
        onSetValue={setYear}
        guessIndex={guessIndex}
      /> */}
      <button className={`button`} onClick={onGuessClick}>
        Guess
      </button>
    </div>
  );
};

export default Guess;
