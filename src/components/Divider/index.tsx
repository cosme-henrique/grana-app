import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, View } from "react-native";

import { colors } from "@/theme";

type DividerProps = {
	style?: StyleProp<ViewStyle>;
};

export function Divider({ style }: DividerProps) {
	return <View style={[styles.divider, style]} />;
}

const styles = StyleSheet.create({
	divider: {
		height: StyleSheet.hairlineWidth,
		backgroundColor: colors.neutral.border,
		marginHorizontal: -16,
	},
});
