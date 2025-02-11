import { IsNotEmpty, IsNumber } from 'class-validator';

export interface JobMetadata {
  uuid?: string;
  name: string;
  description: string;
}

export class FibonacciData {
  @IsNumber()
  @IsNotEmpty()
  iterations: number;
}
