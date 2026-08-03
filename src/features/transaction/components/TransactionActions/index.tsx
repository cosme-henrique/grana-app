import { StyleSheet, Text, View } from "react-native";

import { Button } from "@/components/Button";
import type { Transaction } from "@/models/Transaction";
import { colors, fontFamily, size } from "@/theme";
import { formatCurrency, formatShortDate } from "@/utils/format";

type TransactionActionsProps = {
	transaction: Transaction;
	onEdit: () => void;
	onDelete: () => void;
};

export function TransactionActions({
	transaction,
	onEdit,
	onDelete,
}: TransactionActionsProps) {
	const isIncome = transaction.type === "income";

	return (
		<View>
			<Text style={styles.title}>{transaction.name}</Text>
			<Text style={styles.subtitle}>
				{formatCurrency(transaction.amount)} · {isIncome ? "recebe" : "vence"}{" "}
				{formatShortDate(transaction.dueDate)}
			</Text>

			<Button
				title="Editar conta"
				variant="secondary"
				onPress={onEdit}
				style={styles.button}
			/>
			<Button
				title="Excluir conta"
				variant="danger"
				onPress={onDelete}
				style={styles.button}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		...size.lg,
		fontFamily: fontFamily.extraBold,
		color: colors.neutral.textStrong,
	},
	subtitle: {
		...size.md,
		fontFamily: fontFamily.bold,
		color: colors.neutral.textMuted,
		marginTop: 4,
	},
	button: {
		marginTop: 16,
	},
});
