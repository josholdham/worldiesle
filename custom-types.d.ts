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

export type GuessType = 'teamA' | 'teamB' | 'player' | 'year';

export type BasicAnswer = {
  teamA: string;
  teamB: string;
  player: string;
  year: number;
  competition: string;
  link?: string;
  homeTeamMatters?: boolean;
};

export type GuessFromSuggestion =
  | FormattedPlayer
  | FormattedTeam
  | undefined;

export type FullSetOfGuesses = {
  teamA?: GuessFromSuggestion;
  teamB?: GuessFromSuggestion;
  player?: GuessFromSuggestion;
  year?: GuessFromSuggestion;
};

export type EmojiProps = {
  label?: string;
  symbol?: string;
};

export type GuessWithFeedback = {
  guess: GuessFromSuggestion;
  emoji: EmojiProps;
  hoverText: string;
  status: string;
};
