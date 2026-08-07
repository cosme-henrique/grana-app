import { StyleSheet, Text } from "react-native";
import Animated from "react-native-reanimated";

import { useFade } from "@/animations";
import { BalanceCard } from "@/features/home/components/BalanceCard";
import { Container } from "@/components/Container";
import { FloatingButton } from "@/components/FloatingButton";
import { Logo } from "@/components/Logo";
import { Modal } from "@/components/Modal";
import { MonthSelector } from "@/features/home/components/MonthSelector";
import { TransactionActions } from "@/features/transaction/components/TransactionActions";
import { TransactionList } from "@/features/transaction/components/TransactionList";
import { useHomeScreen } from "@/features/home/hooks/useHomeScreen";
import { colors, fontFamily, size } from "@/theme";

export default function HomePage() {
	const screen = useHomeScreen();
	const isModalOpen = screen.selectedTransaction !== null;
	const floatingButtonStyle = useFade(isModalOpen ? 0 : 1);

	return (
		<Container>
			<Logo variant="header" />
			<Text style={styles.title}>Visão geral</Text>
			<MonthSelector date={screen.date} onChange={screen.onChangeDate} />
			<BalanceCard {...screen.balance} />
			<TransactionList
				transactions={screen.transactions}
				onSelectTransaction={screen.onSelectTransaction}
				onMarkAsPaid={screen.onMarkAsPaid}
			/>
			<Animated.View
				style={[styles.floatingButton, floatingButtonStyle]}
				pointerEvents={isModalOpen ? "none" : "auto"}
			>
				<FloatingButton onPress={screen.onCreateNew} />
			</Animated.View>
			<Modal
				visible={screen.selectedTransaction !== null}
				onClose={screen.onCloseModal}
			>
				{screen.selectedTransaction ? (
					<TransactionActions
						transaction={screen.selectedTransaction}
						onEdit={screen.onEdit}
						onDelete={screen.onDelete}
					/>
				) : null}
			</Modal>
		</Container>
	);
}

const styles = StyleSheet.create({
	title: {
		...size.lg,
		fontFamily: fontFamily.extraBold,
		color: colors.neutral.textStrong,
	},
	floatingButton: {
		position: "absolute",
		right: 16,
		bottom: 24,
	},
});
