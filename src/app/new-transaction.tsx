import { router } from "expo-router";
import { useState } from "react";

import { BackHeader } from "@/components/BackHeader";
import { Container } from "@/components/Container";
import { Divider } from "@/components/Divider";
import { ExpenseForm } from "@/components/ExpenseForm";
import { IncomeForm } from "@/components/IncomeForm";
import { Tabs } from "@/components/Tabs";
import type { TransactionType } from "@/models/Transaction";
import { transactionRepository } from "@/repositories";
import type { ExpenseFormData } from "@/schemas/expenseSchema";
import type { IncomeFormData } from "@/schemas/incomeSchema";
import { parseBRDate } from "@/utils/mask";

export default function NewTransactionPage() {
	const [type, setType] = useState<TransactionType>("expense");

	async function handleSaveExpense(data: ExpenseFormData) {
		await transactionRepository.create({
			name: data.name,
			amount: data.amount,
			type: "expense",
			dueDate: parseBRDate(data.dueDate) ?? "",
			status: data.status,
		});
		router.back();
	}

	async function handleSaveIncome(data: IncomeFormData) {
		await transactionRepository.create({
			name: data.name,
			amount: data.amount,
			type: "income",
			dueDate: parseBRDate(data.dueDate) ?? "",
			status: data.status,
		});
		router.back();
	}

	return (
		<Container>
			<BackHeader title="Nova conta" />
			<Divider />
			<Tabs
				value={type}
				onChange={setType}
				options={[
					{ label: "Despesa (a pagar)", value: "expense" },
					{ label: "Receita (a receber)", value: "income" },
				]}
			/>
			{type === "expense" ? (
				<ExpenseForm onSubmit={handleSaveExpense} />
			) : (
				<IncomeForm onSubmit={handleSaveIncome} />
			)}
		</Container>
	);
}
