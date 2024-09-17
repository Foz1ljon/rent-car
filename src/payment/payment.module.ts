import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentService } from './payment.service';
import { BronModule } from 'src/bron/bron.module';
import { Payment } from './entities/payment.entity';
import { Bron } from 'src/bron/entities/bron.entity';
import { PaymentController } from './payment.controller';
import { User } from 'src/users/entities/user.entity';
// UserModule ni import qilish

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Bron, User])], // UserModule ni imports qismida
  providers: [PaymentService],
  controllers: [PaymentController],
  exports: [PaymentService],
})
export class PaymentModule {}
