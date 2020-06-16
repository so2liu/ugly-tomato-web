import { TypeName } from "../reducers/timer.types";

export function generateID(typeName: TypeName) {
  const id = [
    typeName,
    Date.now().toString(),
    Math.random().toString(36).slice(-8),
  ].join("-");

  return id;
}
