import { SetOfGuessesWithFeedback } from "../custom-types";
import { SETTINGS } from "./settings";

export const sendAnalyticsEvent = (event: string, data: any) => {
  // Send the event to the analytics service
  if (process.env.NODE_ENV !== 'development') {
    const umami = window.umami;
    if (umami) {
      umami.trackEvent(event, data);
    }
  }
};

export const trackModalOpen = (modalName: string) => {
  sendAnalyticsEvent(`Modal Opened (${modalName})`, { modalName });
}
      

export const trackGuess = (guess: SetOfGuessesWithFeedback, guessNumber: number) => {
  // Track the guess
  sendAnalyticsEvent(`Guess ${guessNumber}`, guess);
  // Track guess results
  if (
    guess.teamA?.isCorrect &&
    guess.teamB?.isCorrect &&
    guess.player?.isCorrect &&
    guess.year?.isCorrect
  ) {
    sendAnalyticsEvent('Correct Guess', { guessNumber});
  } else if (guessNumber === SETTINGS.maxGuesses) {
    sendAnalyticsEvent('Game Lost', {});
  }
}