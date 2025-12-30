import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { BillingSummary } from '@nimbly/shared-types';
import { Invoice } from './invoice.entity';

@Injectable()
export class BillingService implements OnModuleInit {
    constructor(
        @InjectRepository(Invoice)
        private invoiceRepo: Repository<Invoice>,
    ) { }

    async onModuleInit() {
        // Don't seed invoices - they should be user-specific
        // New users will start with empty billing data
    }

    async getSummary(userId: string): Promise<BillingSummary> {
        const invoices = await this.invoiceRepo.find({ 
            where: { userId },
            order: { date: 'DESC' } 
        });

        // Calculate from user's invoices
        const currentSpend = invoices.reduce((acc, inv) => acc + Number(inv.amount), 0);

        return {
            currentSpend: currentSpend,
            projectedSpend: currentSpend * 1.2,
            budget: 2000.00,
            invoices: invoices.map(inv => ({
                id: inv.id,
                date: inv.date,
                amount: Number(inv.amount),
                status: inv.status as 'Paid' | 'Pending' | 'Overdue',
            })),
            paymentMethods: [
                { id: 'pm_001', type: 'Visa', last4: '4242', expiry: '12/26' },
            ]
        };
    }
}
