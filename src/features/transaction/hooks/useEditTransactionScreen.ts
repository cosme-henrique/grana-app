import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import type { TransactionFormData } from "@/features/transaction/schemas/transactionSchema";
import type { Transaction } from "@/models/Transaction";
import { transactionRepository } from "@/repositories";
import { formatBRDate } from "@/utils/format";
import { parseBRDate } from "@/utils/mask";

export function useEditTransactionScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const [transaction, setTransaction] = useState<Transaction | null>(null);

	useEffect(() => {
		transactionRepository.findById(id).then(setTransaction);
	}, [id]);

	async function handleSave(data: TransactionFormData) {
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

	const defaultValues = transaction
		? {
				name: transaction.name,
				amount: transaction.amount,
				dueDate: formatBRDate(transaction.dueDate),
				status: transaction.status,
			}
		: null;

	return {
		transaction,
		defaultValues,
		onSave: handleSave,
	};
}
