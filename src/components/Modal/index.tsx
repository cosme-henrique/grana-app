import { Ionicons } from "@expo/vector-icons";
import type { PropsWithChildren } from "react";
import { useEffect, useRef } from "react";
import {
	Animated,
	Dimensions,
	Modal as RNModal,
	Pressable,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";

import { colors, radius } from "@/theme";

const SCREEN_HEIGHT = Dimensions.get("window").height;

type ModalProps = PropsWithChildren<{
	visible: boolean;
	onClose: () => void;
}>;

export function Modal({ visible, onClose, children }: ModalProps) {
	const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

	useEffect(() => {
		if (visible) {
			Animated.timing(translateY, {
				toValue: 0,
				duration: 250,
				useNativeDriver: true,
			}).start();
		} else {
			translateY.setValue(SCREEN_HEIGHT);
		}
	}, [visible, translateY]);

	return (
		<RNModal
			visible={visible}
			transparent
			animationType="none"
			statusBarTranslucent
			onRequestClose={onClose}
		>
			<Pressable style={styles.backdrop} onPress={onClose} />
			<Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
				<View style={styles.handle} />
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={onClose}
					style={styles.closeButton}
				>
					<Ionicons name="close" size={20} color={colors.neutral.textStrong} />
				</TouchableOpacity>
				{children}
			</Animated.View>
		</RNModal>
	);
}

const styles = StyleSheet.create({
	backdrop: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0, 0, 0, 0.4)",
	},
	sheet: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: colors.neutral.bgCard,
		borderTopLeftRadius: radius.lg,
		borderTopRightRadius: radius.lg,
		paddingHorizontal: 20,
		paddingTop: 12,
		paddingBottom: 32,
	},
	handle: {
		alignSelf: "center",
		width: 40,
		height: 4,
		borderRadius: radius.full,
		backgroundColor: colors.neutral.border,
		marginBottom: 16,
	},
	closeButton: {
		position: "absolute",
		top: 16,
		right: 16,
	},
});
