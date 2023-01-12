import React, { useEffect, useState } from 'react';
import Autosuggest, {
  ChangeEvent,
  RenderInputComponentProps,
} from 'react-autosuggest';
import Fuse from 'fuse.js';
import {
  FormattedPlayer,
  FormattedTeam,
  FormattedYear,
  Suggestion,
  GuessType,
} from '../custom-types';
import styles from '../styles/InputRow.module.css';
import theme from '../utils/autosuggestTheme';
import Emoji from './Emoji';

const fuseOptions = {
  includeScore: true,
  shouldSort: true,
  threshold: 0.4,
  keys: ['names'],
};

const settings = {
  teamA: {
    placeholder: 'Guess a Home Team',
  },
  teamB: {
    placeholder: 'Guess an Away Team',
  },
  player: {
    placeholder: 'Guess a Player',
  },
  year: {
    placeholder: 'Guess a Year',
  },
};

// TODO: perhaps this could be avoided if I could pass a generic to a component?
type FormattedOption =
  | FormattedTeam
  | FormattedPlayer
  | FormattedYear;

const InputRow: React.FC<{
  options: FormattedOption[];
  inputType: GuessType;
  guessIndex: number;
  onSetValue: (val: Suggestion) => void;
  correctGuess: Suggestion;
}> = ({
  options,
  inputType,
  onSetValue,
  guessIndex,
  correctGuess,
}) => {
  // TODO: should this be in a memo?
  const fuse = new Fuse(options, fuseOptions);

  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] =
    useState<FormattedOption[]>(options);

  /** Whenever we are looking at a new guess, check if there is a (previous) correct
   * guess: if there is we want to pre-fill the input and disable new values. */
  useEffect(() => {
    setValue(correctGuess?.names[0] || '');
  }, [guessIndex, correctGuess]);

  const clearSuggestions = () => {
    setSuggestions(options);
  };

  /** Populate the suggestion array based on input text */
  const getSuggestions = ({ value }: { value: string }): void => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const fuseResults = fuse.search(inputValue);

    setSuggestions(
      inputLength === 0 ? options : fuseResults.map((r) => r.item)
    );
  };

  const manuallyMatchOption = (val: string) =>
    options.find((o) => o.names[0] === val);

  const onChange = (
    _: React.FormEvent<HTMLElement>,
    { newValue, method }: ChangeEvent
  ) => {
    setValue(newValue);
    const matched = manuallyMatchOption(newValue);
    if (matched) {
      onSetValue(matched);
    } else {
      onSetValue(undefined);
    }
  };

  const customInputProps = {
    placeholder: settings[inputType].placeholder,
    value,
    onChange,
    className: styles.input,
    disabled: !!correctGuess,
  };

  const renderInputComponent = (
    inputProps: RenderInputComponentProps
  ) => (
    <div style={{ position: 'relative' }}>
      <input
        {...inputProps}
        style={
          correctGuess
            ? { paddingLeft: 27, borderColor: 'green' }
            : {}
        }
      />
      {correctGuess ? (
        <div style={{ position: 'absolute', top: -1, padding: 5 }}>
          <Emoji symbol="✅" label="White Checkmark" />
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
      inputProps={customInputProps}
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
        setSuggestions(options);
      }}
      theme={theme}
      renderInputComponent={renderInputComponent}
      shouldRenderSuggestions={() => true}
      highlightFirstSuggestion
    />
  );
};

export default InputRow;
