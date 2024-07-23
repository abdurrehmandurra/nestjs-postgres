import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { Request, Response } from 'express';
import { CallResponseDto, CallsResponseDto } from './dto/twilio.dto';

@Controller('twilio')
export class TwilioController {
  constructor(private readonly twilioService: TwilioService) {}

  @Post('inbound-call')
  async create(@Req() req: Request, @Res() res: Response): Promise<void> {
    console.log('Insert Calls');
    // {
    //   Called: '+19123337858',
    //   ToState: 'GA',
    //   CallerCountry: 'PK',
    //   Direction: 'inbound',
    //   CallerState: '',
    //   ToZip: '',
    //   CallSid: 'CAb5c3d98965a37328796d336e002f1946',
    //   To: '+19123337858',
    //   CallerZip: '',
    //   ToCountry: 'US',
    //   StirVerstat: 'TN-Validation-Passed-A',
    //   CallToken: '%7B%22parentCallInfoToken%22%3A%22eyJhbGciOiJFUzI1NiJ9.eyJjYWxsU2lkIjoiQ0FiNWMzZDk4OTY1YTM3MzI4Nzk2ZDMzNmUwMDJmMTk0NiIsImZyb20iOiIrOTIzMTIwNDgwO
    // Tg2IiwidG8iOiIrMTkxMjMzMzc4NTgiLCJpYXQiOiIxNzIxNzYwMzQ3In0.oxCrK0wAt1QCUa1TqDzWROl1eXTGiAYKfxJ6bBTVQm1qFwQJf75SHp9LH3hQRCFNn4mKdm60fKJnhS6PjewmpQ%22%2C%22iden
    // tityHeaderTokens%22%3A%5B%5D%7D',
    //   CalledZip: '',
    //   ApiVersion: '2010-04-01',
    //   CalledCity: '',
    //   CallStatus: 'ringing',
    //   From: '+923120480986',
    //   AccountSid: 'ACe8bee81540c42f55b61418d59f3cacc8',
    //   CalledCountry: 'US',
    //   CallerCity: '',
    //   ToCity: '',
    //   FromCountry: 'PK',
    //   Caller: '+923120480986',
    //   FromCity: '',
    //   CalledState: 'GA',
    //   FromZip: '',
    //   FromState: ''
    // }
    console.log(req.body);
    const result = await this.twilioService.insertCalls(req.body);
    res.send(result);
  }

  @Post('handle-key')
  input(@Req() req: Request, @Res() res: Response) {
    console.log('Handle Input');
    // {
    // msg: 'Gather End',
    // Called: '+19123337858',
    // Digits: '2',
    // ToState: 'GA',
    // CallerCountry: 'PK',
    // Direction: 'inbound',
    // CallerState: '',
    // ToZip: '',
    // CallSid: 'CAb5c3d98965a37328796d336e002f1946',
    // To: '+19123337858',
    // CallerZip: '',
    // ToCountry: 'US',
    // FinishedOnKey: '',
    // CalledZip: '',
    // ApiVersion: '2010-04-01',
    // CalledCity: '',
    // CallStatus: 'in-progress',
    // From: '+923120480986',
    // AccountSid: 'ACe8bee81540c42f55b61418d59f3cacc8',
    // CalledCountry: 'US',
    // CallerCity: '',
    // ToCity: '',
    // FromCountry: 'PK',
    // Caller: '+923120480986',
    // FromCity: '',
    // CalledState: 'GA',
    // FromZip: '',
    console.log(req.body);
    const result = this.twilioService.handleInput(req.body);
    res.send(result);
  }

  @Post('recording')
  async record(@Req() req: Request): Promise<CallResponseDto> {
    console.log('Handle Recording');
    // {
    //   Called: '+19123337858',
    //   Digits: 'hangup',
    //   RecordingUrl: 'https://api.twilio.com/2010-04-01/Accounts/ACe8bee81540c42f55b61418d59f3cacc8/Recordings/RE268126656cc7be046568b7811c48cd2d',
    //   ToState: 'GA',
    //   CallerCountry: 'PK',
    //   Direction: 'inbound',
    //   CallerState: '',
    //   ToZip: '',
    //   CallSid: 'CAb5c3d98965a37328796d336e002f1946',
    //   To: '+19123337858',
    //   CallerZip: '',
    //   ToCountry: 'US',
    //   CalledZip: '',
    //   ApiVersion: '2010-04-01',
    //   CalledCity: '',
    //   CallStatus: 'completed',
    //   RecordingSid: 'RE268126656cc7be046568b7811c48cd2d',
    //   From: '+923120480986',
    //   AccountSid: 'ACe8bee81540c42f55b61418d59f3cacc8',
    //   CalledCountry: 'US',
    //   CallerCity: '',
    //   ToCity: '',
    //   FromCountry: 'PK',
    //   Caller: '+923120480986',
    //   FromCity: '',
    //   CalledState: 'GA',
    //   FromZip: '',
    //   FromState: '',
    //   RecordingDuration: '13'
    // }
    console.log(req.body);
    return await this.twilioService.handleRecording(req.body);
  }

  @Get('listing')
  async listing(): Promise<CallsResponseDto> {
    return await this.twilioService.get();
  }
}
