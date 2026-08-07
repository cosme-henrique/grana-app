import {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

import { duration } from "@/animations/config";

const PRESSED_SCALE = 0.96;

export function useScale() {
	const scale = useSharedValue(1);

	function onPressIn() {
		scale.value = withTiming(PRESSED_SCALE, { duration: duration.fast });
	}

	function onPressOut() {
		scale.value = withTiming(1, { duration: duration.fast });
	}

	const style = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
	}));

	return { style, onPressIn, onPressOut };
}
