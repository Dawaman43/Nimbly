import { Injectable } from '@nestjs/common';
import type { BillingSummary } from '@nimbly/shared-types';

@Injectable()
export class BillingService {
    getSummary(): BillingSummary {
        return {
            currentSpend: 1245.50,
            projectedSpend: 1500.00,
            budget: 2000.00,
            invoices: [
                { id: 'inv_001', date: '2025-10-01', amount: 450.00, status: 'Paid' },
                { id: 'inv_002', date: '2025-11-01', amount: 450.00, status: 'Paid' },
                { id: 'inv_003', date: '2025-12-01', amount: 345.50, status: 'Pending' },
            ],
            paymentMethods: [
                { id: 'pm_001', type: 'Visa', last4: '4242', expiry: '12/26' },
            ]
        };
    }
}
