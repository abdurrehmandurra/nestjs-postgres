import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { Request, Response } from 'express';
import { CallResponseDto, CallsResponseDto } from './dto/twilio.dto';

@Controller('twilio')
export class TwilioController {
  constructor(private readonly twilioService: TwilioService) {}

  @Post('inbound-call')
  async create(@Req() req: Request, @Res() res: Response): Promise<void> {
    console.log('<==== INSERT CALL ====>');
    const result = await this.twilioService.insertCalls(req.body);
    res.send(result);
  }

  @Post('handle-key')
  input(@Req() req: Request, @Res() res: Response) {
    console.log('<==== HANDLE INPUT KEY ====>');
    const result = this.twilioService.handleInput(req.body);
    res.send(result);
  }

  @Post('recording')
  async record(@Req() req: Request): Promise<CallResponseDto> {
    console.log('<==== HANDLE RECORDING ====>');
    return await this.twilioService.handleRecording(req.body);
  }

  @Get('listing')
  async listing(): Promise<CallsResponseDto> {
    console.log('<==== LISTING ====>');
    return await this.twilioService.get();
  }
}
