import type { PropsWithChildren } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet } from "react-native";
import type { Edge } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/theme";

type ContainerProps = PropsWithChildren<{
	style?: StyleProp<ViewStyle>;
	edges?: Edge[];
}>;

export function Container({ children, style, edges }: ContainerProps) {
	return (
		<SafeAreaView style={[styles.container, style]} edges={edges}>
			{children}
		</SafeAreaView>
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
