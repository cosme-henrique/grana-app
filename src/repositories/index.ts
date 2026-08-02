import { TransactionRepositorySQLite } from "@/repositories/sqlite/TransactionRepositorySQLite";
import type { TransactionRepository } from "@/repositories/TransactionRepository";

export const transactionRepository: TransactionRepository =
	new TransactionRepositorySQLite();
