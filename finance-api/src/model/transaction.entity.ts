import { TransactionType } from './enum/transaction-type.enum';

export class Transaction {
  id: string;
  userId: string;
  name: string;
  date: Date;
  amount: number;
  type: TransactionType;

  createdAt: Date;
  updatedAt: Date;
}
