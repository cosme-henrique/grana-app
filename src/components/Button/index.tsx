import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { Loading } from "@/components/Loading";
import { colors, fontFamily, radius, size } from "@/theme";

type ButtonVariant = "primary" | "secondary" | "danger";

type ButtonProps = {
	title: string;
	onPress: () => void;
	variant?: ButtonVariant;
	disabled?: boolean;
	isLoading?: boolean;
	style?: StyleProp<ViewStyle>;
};

const variants = {
	primary: {
		backgroundColor: colors.brand.indigoDark,
		borderColor: colors.brand.indigoDark,
		color: colors.white,
		fontFamily: fontFamily.bold,
	},
	secondary: {
		backgroundColor: colors.neutral.bgApp,
		borderColor: colors.neutral.border,
		color: colors.neutral.textStrong,
		fontFamily: fontFamily.semiBold,
	},
	danger: {
		backgroundColor: colors.status.atrasado.bg,
		borderColor: colors.status.atrasado.bg,
		color: colors.status.atrasado.fg,
		fontFamily: fontFamily.semiBold,
	},
} as const;

export function Button({
	title,
	onPress,
	variant = "primary",
	disabled,
	isLoading,
	style,
}: ButtonProps) {
	const variantStyle = variants[variant];
	const isDisabled = disabled || isLoading;
	const backgroundColor = isDisabled
		? colors.neutral.textMuted
		: variantStyle.backgroundColor;
	const borderColor = isDisabled
		? colors.neutral.textMuted
		: variantStyle.borderColor;
	const color = isDisabled ? colors.white : variantStyle.color;

	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.8}
			disabled={isDisabled}
			style={[styles.container, { backgroundColor, borderColor }, style]}
		>
			{isLoading ? (
				<Loading color={color} />
			) : (
				<Text
					style={[styles.text, { color, fontFamily: variantStyle.fontFamily }]}
				>
					{title}
				</Text>
			)}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 14,
		paddingHorizontal: 22,
		borderRadius: radius.md,
		borderWidth: 1.5,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		...size.md,
	},
});
