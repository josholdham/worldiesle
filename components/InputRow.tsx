import React, { useEffect, useState } from 'react';
import Autosuggest, { ChangeEvent } from 'react-autosuggest';
import Fuse from 'fuse.js';
import {
  FormattedPlayer,
  FormattedTeam,
  GuessFromSuggestion,
  GuessType,
} from '../custom-types';
import styles from '../styles/InputRow.module.css';

const fuseOptions = {
  includeScore: true,
  shouldSort: true,
  threshold: 0.4,
  keys: ['names'],
};

const settings = {
  teamA: {
    placeholder: 'Enter Team A',
  },
  teamB: {
    placeholder: 'Enter Team B',
  },
  player: {
    placeholder: 'Enter Player',
  },
  year: {
    placeholder: 'Enter Year',
  },
};

type FormattedOption = FormattedTeam | FormattedPlayer;

const InputRow: React.FC<{
  options: FormattedOption[];
  inputType: GuessType;
  guessIndex: number;
  onSetValue: (val: GuessFromSuggestion) => void;
  correctGuess: GuessFromSuggestion;
}> = ({
  options,
  inputType,
  onSetValue,
  guessIndex,
  correctGuess,
}) => {
  console.log('correctGuess', correctGuess);
  // TODO: should this be in a memo?
  const fuse = new Fuse(options, fuseOptions);

  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<FormattedOption[]>(
    []
  );

  useEffect(() => {
    setValue(correctGuess?.names[0] || '');
  }, [guessIndex, correctGuess]);

  const clearSuggestions = () => {
    setSuggestions([]);
  };

  const getSuggestions = ({ value }: { value: string }): void => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    const fuseResults = fuse.search(inputValue);

    setSuggestions(
      inputLength === 0 ? options : fuseResults.map((r) => r.item)
    );
  };

  const onChange = (
    event: React.FormEvent<HTMLElement>,
    { newValue }: ChangeEvent
  ) => {
    setValue(newValue);
  };

  const inputProps = {
    placeholder: settings[inputType].placeholder,
    value,
    onChange,
    className: styles.input,
    disabled: !!correctGuess,
  };

  const renderInputComponent = (inputProps) => (
    <div style={{ position: 'relative' }}>
      <input
        {...inputProps}
        style={
          correctGuess
            ? { paddingLeft: 25, borderColor: 'green' }
            : {}
        }
      />
      {correctGuess ? (
        <div style={{ position: 'absolute', top: -1, padding: 5 }}>
          ✅
        </div>
      ) : null}
    </div>
  );

  return (
    <Autosuggest
      id={`autosuggest_${inputType}`}
      suggestions={suggestions}
      onSuggestionsFetchRequested={getSuggestions}
      onSuggestionsClearRequested={clearSuggestions}
      getSuggestionValue={(suggestion: FormattedOption) =>
        suggestion.names[0]
      }
      renderSuggestion={(suggestion, { isHighlighted }) => {
        return (
          <div
            className={
              isHighlighted ? styles['highlighted-suggestion'] : ''
            }
          >
            {suggestion.names[0]}
          </div>
        );
      }}
      inputProps={inputProps}
      containerProps={{
        className: styles['input-container'],
      }}
      renderSuggestionsContainer={({ containerProps, children }) => (
        <div
          {...containerProps}
          className={styles['suggestions-container']}
        >
          {children}
        </div>
      )}
      onSuggestionSelected={(event, { suggestion }) => {
        setSuggestions([]);
        onSetValue(suggestion);
      }}
      renderInputComponent={renderInputComponent}
    />
  );
};

export default InputRow;
