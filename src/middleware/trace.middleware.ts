import { Injectable, NestMiddleware } from '@nestjs/common';
import { asyncLocalStorage } from '@/utils/async-hook';
import { genSpanId, genTraceId } from 'src/utils/trace-id';

const TRACE_ID_HEADER = 'x-trace-id';
const SPAN_ID_HEADER = 'x-span-id';
const CSPAN_ID_HEADER = 'x-cspan-id';

@Injectable()
export class TraceMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const _traceId = req.headers[TRACE_ID_HEADER];
    const _cspanId = req.headers[CSPAN_ID_HEADER];

    const traceId = _traceId || genTraceId();
    const spanId = _cspanId || genSpanId();
    const cspanId = genSpanId();
    const startTime = Date.now();

    req.headers[TRACE_ID_HEADER] = traceId;
    req.headers[SPAN_ID_HEADER] = spanId;
    req.headers[CSPAN_ID_HEADER] = cspanId;

    res.setHeader(TRACE_ID_HEADER, traceId);
    res.setHeader(SPAN_ID_HEADER, spanId);
    res.setHeader(CSPAN_ID_HEADER, cspanId);

    asyncLocalStorage.run({ traceId, spanId, cspanId, startTime }, next);
  }
}
