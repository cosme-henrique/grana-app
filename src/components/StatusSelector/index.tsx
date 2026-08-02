import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import type { TransactionStatus } from "@/models/Transaction";
import { colors, fontFamily, radius, typography } from "@/theme";

type StatusOption = {
	label: string;
	value: TransactionStatus;
};

const options: StatusOption[] = [
	{ label: "Pendente", value: "pending" },
	{ label: "Pago", value: "paid" },
	{ label: "Atrasado", value: "overdue" },
];

const statusKey: Record<TransactionStatus, keyof typeof colors.status> = {
	pending: "pendente",
	paid: "pago",
	overdue: "atrasado",
};

type StatusSelectorProps = {
	value: TransactionStatus;
	onChange: (value: TransactionStatus) => void;
};

export function StatusSelector({ value, onChange }: StatusSelectorProps) {
	return (
		<View style={styles.container}>
			{options.map((option) => {
				const isSelected = option.value === value;
				const statusColors = colors.status[statusKey[option.value]];

				return (
					<TouchableOpacity
						key={option.value}
						activeOpacity={0.8}
						onPress={() => onChange(option.value)}
						style={[
							styles.chip,
							isSelected && {
								backgroundColor: statusColors.bg,
								borderColor: statusColors.fg,
							},
						]}
					>
						<Text
							style={[styles.label, isSelected && { color: statusColors.fg }]}
						>
							{option.label}
						</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		gap: 8,
	},
	chip: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 10,
		borderRadius: radius.md,
		borderWidth: 1.5,
		borderColor: colors.neutral.border,
		backgroundColor: colors.neutral.bgCard,
	},
	label: {
		...typography.labelLg,
		fontFamily: fontFamily.bold,
		color: colors.neutral.textStrong,
	},
});
