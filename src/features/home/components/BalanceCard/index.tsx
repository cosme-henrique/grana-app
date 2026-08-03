import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, Text, View } from "react-native";

import { colors, fontFamily, radius, size } from "@/theme";
import { formatCurrency } from "@/utils/format";

type BalanceCardProps = {
	balance: number;
	income: number;
	expense: number;
	style?: StyleProp<ViewStyle>;
};

export function BalanceCard({
	balance,
	income,
	expense,
	style,
}: BalanceCardProps) {
	return (
		<View style={[styles.card, style]}>
			<Text style={styles.label}>Saldo do mês</Text>
			<Text style={styles.balance}>{formatCurrency(balance)}</Text>
			<View style={styles.row}>
				<View style={styles.pill}>
					<Text style={styles.pillLabel}>RECEITA</Text>
					<Text style={styles.pillValue}>{formatCurrency(income)}</Text>
				</View>
				<View style={styles.pill}>
					<Text style={styles.pillLabel}>DESPESA</Text>
					<Text style={styles.pillValue}>{formatCurrency(expense)}</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: colors.brand.indigoDark,
		borderRadius: radius.md,
		padding: 20,
	},
	label: {
		...size.sm,
		fontFamily: fontFamily.regular,
		color: colors.white,
		opacity: 0.6,
	},
	balance: {
		...size.xl,
		fontFamily: fontFamily.extraBold,
		color: colors.white,
		marginTop: 4,
	},
	row: {
		flexDirection: "row",
		gap: 12,
		marginTop: 20,
	},
	pill: {
		flex: 1,
		backgroundColor: colors.brand.indigo,
		borderRadius: radius.sm,
		padding: 12,
	},
	pillLabel: {
		...size.sm,
		fontFamily: fontFamily.bold,
		color: colors.white,
		opacity: 0.6,
	},
	pillValue: {
		...size.md,
		fontFamily: fontFamily.semiBold,
		color: colors.white,
		marginTop: 4,
	},
});
