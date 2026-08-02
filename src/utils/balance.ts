import type { Transaction } from "@/models/Transaction";

export function calculateBalance(transactions: Transaction[]) {
	const income = transactions
		.filter((transaction) => transaction.type === "income")
		.reduce((sum, transaction) => sum + transaction.amount, 0);

	const expense = transactions
		.filter((transaction) => transaction.type === "expense")
		.reduce((sum, transaction) => sum + transaction.amount, 0);

	return {
		balance: income - expense,
		income,
		expense,
	};
}
