import type { PropsWithChildren } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/theme";

type ContainerProps = PropsWithChildren<{
	style?: StyleProp<ViewStyle>;
}>;

export function Container({ children, style }: ContainerProps) {
	return (
		<SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.neutral.bgApp,
		paddingHorizontal: 16,
		paddingVertical: 12,
		gap: 16,
	},
});
