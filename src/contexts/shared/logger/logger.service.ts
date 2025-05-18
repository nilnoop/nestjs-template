/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, LoggerService } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Logger } from "winston";

import { createWinstonLogger } from "./logger.config";

@Injectable()
export class WinstonLoggerService implements LoggerService {
  private logger: Logger;
  private context?: string;

  constructor(private configService: ConfigService) {
    this.logger = createWinstonLogger(configService);
  }

  setContext(context: string) {
    this.context = context;
  }

  log(message: string, context?: string, ...meta: any[]) {
    this.logger.info(message, { context: context ?? this.context, ...meta });
  }

  error(message: string, trace?: string, context?: string, ...meta: any[]) {
    this.logger.error(message, {
      context: context ?? this.context,
      trace,
      ...meta,
    });
  }

  warn(message: string, context?: string, ...meta: any[]) {
    this.logger.warn(message, { context: context ?? this.context, ...meta });
  }

  debug(message: string, context?: string, ...meta: any[]) {
    this.logger.debug(message, { context: context ?? this.context, ...meta });
  }

  verbose(message: string, context?: string, ...meta: any[]) {
    this.logger.verbose(message, { context: context ?? this.context, ...meta });
  }
}
