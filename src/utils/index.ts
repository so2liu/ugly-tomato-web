import { TypeName } from "../reducers/timer.types";

export function generateID(typeName: TypeName) {
  const id = [
    typeName,
    Date.now().toString(),
    Math.random().toString(36).slice(-8),
  ].join("-");

  return id;
}

export function secToTimer(inputSec: number): string {
  const sec = Math.abs(inputSec);
  const hour = Math.floor(sec / 3600);
  const minute = Math.floor(sec / 60);
  const second = sec % 60;

  const fixBits = (n: number, b: number = 2) => String("0" + n).slice(-2);

  return (
    (inputSec < 0 ? "-" : "") +
    ` ${fixBits(hour)}:${fixBits(minute)}:${fixBits(second)}`
  );
}

export function loadingAppStateFromLocalStorage<T>(
  blankState: T,
  keyName: string
): T {
  const stringifiedJSON: string | null = window.localStorage.getItem(keyName);
  if (typeof stringifiedJSON === "string") {
    const loaded: T = JSON.parse(stringifiedJSON);
    return loaded;
  }

  return blankState;
}
