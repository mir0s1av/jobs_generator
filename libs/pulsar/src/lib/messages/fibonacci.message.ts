import { IsNumber, IsNotEmpty } from 'class-validator';
import { JobMessage } from './jobs.message';
export class FibonacciMessage extends JobMessage {
  @IsNumber()
  @IsNotEmpty()
  iterations: number;
}
