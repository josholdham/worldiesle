import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);
import { useEffect, useRef, useState } from "react";
import {
  getSeenBirthdayMessage,
  setSeenBirthdayMessage,
} from "../utils/storage";

export const useShowBirthday = (): {
  showBirthdayMessage: boolean;
} => {
  const hasChecked = useRef(false);
  const [showBirthdayMessage, setShowBirthdayMessage] = useState(false);

  useEffect(() => {
    if (hasChecked.current) {
      return;
    }
    hasChecked.current = true;
    const seenBirthdayMessage = getSeenBirthdayMessage();
    const isValidDate = dayjs().isBetween("2023-03-29", dayjs("2023-04-02"));
    if (!seenBirthdayMessage && isValidDate) {
      setShowBirthdayMessage(true);
      setSeenBirthdayMessage();
    }
  }, []);

  return {
    showBirthdayMessage,
  };
};
