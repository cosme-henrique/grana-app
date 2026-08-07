import { Easing } from "react-native-reanimated";

export const duration = {
	fast: 150,
	normal: 350,
	slow: 400,
} as const;

export const easing = {
	standard: Easing.out(Easing.cubic),
} as const;
