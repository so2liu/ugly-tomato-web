import { Task } from "../reducers/tasks.type";
import { generateID } from "../utils";

const generateTask = (seed: number): Task => ({
  uid: generateID("uid"),
  id: generateID("task"),
  title: `Title ${seed}`,
  label: [],
  isSync: false,
});

export const mockTasks = new Array(5)
  .fill(undefined)
  .map((_, index) => generateTask(index));
