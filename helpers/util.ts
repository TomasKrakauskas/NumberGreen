/** Converts JS Date into a UNIX timestamp */
export function getUnixTimeStamp(date: Date | number): number {
  if (typeof date === "number") return Math.floor(date / 1000);

  return Math.floor(date.getTime() / 1000);
}
