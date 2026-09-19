import { Ionicons } from "@expo/vector-icons";
import type { Href } from "expo-router";
import { Link, usePathname } from "expo-router";
import type { PropsWithChildren } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, fontFamily, size } from "@/theme";

function Root({ children }: PropsWithChildren) {
	const insets = useSafeAreaInsets();

	return (
		<View style={[styles.container, { paddingBottom: insets.bottom || 12 }]}>
			{children}
		</View>
	);
}

type TabItemProps = {
	icon: keyof typeof Ionicons.glyphMap;
	name: string;
	href: Href;
};

function Item({ icon, name, href }: TabItemProps) {
	const pathname = usePathname();
	const isActive = pathname === href;
	const color = isActive ? colors.brand.indigoDark : colors.neutral.textMuted;

	return (
		<Link href={href} asChild>
			<TouchableOpacity style={styles.item} activeOpacity={0.8}>
				<Ionicons name={icon} size={24} color={color} />
				<Text style={[styles.label, { color }]}>{name}</Text>
			</TouchableOpacity>
		</Link>
	);
}

export const TabBar = { Root, Item };

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		backgroundColor: colors.neutral.bgCard,
		borderTopWidth: 1,
		borderTopColor: colors.neutral.border,
		paddingTop: 10,
	},
	item: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		gap: 2,
	},
	label: {
		...size.sm,
		fontFamily: fontFamily.semiBold,
	},
});
