import { and, eq, like, lt } from "drizzle-orm";
import { randomUUID } from "expo-crypto";

import { db } from "@/database/client";
import { transactionsTable } from "@/database/schema";
import type { Transaction } from "@/models/Transaction";
import type { TransactionRepository } from "@/repositories/TransactionRepository";
import { getTodayISODate } from "@/utils/format";

function toTransaction(
	row: typeof transactionsTable.$inferSelect,
): Transaction {
	return row;
}

export class TransactionRepositorySQLite implements TransactionRepository {
	async findById(id: string): Promise<Transaction | null> {
		const [row] = await db
			.select()
			.from(transactionsTable)
			.where(eq(transactionsTable.id, id));

		return row ? toTransaction(row) : null;
	}

	async findByMonth(month: number, year: number): Promise<Transaction[]> {
		const monthPrefix = `${year}-${String(month).padStart(2, "0")}`;
		const rows = await db
			.select()
			.from(transactionsTable)
			.where(like(transactionsTable.dueDate, `${monthPrefix}%`));

		return rows.map(toTransaction);
	}

	async create(transaction: Omit<Transaction, "id">): Promise<Transaction> {
		const [row] = await db
			.insert(transactionsTable)
			.values({ ...transaction, id: randomUUID() })
			.returning();

		return toTransaction(row);
	}

	async update(transaction: Transaction): Promise<void> {
		await db
			.update(transactionsTable)
			.set(transaction)
			.where(eq(transactionsTable.id, transaction.id));
	}

	async delete(id: string): Promise<void> {
		await db.delete(transactionsTable).where(eq(transactionsTable.id, id));
	}

	async updateOverdueTransactions(): Promise<void> {
		await db
			.update(transactionsTable)
			.set({ status: "overdue" })
			.where(
				and(
					eq(transactionsTable.status, "pending"),
					lt(transactionsTable.dueDate, getTodayISODate()),
				),
			);
	}
}
