import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";
import { ConfigService } from '@nestjs/config';
import { asyncLocalStorage } from "@/utils/async-hook";


export const createWinstonLogger = (configService: ConfigService) => {
    const logLevel = configService.get<string>('LOG_LEVEL', 'info');
    const logDir = configService.get<string>('LOG_DIR', 'logs');

    return createLogger({
        format: format.combine(
          format.errors({ stack: true }),
          format.timestamp({
            format: "YYYY-MM-DDTHH:mm:ss.SSS+0800",
          }),
          format.printf(({ level, timestamp, message, context, ...rest }) => {
            const store = asyncLocalStorage.getStore();
            const traceId = store?.traceId || "-";
            const spanId = store?.spanId || "-";
      
            const extra = Object.entries(rest)
              .reduce((prev: string[], [key, value]) => {
                if (value instanceof Error) {
                  prev.push(`errname=${value.name}`);
                  prev.push(`error=${value.message}`);
                  prev.push(`errstack=${JSON.stringify(value.stack)}`);
                } else if (typeof value === 'object') {
                  prev.push(`${key}=${JSON.stringify(value)}`);
                } else if (typeof value === 'function') {
                  prev.push(`${key}=${value.toString()}`);
                } else if (typeof value === 'undefined') {
                  prev.push(`${key}=`);
                } else {
                  prev.push(`${key}=${value ?? ''}`);
                }
                return prev;
              }, [])
              .join("||");
      
            return `[${level.toUpperCase()}][${timestamp}]||traceId=${traceId}||spanId=${spanId}||msg=${message}${context? `||context=${context}` : ""}${extra ? `||${extra}` : ""}`;
          }),
        ),
      
        level: logLevel,
        transports: [
          process.env.SERVER_ENV === "local" 
            ? new transports.Console({
              level: logLevel,
              handleExceptions: true,
              handleRejections: true,
              
            }) 
            : null,
          new transports.DailyRotateFile({
            filename: `${logDir}/out-%DATE%.log`,
            datePattern: "YYYY-MM-DD",
            maxFiles: "14d",
            level: logLevel,
            handleExceptions: true,
            handleRejections: true,
          }),
        ].filter(t => !!t),
      });
}