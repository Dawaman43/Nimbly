export interface Invoice {
    id: string;
    date: string;
    amount: number;
    status: 'Paid' | 'Pending' | 'Overdue';
}

export interface PaymentMethod {
    id: string;
    type: string; // e.g., 'Visa', 'Mastercard'
    last4: string;
    expiry: string;
}

export interface BillingSummary {
    currentSpend: number;
    projectedSpend: number;
    budget: number;
    invoices: Invoice[];
    paymentMethods: PaymentMethod[];
}
