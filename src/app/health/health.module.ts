import { Module } from "@nestjs/common";

import { HealthController } from "./api/health.controller";
import { LoggerModule } from "@/contexts/shared/logger/logger.module";

@Module({
  controllers: [HealthController],
  imports: [LoggerModule],
})
export class HealthModule {}
