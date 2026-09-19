import { StyleSheet, Text } from "react-native";

import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { colors, fontFamily, size } from "@/theme";

export default function AccountsPage() {
	return (
		<Container edges={["top", "left", "right"]}>
			<Logo variant="header" />
			<Text style={styles.title}>Accounts</Text>
			<Text style={styles.subtitle}>Under construction.</Text>
		</Container>
	);
}

const styles = StyleSheet.create({
	title: {
		...size.lg,
		fontFamily: fontFamily.extraBold,
		color: colors.neutral.textStrong,
	},
	subtitle: {
		...size.md,
		fontFamily: fontFamily.regular,
		color: colors.neutral.textMuted,
	},
});
