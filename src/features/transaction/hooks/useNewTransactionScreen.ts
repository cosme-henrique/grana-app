import { router } from "expo-router";
import { useState } from "react";

import type { TransactionFormData } from "@/features/transaction/schemas/transactionSchema";
import type { TransactionType } from "@/models/Transaction";
import { transactionRepository } from "@/repositories";
import { parseBRDate } from "@/utils/mask";

export function useNewTransactionScreen() {
	const [type, setType] = useState<TransactionType>("expense");

	async function handleSave(data: TransactionFormData) {
		await transactionRepository.create({
			name: data.name,
			amount: data.amount,
			type,
			dueDate: parseBRDate(data.dueDate) ?? "",
			status: data.status,
		});
		router.back();
	}

	return {
		type,
		onChangeType: setType,
		onSave: handleSave,
	};
}
