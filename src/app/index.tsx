import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, Text } from "react-native";

import { BalanceCard } from "@/components/BalanceCard";
import { Container } from "@/components/Container";
import { FloatingButton } from "@/components/FloatingButton";
import { Logo } from "@/components/Logo";
import { Modal } from "@/components/Modal";
import { MonthSelector } from "@/components/MonthSelector";
import { TransactionActions } from "@/components/TransactionActions";
import { TransactionList } from "@/components/TransactionList";
import type { Transaction } from "@/models/Transaction";
import { transactionRepository } from "@/repositories";
import { colors, typography } from "@/theme";
import { calculateBalance } from "@/utils/balance";

export default function HomePage() {
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

	return (
		<Container>
			<Logo variant="header" />
			<Text style={styles.title}>Visão geral</Text>
			<MonthSelector date={date} onChange={setDate} />
			<BalanceCard {...calculateBalance(transactions)} />
			<TransactionList
				transactions={transactions}
				onSelectTransaction={setSelectedTransaction}
				onMarkAsPaid={handleMarkAsPaid}
			/>
			{selectedTransaction === null ? (
				<FloatingButton
					onPress={() => router.push("/new-transaction")}
					style={styles.floatingButton}
				/>
			) : null}
			<Modal
				visible={selectedTransaction !== null}
				onClose={() => setSelectedTransaction(null)}
			>
				{selectedTransaction ? (
					<TransactionActions
						transaction={selectedTransaction}
						onEdit={() => {
							router.push(`/edit-transaction/${selectedTransaction.id}`);
							setSelectedTransaction(null);
						}}
						onDelete={handleDelete}
					/>
				) : null}
			</Modal>
		</Container>
	);
}

const styles = StyleSheet.create({
	title: {
		...typography.heading,
		color: colors.neutral.textStrong,
	},
	floatingButton: {
		position: "absolute",
		right: 16,
		bottom: 24,
	},
});
