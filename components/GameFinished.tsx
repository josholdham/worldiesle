import { toast } from 'react-toastify';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from '../styles/Game.module.css';
import {
  BasicAnswer,
  FormattedTeam,
  SetOfGuessesWithFeedback,
} from '../custom-types';
import { useMemo } from 'react';
import emojisMap, { EmojiId } from '../utils/emojis';

type GameFinishedProps = {
  teams: FormattedTeam[];
  answer: BasicAnswer;
  guesses: SetOfGuessesWithFeedback[];
  isGameWon: boolean;
};
const GameFinished: React.FC<GameFinishedProps> = ({
  teams,
  answer,
  guesses,
  isGameWon,
}) => {
  const getTeamName = (id: string) =>
    teams.find((t) => t.id === id)?.names[0] || id;

  const teamAName = useMemo(() => {
    return getTeamName(answer.teamA);
  }, [answer]);

  const teamBName = useMemo(() => {
    return getTeamName(answer.teamB);
  }, [answer]);

  const msg = isGameWon
    ? `You guessed correctly in ${guesses.length} guess${
        guesses.length > 1 ? 'es' : ''
      }!`
    : `Bad Luck! You didn't guess correctly today`;

  const textToShare = useMemo(() => {
    const guessCount = isGameWon ? guesses.length : 'x';

    const title = `#Worldiesle #${answer.dayNumber} ${guessCount}/5`;

    const emojis = [...guesses]
      .reverse()
      .map((guess) => {
        let teamAEmoId: EmojiId = guess.teamA?.emojiId || 'noAnswer';
        let teamBEmoId: EmojiId = guess.teamB?.emojiId || 'noAnswer';
        let playerEmoId: EmojiId =
          guess.player?.emojiId || 'noAnswer';
        let yearEmoId: EmojiId = guess.year?.emojiId || 'noAnswer';

        let row: string = emojisMap[teamAEmoId].symbol;
        row += emojisMap[teamBEmoId].symbol;
        row += emojisMap[playerEmoId].symbol;
        row += emojisMap[yearEmoId].symbol;

        return row;
      })
      .join('\n');

    return [title, emojis, 'https://worldiesle.vercel.app/'].join(
      '\n'
    );
  }, [answer, isGameWon, guesses]);

  const share = () => {
    toast('Results copied to clipboard');
  };

  return (
    <>
      <div
        className={`${styles.banner} ${
          isGameWon ? styles.wonBanner : styles.lostBanner
        }`}
      >
        {msg}
      </div>
      <p
        style={{
          marginTop: 10,
          textAlign: 'center',
          lineHeight: '1.5rem',
        }}
      >
        Today&apos;s Worldiesle was the {answer.year} goal scored by{' '}
        {answer.player} in the {answer.competition} match between{' '}
        {teamAName} and {teamBName}.{' '}
        {answer.url ? (
          <>
            <span>You should be able to watch the goal </span>
            <a target="_blank" href={answer.url} rel="noreferrer">
              here
            </a>
            <span>.</span>
          </>
        ) : null}
      </p>
      <CopyToClipboard text={textToShare} onCopy={share}>
        <button className={`button ${styles.shareButton}`}>
          Share
        </button>
      </CopyToClipboard>
    </>
  );
};

export default GameFinished;
