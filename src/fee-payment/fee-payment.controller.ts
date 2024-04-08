import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { FeePaymentService } from './fee-payment.service';
import { FeePaymentDto } from './FeePayment.dto';

@Controller('fee-payments')
export class FeePaymentController {
    constructor(private readonly feePaymentService: FeePaymentService) {}

    @Post()
    async createFeePayment(@Body() dto: FeePaymentDto) {
        return this.feePaymentService.createFeePayment(dto);
    }

    @Get()
    async getAllFeePayments() {
        return this.feePaymentService.getAllFeePayments();
    }

    @Get(':id')
    async getFeePaymentById(@Param('id', ParseIntPipe) id: number) {
        return this.feePaymentService.getFeePaymentById(id);
    }

    @Put(':id')
    async updateFeePayment(@Param('id', ParseIntPipe) id: number, @Body() dto: FeePaymentDto) {
        return this.feePaymentService.updateFeePayment(id, dto);
    }

    @Delete(':id')
    async deleteFeePayment(@Param('id', ParseIntPipe) id: number) {
        return this.feePaymentService.deleteFeePayment(id);
    }
}
