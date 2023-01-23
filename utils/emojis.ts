const emojisMap = {
  noAnswer: {
    symbol: '⬜',
    label: 'White Square',
  },
  correct: {
    symbol: '✅',
    label: 'White Checkmark',
  },
  incorrect: {
    symbol: '🔴',
    label: 'Red Circle',
  },
  homeAway: {
    symbol: '🟦',
    label: 'Blue Square',
  },
  upSmall: {
    symbol: '🔼',
    label: 'Upwards Button',
  },
  upMedium: {
    symbol: '⏫',
    label: 'Double Upwards Button',
  },
  upLarge: {
    symbol: '🔺',
    label: 'Red Up Arrow',
  },
  downSmall: {
    symbol: '🔽',
    label: 'Downwards Button',
  },
  downMedium: {
    symbol: '⏬',
    label: 'Double Downwards Button',
  },
  downLarge: {
    symbol: '🔻',
    label: 'Red Down Arrow',
  },
  correctNationality: {
    symbol: '🟨',
    label: 'Yellow Square',
  },
};

export type EmojiId = keyof typeof emojisMap;

export default emojisMap;
