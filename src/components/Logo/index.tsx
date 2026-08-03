import { StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

import { colors, fontFamily, radius, size } from "@/theme";

const G_MARK_PATH =
	"M 82.791 60.063 C 68.914 62.140, 61.449 70.148, 59.391 85.164 C 57.905 96.003, 62.985 106.623, 72.456 112.479 C 77.216 115.421, 77.671 115.500, 89.922 115.500 C 97.181 115.500, 104.705 114.933, 107.714 114.159 L 112.927 112.818 113.214 103.659 C 113.484 95.023, 113.628 94.482, 115.750 94.180 C 117.196 93.975, 118 93.171, 118 91.930 C 118 90.126, 117.183 90, 105.500 90 C 93.803 90, 93 90.124, 93 91.937 C 93 93.391, 93.810 93.951, 96.250 94.187 L 99.500 94.500 99.500 102.500 L 99.500 110.500 93.838 111.399 C 88.815 112.196, 87.630 112.026, 83.338 109.899 C 79.708 108.099, 77.953 106.417, 76.311 103.162 C 73.401 97.394, 72.474 89.104, 73.789 80.606 C 75.407 70.154, 80.099 65.081, 88.933 64.232 C 98.734 63.291, 107 67.320, 107 73.039 C 107 75.355, 107.445 76, 109.046 76 C 110.933 76, 111.068 75.480, 110.796 69.290 L 110.500 62.581 106.500 61.436 C 100.592 59.744, 89.294 59.090, 82.791 60.063";

export function GMark({ size, color }: { size: number; color: string }) {
	return (
		<Svg width={size} height={size} viewBox="0 0 176 176">
			<Path d={G_MARK_PATH} fill={color} />
		</Svg>
	);
}

type LogoVariant = "header" | "mark";

type LogoProps = {
	variant?: LogoVariant;
};

export function Logo({ variant = "header" }: LogoProps) {
	if (variant === "mark") {
		return <GMark size={120} color={colors.brand.indigoDark} />;
	}

	return (
		<View style={styles.header}>
			<View style={styles.badge}>
				<GMark size={44} color={colors.white} />
			</View>
			<Text style={styles.title}>Grana</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	badge: {
		width: 36,
		height: 36,
		borderRadius: radius.sm,
		backgroundColor: colors.brand.indigoDark,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		...size.lg,
		fontFamily: fontFamily.bold,
		color: colors.neutral.textStrong,
	},
});
