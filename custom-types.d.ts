import { EmojiId } from './utils/emojis';
import { SETTINGS } from './utils/settings';

export type FormattedTeam = {
  id: string;
  names: string[];
  intl: boolean;
};

export type FormattedPlayer = {
  id: string;
  names: string[];
  nationality: string;
};

export type FormattedYear = {
  id: string;
  names: string[];
};

export type GuessType = 'teamA' | 'teamB' | 'player' | 'year';

export type Competition = keyof typeof SETTINGS.competitions;

export type BasicGoal = {
  id: string;
  teamA: string;
  teamB: string;
  goalScoredFor: string;
  player: string;
  year: string;
  competition: Competition;
  url?: string;
  homeTeamMatters?: boolean;
};

export type BasicAnswer = BasicGoal & {
  dateId: string;
  dayNumber: number;
};

export type Suggestion =
  | FormattedPlayer
  | FormattedTeam
  | FormattedYear
  | undefined;

export type SetOfGuesses = {
  teamA: Suggestion;
  teamB: Suggestion;
  player: Suggestion;
  year: Suggestion;
};

export type EmojiProps = {
  label?: string;
  symbol?: string;
};

export type GuessWithFeedback = {
  guess: Suggestion;
  emojiId: EmojiId;
  hoverText: string;
  isCorrect: boolean;
};

export type SetOfGuessesWithFeedback = {
  teamA?: GuessWithFeedback;
  teamB?: GuessWithFeedback;
  player?: GuessWithFeedback;
  year?: GuessWithFeedback;
};

export type StoredGuesses = Record<
  string,
  SetOfGuessesWithFeedback[]
>;
