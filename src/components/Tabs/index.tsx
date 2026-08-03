import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors, fontFamily, radius, size } from "@/theme";

type TabOption<T extends string> = {
	label: string;
	value: T;
};

type TabsProps<T extends string> = {
	options: TabOption<T>[];
	value: T;
	onChange: (value: T) => void;
	style?: StyleProp<ViewStyle>;
};

export function Tabs<T extends string>({
	options,
	value,
	onChange,
	style,
}: TabsProps<T>) {
	return (
		<View style={[styles.container, style]}>
			{options.map((option) => {
				const isSelected = option.value === value;

				return (
					<TouchableOpacity
						key={option.value}
						activeOpacity={0.8}
						onPress={() => onChange(option.value)}
						style={[styles.tab, isSelected && styles.tabSelected]}
					>
						<Text style={[styles.label, isSelected && styles.labelSelected]}>
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
		backgroundColor: colors.neutral.border,
		borderRadius: radius.md,
		padding: 6,
	},
	tab: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		borderRadius: radius.sm,
	},
	tabSelected: {
		backgroundColor: colors.neutral.bgCard,
	},
	label: {
		...size.md,
		fontFamily: fontFamily.semiBold,
		color: colors.neutral.textMuted,
	},
	labelSelected: {
		fontFamily: fontFamily.bold,
		color: colors.neutral.textStrong,
	},
});
