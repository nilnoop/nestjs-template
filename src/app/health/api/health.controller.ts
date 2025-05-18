import { Controller, Get, HttpCode, Inject, Injectable,  } from "@nestjs/common";
import { WinstonLoggerService } from "@/contexts/shared/logger/logger.service";

@Controller("health")
@Injectable()
export class HealthController {
  constructor(private readonly logger: WinstonLoggerService) {}

  @Get()
  @HttpCode(200)
  run() {
    this.logger.log("Health endpoint called!");
    return { status: "ok" };
  }
}
