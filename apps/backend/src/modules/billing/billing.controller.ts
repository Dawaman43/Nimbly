import { Controller, Get, UseGuards } from '@nestjs/common';
import { BillingService } from './billing.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { BillingSummary } from '@nimbly/shared-types';

@Controller('billing')
export class BillingController {
    constructor(private readonly billingService: BillingService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getSummary(): Promise<BillingSummary> {
        return this.billingService.getSummary();
    }
}
