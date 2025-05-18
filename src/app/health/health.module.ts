import { Module } from "@nestjs/common";

import { LoggerModule } from "@/contexts/shared/logger/logger.module";

import { HealthController } from "./api/health.controller";

@Module({
  controllers: [HealthController],
  imports: [LoggerModule],
})
export class HealthModule {}
