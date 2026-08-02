import type { ReactNode } from "react";
import { useState } from "react";
import type { TextInputProps } from "react-native";
import { StyleSheet, TextInput, View } from "react-native";

import { colors, radius, typography } from "@/theme";

type InputProps = TextInputProps & {
	icon?: ReactNode;
};

export function Input({ style, onFocus, onBlur, icon, ...props }: InputProps) {
	const [isFocused, setIsFocused] = useState(false);

	return (
		<View>
			<TextInput
				{...props}
				onFocus={(event) => {
					setIsFocused(true);
					onFocus?.(event);
				}}
				onBlur={(event) => {
					setIsFocused(false);
					onBlur?.(event);
				}}
				placeholderTextColor={colors.neutral.textMuted}
				style={[
					styles.input,
					icon ? styles.inputWithIcon : null,
					isFocused && styles.inputFocused,
					style,
				]}
			/>
			{icon ? <View style={styles.icon}>{icon}</View> : null}
		</View>
	);
}

const styles = StyleSheet.create({
	input: {
		backgroundColor: colors.neutral.bgCard,
		borderRadius: radius.md,
		borderWidth: 1.5,
		borderColor: colors.neutral.border,
		paddingVertical: 14,
		paddingHorizontal: 18,
		color: colors.neutral.textStrong,
		...typography.body,
	},
	inputWithIcon: {
		paddingRight: 40,
	},
	inputFocused: {
		borderColor: colors.brand.indigoDark,
	},
	icon: {
		position: "absolute",
		right: 14,
		top: 0,
		bottom: 0,
		justifyContent: "center",
	},
});
