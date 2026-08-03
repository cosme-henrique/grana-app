import { BackHeader } from "@/components/BackHeader";
import { Container } from "@/components/Container";
import { Divider } from "@/components/Divider";
import { Loading } from "@/components/Loading";
import { TransactionForm } from "@/features/transaction/components/TransactionForm";
import { useEditTransactionScreen } from "@/features/transaction/hooks/useEditTransactionScreen";

export default function EditTransactionPage() {
	const screen = useEditTransactionScreen();

	if (!screen.transaction || !screen.defaultValues) {
		return (
			<Container>
				<BackHeader title="Editar conta" />
				<Loading />
			</Container>
		);
	}

	return (
		<Container>
			<BackHeader title="Editar conta" />
			<Divider />
			<TransactionForm
				type={screen.transaction.type}
				onSubmit={screen.onSave}
				defaultValues={screen.defaultValues}
			/>
		</Container>
	);
}
