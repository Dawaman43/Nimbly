import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { BillingService } from './billing.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { BillingSummary } from '@nimbly/shared-types';

@Controller('billing')
export class BillingController {
    constructor(private readonly billingService: BillingService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getSummary(@Request() req): Promise<BillingSummary> {
        const userId = req.user.userId;
        return this.billingService.getSummary(userId);
    }
}
