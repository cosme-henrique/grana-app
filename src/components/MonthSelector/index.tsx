import { Ionicons } from "@expo/vector-icons";
import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors, radius, typography } from "@/theme";
import { formatMonthYear } from "@/utils/format";

type MonthSelectorProps = {
	date: Date;
	onChange: (date: Date) => void;
	style?: StyleProp<ViewStyle>;
};

function addMonths(date: Date, amount: number): Date {
	return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

export function MonthSelector({ date, onChange, style }: MonthSelectorProps) {
	return (
		<View style={[styles.container, style]}>
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={() => onChange(addMonths(date, -1))}
			>
				<Ionicons
					name="chevron-back"
					size={18}
					color={colors.neutral.textStrong}
				/>
			</TouchableOpacity>
			<Text style={styles.label}>{formatMonthYear(date)}</Text>
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={() => onChange(addMonths(date, 1))}
			>
				<Ionicons
					name="chevron-forward"
					size={18}
					color={colors.neutral.textStrong}
				/>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: colors.neutral.bgCard,
		borderRadius: radius.md,
		borderWidth: 1,
		borderColor: colors.neutral.border,
		paddingVertical: 16,
		paddingHorizontal: 20,
	},
	label: {
		...typography.labelLg,
		color: colors.neutral.textStrong,
	},
});
