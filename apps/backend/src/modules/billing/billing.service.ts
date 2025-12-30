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
        // Seed if empty
        const count = await this.invoiceRepo.count();
        if (count === 0) {
            await this.invoiceRepo.save([
                { date: '2025-10-01', amount: 450.00, status: 'Paid' },
                { date: '2025-11-01', amount: 450.00, status: 'Paid' },
                { date: '2025-12-01', amount: 345.50, status: 'Pending' },
            ] as Invoice[]);
            console.log('Seeded invoices');
        }
    }

    async getSummary(): Promise<BillingSummary> {
        const invoices = await this.invoiceRepo.find({ order: { date: 'DESC' } });

        // Simple mock calculation for demo
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
