// src/payment/dto/create-payment.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import {
  IsDecimal,
  IsOptional,
  IsString,
  IsBoolean,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePaymentDto {
  @ApiProperty({ example: 'credit_card', description: 'Method of payment' })
  @IsString()
  paymentMethod: string;

  @ApiProperty({ example: 100.0, description: 'Payment amount' })
  @IsDecimal()
  amount: number;

  @ApiProperty({ example: 'USD', description: 'Currency used for the payment' })
  @IsString()
  currency: string;

  @ApiProperty({
    example: 'txn_1234567890',
    description: 'Transaction ID',
    required: false,
  })
  @IsOptional()
  @IsString()
  transactionId?: string;

  @ApiProperty({
    example: new Date(),
    description: 'Date when the payment was made',
  })
  @IsOptional()
  @Type(() => Date)
  paymentDate: Date;

  @ApiProperty({
    example: 1,
    description: 'User ID associated with the payment',
  })
  userId: number;

  @ApiProperty({
    example: 1,
    description: 'Bron ID associated with the payment',
  })
  bronId: number;

  @ApiProperty({ example: true, description: 'Payment success status' })
  @IsBoolean()
  isSuccessful: boolean;

  @ApiProperty({
    example: 'stripe',
    description: 'Payment gateway used',
    required: false,
  })
  @IsOptional()
  @IsString()
  paymentGateway?: string;
}
