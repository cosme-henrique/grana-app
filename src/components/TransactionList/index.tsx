import { SectionList, StyleSheet, Text, View } from "react-native";

import { Empty } from "@/components/Empty";
import { TransactionCard } from "@/components/TransactionCard";
import type { Transaction } from "@/models/Transaction";
import { colors, typography } from "@/theme";

const statusOrder: Transaction["status"][] = ["overdue", "pending", "paid"];

const statusLabel: Record<Transaction["status"], string> = {
	pending: "Pendente",
	overdue: "Atrasado",
	paid: "Pago",
};

const statusColor: Record<Transaction["status"], string> = {
	pending: colors.status.pendente.fg,
	overdue: colors.status.atrasado.fg,
	paid: colors.status.pago.fg,
};

type TransactionListProps = {
	transactions: Transaction[];
	onSelectTransaction?: (transaction: Transaction) => void;
	onMarkAsPaid?: (transaction: Transaction) => void;
};

export function TransactionList({
	transactions,
	onSelectTransaction,
	onMarkAsPaid,
}: TransactionListProps) {
	const sections = statusOrder
		.map((status) => ({
			status,
			title: statusLabel[status],
			data: transactions.filter((transaction) => transaction.status === status),
		}))
		.filter((section) => section.data.length > 0);

	if (sections.length === 0) {
		return (
			<View style={styles.list}>
				<Empty />
			</View>
		);
	}

	return (
		<SectionList
			style={styles.list}
			sections={sections}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<TransactionCard
					transaction={item}
					onPress={() => {
						if (item.status === "paid") {
							onSelectTransaction?.(item);
						} else {
							onMarkAsPaid?.(item);
						}
					}}
					onLongPress={() => onSelectTransaction?.(item)}
				/>
			)}
			renderSectionHeader={({ section }) => (
				<View style={styles.sectionHeader}>
					<View
						style={[
							styles.dot,
							{ backgroundColor: statusColor[section.status] },
						]}
					/>
					<Text style={styles.sectionTitle}>{section.title.toUpperCase()}</Text>
					<Text style={styles.sectionCount}>({section.data.length})</Text>
				</View>
			)}
			contentContainerStyle={styles.content}
			ItemSeparatorComponent={() => <View style={styles.separator} />}
			stickySectionHeadersEnabled={false}
		/>
	);
}

const styles = StyleSheet.create({
	list: {
		flex: 1,
	},
	content: {
		paddingBottom: 24,
	},
	sectionHeader: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		marginTop: 16,
		marginBottom: 8,
	},
	dot: {
		width: 6,
		height: 6,
		borderRadius: 3,
	},
	sectionTitle: {
		...typography.micro,
		color: colors.neutral.textStrong,
	},
	sectionCount: {
		...typography.micro,
		color: colors.neutral.textMuted,
	},
	separator: {
		height: 12,
	},
});
