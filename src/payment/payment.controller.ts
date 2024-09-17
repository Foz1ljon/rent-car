import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './entities/payment.entity';

@ApiTags('payments')
@ApiBearerAuth() // Add this if you're using Bearer token authentication
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The payment has been successfully created.',
    type: Payment,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Validation failed.',
  })
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    const { userId, bronId, ...paymentDto } = createPaymentDto;
    return this.paymentService.createPayment(userId, bronId);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns all payments.',
    type: [Payment],
  })
  async findAll(): Promise<Payment[]> {
    return this.paymentService.findAllPayments();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returns a payment by ID.',
    type: Payment,
  })
  @ApiResponse({
    status: 404,
    description: 'Payment not found.',
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Payment> {
    return this.paymentService.findPaymentById(id);
  }
}
