import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors, fontFamily, radius, size } from "@/theme";

type BackHeaderProps = {
	title: string;
};

export function BackHeader({ title }: BackHeaderProps) {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={() => router.back()}
				style={styles.backButton}
			>
				<Ionicons
					name="chevron-back"
					size={20}
					color={colors.neutral.textStrong}
				/>
			</TouchableOpacity>
			<Text style={styles.title}>{title}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	backButton: {
		width: 36,
		height: 36,
		borderRadius: radius.sm,
		backgroundColor: colors.neutral.border,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		...size.lg,
		fontFamily: fontFamily.bold,
		color: colors.neutral.textStrong,
	},
});
