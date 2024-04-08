import { Module } from '@nestjs/common';
import { FeePaymentService } from './fee-payment.service';
import { FeePaymentController } from './fee-payment.controller';

@Module({
  providers: [FeePaymentService],
  controllers: [FeePaymentController]
})
export class FeePaymentModule {}
