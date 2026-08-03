import { StyleSheet, Text } from "react-native";

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
			{screen.selectedTransaction === null ? (
				<FloatingButton
					onPress={screen.onCreateNew}
					style={styles.floatingButton}
				/>
			) : null}
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
