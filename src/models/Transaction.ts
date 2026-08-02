export type TransactionType = "expense" | "income";

export type TransactionStatus = "pending" | "paid" | "overdue";

export interface Transaction {
	id: string;
	name: string;
	amount: number;
	type: TransactionType;
	dueDate: string;
	status: TransactionStatus;
}
