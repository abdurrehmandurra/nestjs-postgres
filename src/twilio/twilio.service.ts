import { Injectable } from '@nestjs/common';
import {
  CallResponseDto,
  CallsResponseDto,
  InboundCallDto,
} from './dto/twilio.dto';
import * as twilio from 'twilio';
import { InjectRepository } from '@nestjs/typeorm';
import { Call } from './entity/call.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

const VoiceResponse = twilio.twiml.VoiceResponse;

@Injectable()
export class TwilioService {
  constructor(
    @InjectRepository(Call)
    private callRepository: Repository<Call>,
    private configService: ConfigService,
  ) {}

  async insertCalls(body: InboundCallDto): Promise<CallResponseDto> {
    try {
      const response = new VoiceResponse();
      await this.callRepository.insert({
        accountSid: body.AccountSid,
        called: body.Called,
        caller: body.Caller,
        callerCountry: body.CallerCountry,
        callSid: body.CallSid,
        direction: body.Direction,
        fromNumber: body.From,
        to: body.To,
        toCountry: body.ToCountry,
      });

      const gather = response.gather({
        numDigits: 1,
        action: '/api/twilio/handle-key',
        method: 'POST',
      });

      gather.say('Press 1 to talk. Press 2 to leave a voicemail.');
      response.say("We didn't receive any input. Goodbye!");
      return response.toString();
    } catch (error) {
      console.error(error);
      return { data: null, message: error.message ?? error, status: false };
    }
  }

  handleInput(body: any) {
    try {
      const digit = body.Digits;
      const response = new VoiceResponse();

      if (digit === '1') {
        response.dial(this.configService.get<string>('COMPANY_NUMBER'));
      } else if (digit === '2') {
        response.say('Please leave your message');
        response.record({
          action: '/api/twilio/recording',
          method: 'POST',
        });
        response.say('We did not receive a recording. Goodbye.');
      } else {
        response.redirect('/api/twilio/inbound-call');
      }

      return response.toString();
    } catch (error) {
      console.error(error);
      return { data: null, message: error.message ?? error, status: false };
    }
  }

  async handleRecording(body: InboundCallDto): Promise<CallResponseDto> {
    try {
      const call = await this.callRepository.existsBy({
        callSid: body.CallSid,
      });
      const recordingUrl = body.RecordingUrl;
      if (call) {
        this.callRepository.update(
          { callSid: body.CallSid },
          { recordingUrl: recordingUrl },
        );
      }

      const response = new VoiceResponse();
      response.say('Thank you for your message. Goodbye.');
      return {
        data: null,
        message: 'Recording save successfully',
        status: true,
      };
    } catch (error) {
      console.error(error);
      return { data: null, message: error.message ?? error, status: false };
    }
  }

  async get(): Promise<CallsResponseDto> {
    try {
      const calls = await this.callRepository.find({
        order: { updatedAt: 'DESC' },
      });
      return {
        data: calls,
        message: null,
        status: true,
      };
    } catch (error) {
      console.error(error);
      return { data: null, message: error.message ?? error, status: false };
    }
  }
}
