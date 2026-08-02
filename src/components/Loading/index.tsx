import type { ActivityIndicatorProps } from "react-native";
import { ActivityIndicator } from "react-native";

import { colors } from "@/theme";

type LoadingProps = {
	color?: string;
	size?: ActivityIndicatorProps["size"];
};

export function Loading({
	color = colors.brand.indigoDark,
	size = "small",
}: LoadingProps) {
	return <ActivityIndicator color={color} size={size} />;
}
