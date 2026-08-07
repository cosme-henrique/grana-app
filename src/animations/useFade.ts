import { useEffect } from "react";
import {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

import { duration, easing } from "@/animations/config";

export function useFade(target: number) {
	const opacity = useSharedValue(target);

	useEffect(() => {
		opacity.value = withTiming(target, {
			duration: duration.normal,
			easing: easing.standard,
		});
	}, [target, opacity]);

	return useAnimatedStyle(() => ({
		opacity: opacity.value,
	}));
}
