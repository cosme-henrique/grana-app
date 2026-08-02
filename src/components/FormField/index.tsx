import type { PropsWithChildren } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, Text, View } from "react-native";

import { colors, fontFamily, typography } from "@/theme";

type FormFieldProps = PropsWithChildren<{
	label: string;
	error?: string;
	style?: StyleProp<ViewStyle>;
}>;

export function FormField({ label, error, style, children }: FormFieldProps) {
	return (
		<View style={style}>
			<Text style={styles.label}>{label}</Text>
			{children}
			{error ? <Text style={styles.error}>{error}</Text> : null}
		</View>
	);
}

const styles = StyleSheet.create({
	label: {
		...typography.body,
		fontFamily: fontFamily.bold,
		color: colors.neutral.textStrong,
		marginBottom: 4,
	},
	error: {
		...typography.caption,
		color: colors.status.atrasado.fg,
		marginTop: 4,
	},
});
