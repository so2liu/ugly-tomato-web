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
  keyName: string,
  chooseBlankState?: (loaded: T) => boolean
): T {
  const stringifiedJSON: string | null = window.localStorage.getItem(keyName);
  if (typeof stringifiedJSON === "string") {
    const loaded: T = JSON.parse(stringifiedJSON);
    if (chooseBlankState && chooseBlankState(loaded)) return blankState;
    return loaded;
  }

  return blankState;
}

interface withStartEnd {
  startAt: number;
  endAt: number;
}
export function calTotalSecFromRecords<T extends withStartEnd>(
  records: T[]
): number {
  const ms = records.reduce((pre, cur) => cur.endAt - cur.startAt + pre, 0);
  return Math.floor(ms / 1000);
}
