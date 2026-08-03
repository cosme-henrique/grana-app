import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Badge } from "@/components/Badge";
import type { Transaction } from "@/models/Transaction";
import { colors, fontFamily, radius, size } from "@/theme";
import { formatCurrency, formatShortDate } from "@/utils/format";

const statusMap = {
	pending: { variant: "pendente", label: "Pendente" },
	paid: { variant: "pago", label: "Pago" },
	overdue: { variant: "atrasado", label: "Atrasado" },
} as const;

type TransactionCardProps = {
	transaction: Transaction;
	onPress?: () => void;
	onLongPress?: () => void;
};

export function TransactionCard({
	transaction,
	onPress,
	onLongPress,
}: TransactionCardProps) {
	const status = statusMap[transaction.status];
	const isIncome = transaction.type === "income";
	const amountColor = isIncome
		? colors.status.receita.fg
		: colors.neutral.textStrong;

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={onPress}
			onLongPress={onLongPress}
			style={styles.container}
		>
			<View style={styles.avatar}>
				<Text style={styles.avatarLabel}>
					{transaction.name.charAt(0).toUpperCase()}
				</Text>
			</View>
			<View style={styles.info}>
				<Text style={styles.name}>{transaction.name}</Text>
				<Text style={styles.dueDate}>
					{isIncome ? "Recebe" : "Vence"} {formatShortDate(transaction.dueDate)}
				</Text>
			</View>
			<View style={styles.right}>
				<Text style={[styles.amount, { color: amountColor }]}>
					{isIncome ? "+ " : ""}
					{formatCurrency(transaction.amount)}
				</Text>
				<Badge
					label={status.label}
					variant={status.variant}
					style={styles.badge}
				/>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.neutral.bgCard,
		borderRadius: radius.md,
		borderWidth: 1,
		borderColor: colors.neutral.border,
		paddingVertical: 10,
		paddingHorizontal: 16,
		gap: 12,
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: radius.sm,
		backgroundColor: colors.neutral.border,
		alignItems: "center",
		justifyContent: "center",
	},
	avatarLabel: {
		...size.md,
		fontFamily: fontFamily.bold,
		color: colors.neutral.textStrong,
	},
	info: {
		flex: 1,
		gap: 2,
	},
	name: {
		...size.md,
		fontFamily: fontFamily.extraBold,
		color: colors.neutral.textStrong,
	},
	dueDate: {
		...size.sm,
		fontFamily: fontFamily.bold,
		color: colors.neutral.textMuted,
	},
	right: {
		alignItems: "flex-end",
		gap: 6,
	},
	amount: {
		...size.md,
		fontFamily: fontFamily.bold,
	},
	badge: {
		alignSelf: "flex-end",
	},
});
