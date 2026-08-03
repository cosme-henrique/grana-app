import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, Text, View } from "react-native";

import { colors, fontFamily, radius, size } from "@/theme";

type BadgeVariant = keyof typeof colors.status;

type BadgeProps = {
	label: string;
	variant: BadgeVariant;
	style?: StyleProp<ViewStyle>;
};

export function Badge({ label, variant, style }: BadgeProps) {
	const { bg, fg } = colors.status[variant];

	return (
		<View style={[styles.badge, { backgroundColor: bg }, style]}>
			<Text style={[styles.text, { color: fg }]}>{label}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	badge: {
		alignSelf: "flex-start",
		paddingVertical: 4,
		paddingHorizontal: 10,
		borderRadius: radius.full,
	},
	text: {
		...size.sm,
		fontFamily: fontFamily.bold,
	},
});
