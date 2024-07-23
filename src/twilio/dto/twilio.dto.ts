import { Call } from '../entity/call.entity';

export class InboundCallDto {
  Called: string;
  ToState: string;
  CallerCountry: string;
  Direction: string;
  CallerState: string;
  ToZip: string;
  CallSid: string;
  To: string;
  CallerZip: string;
  ToCountry: string;
  StirVerstat: string;
  CallToken: string;
  CalledZip: string;
  ApiVersion: string;
  CalledCity: string;
  CallStatus: string;
  From: string;
  AccountSid: string;
  CalledCountry: string;
  CallerCity: string;
  ToCity: string;
  FromCountry: string;
  Caller: string;
  FromCity: string;
  CalledState: string;
  FromZip: string;
  FromState: string;
  RecordingUrl?: string
}

export class CallResponseDto {
  data: Call | null;
  message: string | null;
  status: boolean;
}

export class CallsResponseDto {
  data: Call[] | null;
  message: string | null;
  status: boolean;
}
