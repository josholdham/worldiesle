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
  ignoreLocation: true,
  threshold: 0.5,
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

  /** We only want to accept guesses that match a suggestion. When
   * the input value changes (in the onChange fn), we look to see
   * if the value matches a suggestion's first name value exactly.
   *
   * If the value has been selected from the autosuggest list, this
   * will definitely be the case, as getSuggestionValue returns the
   * first name value to pass to the input.
   *
   * If not, we still want to ensure a user typing the autosuggest
   * value exactly gies a match (pertinent for years particularly).
   *
   * Finally, if no match is found, we want to ensure we remove any
   * previously selected suggestion, as it may no longer reflect what
   * the user is seeing in the input field (eg they may select a
   * suggestion (eg 2020), then press backspace (giving 202), and then
   * when they click guess 2020 would appear - unless we take this step).
   *
   * For these reasons, we handle passing guesses to the parent here,
   * rather than by using onSuggestionSelected, as I had previously
   * explored.
   */
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
    disabled: !!correctGuess,
    /** NOTE: for some reason setting an input value in theme does not
     * get auto-applied as it should, nor does specifying theme.input as
     * the classname here. For now, fallback to styles. */
    className: styles.input,
  };

  /**
   * Custom input renderer, required in cases where we want to pre-fill
   * the input with a correct guess, and indicate this with a checkmark
   * emoji. */
  const renderInputComponent = (
    inputProps: RenderInputComponentProps
  ) => (
    <div style={{ position: 'relative' }}>
      <input
        {...inputProps}
        aria-label={settings[inputType].placeholder}
        style={
          correctGuess
            ? { paddingLeft: 29, borderColor: 'green' }
            : {}
        }
      />
      {correctGuess ? (
        <div className={styles.correctEmoji}>
          <Emoji emojiId="correct" />
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
      renderSuggestion={(suggestion) => {
        return <div>{suggestion.names[0]}</div>;
      }}
      inputProps={customInputProps}
      onSuggestionSelected={(event, { suggestion }) => {
        setSuggestions(options);
      }}
      theme={theme}
      renderInputComponent={renderInputComponent}
      shouldRenderSuggestions={() => true}
    />
  );
};

export default InputRow;
