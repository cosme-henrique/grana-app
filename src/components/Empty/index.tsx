import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { colors, typography } from "@/theme";

type EmptyProps = {
	title?: string;
	description?: string;
};

export function Empty({
	title = "Nenhuma conta por aqui ainda",
	description = "Toque no botão + para adicionar sua primeira conta.",
}: EmptyProps) {
	return (
		<View style={styles.container}>
			<Ionicons
				name="wallet-outline"
				size={48}
				color={colors.neutral.textMuted}
				style={styles.icon}
			/>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.description}>{description}</Text>
		</View>
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
		...typography.title,
		color: colors.neutral.textStrong,
		textAlign: "center",
	},
	description: {
		...typography.body,
		color: colors.neutral.textMuted,
		textAlign: "center",
	},
});
