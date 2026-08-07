import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import Animated from "react-native-reanimated";

import { useFade } from "@/animations";
import { colors, fontFamily, size } from "@/theme";

type EmptyProps = {
	title?: string;
	description?: string;
};

export function Empty({
	title = "Nenhuma conta por aqui ainda",
	description = "Toque no botão + para adicionar sua primeira conta.",
}: EmptyProps) {
	const [isVisible, setIsVisible] = useState(false);
	const fadeStyle = useFade(isVisible ? 1 : 0);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	return (
		<Animated.View style={[styles.container, fadeStyle]}>
			<Ionicons
				name="wallet-outline"
				size={48}
				color={colors.neutral.textStrong}
				style={styles.icon}
			/>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.description}>{description}</Text>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 32,
		paddingBottom: 96,
		gap: 4,
	},
	icon: {
		marginBottom: 8,
	},
	title: {
		...size.lg,
		fontFamily: fontFamily.bold,
		color: colors.neutral.textStrong,
		textAlign: "center",
	},
	description: {
		...size.md,
		fontFamily: fontFamily.medium,
		color: colors.neutral.textMuted,
		textAlign: "center",
	},
});
