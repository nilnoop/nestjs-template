import { AsyncLocalStorage } from 'async_hooks';

export interface ITrace {
  traceId: string;
  spanId: string;
  cspanId: string;
  startTime: number;
}

export const asyncLocalStorage = new AsyncLocalStorage<ITrace>();
