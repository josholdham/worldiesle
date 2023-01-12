import React from 'react';
import { EmojiProps } from '../custom-types';
const Emoji = (props: EmojiProps & { id?: string }) => (
  <span
    className="emoji"
    role="img"
    aria-label={props.label ? props.label : ''}
    aria-hidden={props.label ? 'false' : 'true'}
    id={props.id}
  >
    {props.symbol}
  </span>
);
export default Emoji;
