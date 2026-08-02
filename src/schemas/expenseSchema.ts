import { z } from "zod";

export const expenseSchema = z.object({
	name: z.string().min(1, "Informe o nome da conta"),
	amount: z.number().positive("Informe um valor maior que zero"),
	dueDate: z.string().min(1, "Informe a data de vencimento"),
	status: z.enum(["pending", "paid", "overdue"]),
});

export type ExpenseFormData = z.infer<typeof expenseSchema>;
