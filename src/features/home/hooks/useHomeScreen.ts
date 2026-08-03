import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useState } from "react";

import type { Transaction } from "@/models/Transaction";
import { transactionRepository } from "@/repositories";
import { calculateBalance } from "@/utils/balance";

export function useHomeScreen() {
	const [date, setDate] = useState(new Date());
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [selectedTransaction, setSelectedTransaction] =
		useState<Transaction | null>(null);

	const fetchTransactions = useCallback(() => {
		transactionRepository.updateOverdueTransactions().then(() => {
			transactionRepository
				.findByMonth(date.getMonth() + 1, date.getFullYear())
				.then(setTransactions);
		});
	}, [date]);

	useFocusEffect(fetchTransactions);

	async function handleDelete() {
		if (!selectedTransaction) {
			return;
		}

		await transactionRepository.delete(selectedTransaction.id);
		setSelectedTransaction(null);
		fetchTransactions();
	}

	async function handleMarkAsPaid(transaction: Transaction) {
		await transactionRepository.update({ ...transaction, status: "paid" });
		fetchTransactions();
	}

	function goToNewTransaction() {
		router.push("/transaction/new");
	}

	function goToEditTransaction() {
		if (!selectedTransaction) {
			return;
		}

		router.push(`/transaction/${selectedTransaction.id}/edit`);
		setSelectedTransaction(null);
	}

	return {
		date,
		onChangeDate: setDate,
		balance: calculateBalance(transactions),
		transactions,
		selectedTransaction,
		onSelectTransaction: setSelectedTransaction,
		onCloseModal: () => setSelectedTransaction(null),
		onMarkAsPaid: handleMarkAsPaid,
		onDelete: handleDelete,
		onCreateNew: goToNewTransaction,
		onEdit: goToEditTransaction,
	};
}
