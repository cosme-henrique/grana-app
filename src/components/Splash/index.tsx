import { StyleSheet, Text, View } from "react-native";

import { GMark } from "@/components/Logo";
import { colors, fontFamily, radius, size } from "@/theme";

export function Splash() {
	return (
		<View style={styles.container}>
			<View style={styles.badge}>
				<GMark size={64} color={colors.brand.indigoDark} />
			</View>
			<Text style={styles.title}>Grana</Text>
			<Text style={styles.subtitle}>organização financeira</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.brand.indigoDark,
		alignItems: "center",
		justifyContent: "center",
	},
	badge: {
		width: 96,
		height: 96,
		borderRadius: radius.lg,
		backgroundColor: colors.white,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 16,
	},
	title: {
		...size.lg,
		fontFamily: fontFamily.extraBold,
		color: colors.white,
	},
	subtitle: {
		...size.md,
		fontFamily: fontFamily.medium,
		color: colors.white,
		opacity: 0.6,
		marginTop: 4,
	},
});
