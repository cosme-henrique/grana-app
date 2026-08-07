import { useEffect } from "react";
import {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

import { duration, easing } from "@/animations/config";

type Axis = "x" | "y";

export function useSlide(target: number, axis: Axis = "x") {
	const offset = useSharedValue(target);

	useEffect(() => {
		offset.value = withTiming(target, {
			duration: duration.normal,
			easing: easing.standard,
		});
	}, [target, offset]);

	return useAnimatedStyle(() => ({
		transform: [
			axis === "x"
				? { translateX: offset.value }
				: { translateY: offset.value },
		],
	}));
}
