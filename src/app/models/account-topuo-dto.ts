export interface AccountTopUpDto{
    userId: string;
    amount: number;
    transactionType: TransactionType;
}

export enum TransactionType {
    DEBIT,
    CREDIT
}