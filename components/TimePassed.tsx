import { getUnixTimeStamp } from "@/helpers/util";
import { useEffect, useState } from "react";
import { TextStyle } from "react-native";
import { Text } from "react-native-paper";

export default function TimePassed({
  start,
  ended,
  style,
}: {
  start: number;
  ended?: number;
  style?: TextStyle;
}) {
  const [timeElapsed, setTimeElapsed] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const format = (value: number): string => {
    const integer = Math.floor(value);

    if (integer < 10) return `0${integer}`;
    return integer.toString();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (start !== -1) {
        let end = getUnixTimeStamp(new Date());
        if (ended && ended !== -1) end = ended;

        const secondsPassed = end - start;

        const seconds = secondsPassed % 60;
        const minutes = (secondsPassed / 60) % 60;
        const hours = secondsPassed / 3600;

        setTimeElapsed({
          hours: format(hours),
          minutes: format(minutes),
          seconds: format(seconds),
        });
      }
    }, 1 * 1000);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [start, ended]);

  return (
    <Text variant="bodyMedium" style={style}>
      {timeElapsed.hours}:{timeElapsed.minutes}:{timeElapsed.seconds}
    </Text>
  );
}
