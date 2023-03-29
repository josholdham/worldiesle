import { SetOfGuessesWithFeedback, StoredGuesses } from "../custom-types";

export const loadAllGuesses = (): StoredGuesses => {
  const storedGuesses = localStorage.getItem("guesses");
  return storedGuesses != null ? JSON.parse(storedGuesses) : {};
};

export const getTodaysGuesses = (
  dateStr: string
): SetOfGuessesWithFeedback[] => {
  const storedGuesses = loadAllGuesses();
  return storedGuesses[dateStr] || [];
};

export const overwriteTodaysGuesses = (
  dateStr: string,
  guess: SetOfGuessesWithFeedback[]
) => {
  const allGuesses = loadAllGuesses();
  localStorage.setItem(
    "guesses",
    JSON.stringify({
      ...allGuesses,
      [dateStr]: guess,
    })
  );
};

export const storeGuess = (
  dateStr: string,
  guess: SetOfGuessesWithFeedback
) => {
  const allGuesses = loadAllGuesses();
  const todaysGuesses = allGuesses[dateStr] || [];
  todaysGuesses.unshift(guess);

  localStorage.setItem(
    "guesses",
    JSON.stringify({
      ...allGuesses,
      [dateStr]: todaysGuesses,
    })
  );
};

export const setSeenLeaveBlankMessage = (msg: string) => {
  localStorage.setItem("seenLeaveBlankMessage", msg);
};

// TODO
// export const getRoughNumberOfVisits = (): number => {
//   const storedGuesses = localStorage.getItem('visits');
//   if (!storedGuesses) {
//     return 0;
//   }
// };

export const getSeenBirthdayMessage = (): boolean => {
  const seenBirthdayMessage = localStorage.getItem("seenBirthdayMessage");
  return seenBirthdayMessage === "true";
};

export const setSeenBirthdayMessage = () => {
  localStorage.setItem("seenBirthdayMessage", "true");
};

export const getShouldShowLeaveBlank = (): boolean => {
  const seenLeaveBlankMessage = localStorage.getItem("seenLeaveBlankMessage");
  if (seenLeaveBlankMessage === "true") {
    return false;
  }

  const allGuesses = loadAllGuesses();
  const dayGuesses = Object.values(allGuesses);
  const length = dayGuesses.length;
  let hasLeftBlankBefore = false;
  for (let i = 0; i < length; i++) {
    const day = dayGuesses[i];
    const dayLength = day.length;
    for (let j = 0; j < dayLength; j++) {
      const guess = day[j];
      if (
        guess.teamA?.emojiId === "noAnswer" ||
        guess.teamB?.emojiId === "noAnswer" ||
        guess.player?.emojiId === "noAnswer" ||
        guess.year?.emojiId === "noAnswer"
      ) {
        hasLeftBlankBefore = true;
        break;
      }
    }

    if (hasLeftBlankBefore) break;
  }
  if (hasLeftBlankBefore) {
    setSeenLeaveBlankMessage("true");
    return false;
  }

  return true;
};
