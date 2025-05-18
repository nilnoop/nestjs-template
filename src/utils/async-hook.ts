import { AsyncLocalStorage } from "node:async_hooks";

export interface ITrace {
  traceId: string;
  spanId: string;
  cspanId: string;
  startTime: number;
}

export const asyncLocalStorage = new AsyncLocalStorage<ITrace>();
