import React from 'react';
import { EmojiProps } from '../custom-types';
import emojisMap, { EmojiId } from '../utils/emojis';
const Emoji = ({
  emojiId,
  id,
}: {
  emojiId?: EmojiId;
  id?: string;
}) => {
  const label = (emojiId && emojisMap[emojiId]?.label) || '';
  const symbol = (emojiId && emojisMap[emojiId]?.symbol) || '';

  return (
    <span
      className="emoji"
      role="img"
      aria-label={label}
      aria-hidden={label ? 'false' : 'true'}
      id={id}
    >
      {symbol}
    </span>
  );
};
export default Emoji;
