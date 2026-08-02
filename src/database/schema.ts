import { sqliteTable, text, real } from "drizzle-orm/sqlite-core";

export const transactionsTable = sqliteTable("transactions", {
	id: text().primaryKey(),
	name: text().notNull(),
	amount: real().notNull(),
	type: text({ enum: ["expense", "income"] }).notNull(),
	dueDate: text().notNull(),
	status: text({ enum: ["pending", "paid", "overdue"] }).notNull(),
});
