import { BackHeader } from "@/components/BackHeader";
import { Container } from "@/components/Container";
import { Divider } from "@/components/Divider";
import { Tabs } from "@/components/Tabs";
import { TransactionForm } from "@/features/transaction/components/TransactionForm";
import { useNewTransactionScreen } from "@/features/transaction/hooks/useNewTransactionScreen";

export default function NewTransactionPage() {
	const screen = useNewTransactionScreen();

	return (
		<Container>
			<BackHeader title="Nova conta" />
			<Divider />
			<Tabs
				value={screen.type}
				onChange={screen.onChangeType}
				options={[
					{ label: "Despesa (a pagar)", value: "expense" },
					{ label: "Receita (a receber)", value: "income" },
				]}
			/>
			<TransactionForm type={screen.type} onSubmit={screen.onSave} />
		</Container>
	);
}
