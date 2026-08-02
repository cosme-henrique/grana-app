import type { Transaction } from "@/models/Transaction";

export interface TransactionRepository {
	findById(id: string): Promise<Transaction | null>;
	findByMonth(month: number, year: number): Promise<Transaction[]>;
	updateOverdueTransactions(): Promise<void>;
	create(transaction: Omit<Transaction, "id">): Promise<Transaction>;
	update(transaction: Transaction): Promise<void>;
	delete(id: string): Promise<void>;
}
