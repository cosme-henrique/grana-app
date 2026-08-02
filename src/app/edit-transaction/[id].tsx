import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import { BackHeader } from "@/components/BackHeader";
import { Container } from "@/components/Container";
import { Divider } from "@/components/Divider";
import { ExpenseForm } from "@/components/ExpenseForm";
import { IncomeForm } from "@/components/IncomeForm";
import { Loading } from "@/components/Loading";
import type { Transaction } from "@/models/Transaction";
import { transactionRepository } from "@/repositories";
import type { ExpenseFormData } from "@/schemas/expenseSchema";
import type { IncomeFormData } from "@/schemas/incomeSchema";
import { formatBRDate } from "@/utils/format";
import { parseBRDate } from "@/utils/mask";

export default function EditTransactionPage() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const [transaction, setTransaction] = useState<Transaction | null>(null);

	useEffect(() => {
		transactionRepository.findById(id).then(setTransaction);
	}, [id]);

	async function handleSave(data: ExpenseFormData | IncomeFormData) {
		if (!transaction) {
			return;
		}

		await transactionRepository.update({
			...transaction,
			name: data.name,
			amount: data.amount,
			dueDate: parseBRDate(data.dueDate) ?? transaction.dueDate,
			status: data.status,
		});
		router.back();
	}

	if (!transaction) {
		return (
			<Container>
				<BackHeader title="Editar conta" />
				<Loading />
			</Container>
		);
	}

	const defaultValues = {
		name: transaction.name,
		amount: transaction.amount,
		dueDate: formatBRDate(transaction.dueDate),
		status: transaction.status,
	};

	return (
		<Container>
			<BackHeader title="Editar conta" />
			<Divider />
			{transaction.type === "expense" ? (
				<ExpenseForm onSubmit={handleSave} defaultValues={defaultValues} />
			) : (
				<IncomeForm onSubmit={handleSave} defaultValues={defaultValues} />
			)}
		</Container>
	);
}
