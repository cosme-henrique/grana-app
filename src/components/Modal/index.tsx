import { Ionicons } from "@expo/vector-icons";
import type { PropsWithChildren } from "react";
import { useState } from "react";
import {
	Dimensions,
	Modal as RNModal,
	Pressable,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import Animated from "react-native-reanimated";

import { useFade, useSlide } from "@/animations";
import { colors, radius } from "@/theme";

const SCREEN_HEIGHT = Dimensions.get("window").height;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type ModalProps = PropsWithChildren<{
	visible: boolean;
	onClose: () => void;
}>;

export function Modal({ visible, onClose, children }: ModalProps) {
	const [isOpen, setIsOpen] = useState(false);
	const sheetStyle = useSlide(isOpen ? 0 : SCREEN_HEIGHT, "y");
	const backdropStyle = useFade(isOpen ? 1 : 0);

	function handleClose() {
		setIsOpen(false);
		onClose();
	}

	return (
		<RNModal
			visible={visible}
			transparent
			animationType="none"
			statusBarTranslucent
			onShow={() => setIsOpen(true)}
			onRequestClose={handleClose}
		>
			<AnimatedPressable
				style={[styles.backdrop, backdropStyle]}
				onPress={handleClose}
			/>
			<Animated.View style={[styles.sheet, sheetStyle]}>
				<View style={styles.handle} />
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={handleClose}
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
