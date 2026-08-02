import { Ionicons } from "@expo/vector-icons";
import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";

import { colors, radius } from "@/theme";

type FloatingButtonProps = {
	onPress: () => void;
	disabled?: boolean;
	style?: StyleProp<ViewStyle>;
};

export function FloatingButton({
	onPress,
	disabled,
	style,
}: FloatingButtonProps) {
	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.8}
			disabled={disabled}
			style={[styles.button, disabled && styles.buttonDisabled, style]}
		>
			<Ionicons name="add" size={28} color={colors.white} />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		width: 58,
		height: 58,
		borderRadius: radius.full,
		backgroundColor: colors.brand.indigoDark,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.12,
		shadowRadius: 12,
		elevation: 4,
	},
	buttonDisabled: {
		backgroundColor: colors.neutral.disabled,
		shadowOpacity: 0,
		elevation: 0,
	},
});
