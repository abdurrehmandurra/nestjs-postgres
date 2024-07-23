import { Module } from "@nestjs/common";
import { TwilioController } from "./twilio.controller";
import { TwilioService } from "./twilio.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Call } from "./entity/call.entity";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [TypeOrmModule.forFeature([Call]), ConfigModule],
  controllers: [TwilioController],
  providers: [TwilioService],
  exports: [TwilioService],
})

export class TwilioModule{}