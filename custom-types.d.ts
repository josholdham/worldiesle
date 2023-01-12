export type FormattedTeam = {
  id: string;
  names: string[];
  imgUrl: string;
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

export type BasicAnswer = {
  dateId: string;
  dayNumber: number;
  teamA: string;
  teamB: string;
  player: string;
  year: number;
  competition: string;
  link?: string;
  homeTeamMatters?: boolean;
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

export type StoredGuesses = Record<string, SetOfGuesses[]>;

export type EmojiProps = {
  label?: string;
  symbol?: string;
};

export type GuessWithFeedback = {
  guess: Suggestion;
  emoji: EmojiProps;
  hoverText: string;
  isCorrect: boolean;
};

export type SetOfGuessesWithFeedback = {
  teamA?: GuessWithFeedback;
  teamB?: GuessWithFeedback;
  player?: GuessWithFeedback;
  year?: GuessWithFeedback;
};
