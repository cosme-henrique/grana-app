import { useState } from "react";
import type { LayoutChangeEvent, StyleProp, ViewStyle } from "react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";

import { useSlide } from "@/animations";
import { colors, fontFamily, radius, size } from "@/theme";

const CONTAINER_PADDING = 6;

type TabOption<T extends string> = {
	label: string;
	value: T;
};

type TabsProps<T extends string> = {
	options: TabOption<T>[];
	value: T;
	onChange: (value: T) => void;
	style?: StyleProp<ViewStyle>;
};

export function Tabs<T extends string>({
	options,
	value,
	onChange,
	style,
}: TabsProps<T>) {
	const [containerWidth, setContainerWidth] = useState(0);
	const contentWidth = containerWidth - CONTAINER_PADDING * 2;
	const itemWidth = contentWidth / options.length;
	const selectedIndex = options.findIndex((option) => option.value === value);
	const indicatorStyle = useSlide(selectedIndex * itemWidth);

	function handleLayout(event: LayoutChangeEvent) {
		setContainerWidth(event.nativeEvent.layout.width);
	}

	return (
		<View style={[styles.container, style]} onLayout={handleLayout}>
			{containerWidth > 0 ? (
				<Animated.View
					style={[styles.indicator, { width: itemWidth }, indicatorStyle]}
				/>
			) : null}
			{options.map((option) => {
				const isSelected = option.value === value;

				return (
					<TouchableOpacity
						key={option.value}
						activeOpacity={0.8}
						onPress={() => onChange(option.value)}
						style={styles.tab}
					>
						<Text style={[styles.label, isSelected && styles.labelSelected]}>
							{option.label}
						</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		backgroundColor: colors.neutral.border,
		borderRadius: radius.md,
		padding: CONTAINER_PADDING,
	},
	indicator: {
		position: "absolute",
		top: CONTAINER_PADDING,
		bottom: CONTAINER_PADDING,
		left: CONTAINER_PADDING,
		backgroundColor: colors.neutral.bgCard,
		borderRadius: radius.sm,
	},
	tab: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		borderRadius: radius.sm,
	},
	label: {
		...size.md,
		fontFamily: fontFamily.semiBold,
		color: colors.neutral.textMuted,
	},
	labelSelected: {
		fontFamily: fontFamily.bold,
		color: colors.neutral.textStrong,
	},
});
