import { zodResolver } from "@hookform/resolvers/zod";
import { Ionicons } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider";
import { FormField } from "@/components/FormField";
import { Input } from "@/components/Input";
import { StatusSelector } from "@/components/StatusSelector";
import { type IncomeFormData, incomeSchema } from "@/schemas/incomeSchema";
import { colors } from "@/theme";
import { formatCurrency } from "@/utils/format";
import { maskDate } from "@/utils/mask";

type IncomeFormProps = {
	onSubmit: (data: IncomeFormData) => void;
	defaultValues?: IncomeFormData;
};

export function IncomeForm({ onSubmit, defaultValues }: IncomeFormProps) {
	const {
		control,
		handleSubmit,
		formState: { isValid },
	} = useForm<IncomeFormData>({
		resolver: zodResolver(incomeSchema),
		mode: "onChange",
		defaultValues: defaultValues ?? {
			name: "",
			amount: 0,
			dueDate: "",
			status: "pending",
		},
	});

	return (
		<View style={styles.container}>
			<Controller
				control={control}
				name="name"
				render={({ field, fieldState }) => (
					<FormField label="Nome da conta" error={fieldState.error?.message}>
						<Input
							placeholder="Ex: Salário"
							value={field.value}
							onChangeText={field.onChange}
						/>
					</FormField>
				)}
			/>

			<Controller
				control={control}
				name="amount"
				render={({ field, fieldState }) => (
					<FormField
						label="Valor"
						error={fieldState.error?.message}
						style={styles.field}
					>
						<Input
							placeholder="R$ 0,00"
							keyboardType="numeric"
							value={field.value ? formatCurrency(field.value) : ""}
							onChangeText={(text) => {
								const digits = text.replace(/\D/g, "");
								field.onChange(digits ? Number(digits) / 100 : 0);
							}}
						/>
					</FormField>
				)}
			/>

			<Controller
				control={control}
				name="dueDate"
				render={({ field, fieldState }) => (
					<FormField
						label="Data de recebimento"
						error={fieldState.error?.message}
						style={styles.field}
					>
						<Input
							placeholder="dd/mm/aaaa"
							value={field.value}
							onChangeText={(text) => field.onChange(maskDate(text))}
							keyboardType="numeric"
							maxLength={10}
							icon={
								<Ionicons
									name="calendar-outline"
									size={18}
									color={colors.neutral.textMuted}
								/>
							}
						/>
					</FormField>
				)}
			/>

			<Controller
				control={control}
				name="status"
				render={({ field }) => (
					<FormField label="Status" style={styles.field}>
						<StatusSelector value={field.value} onChange={field.onChange} />
					</FormField>
				)}
			/>

			<Divider style={styles.divider} />

			<Button
				title="Salvar conta"
				disabled={!isValid}
				onPress={handleSubmit(onSubmit)}
				style={styles.submit}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	field: {
		marginTop: 20,
	},
	divider: {
		marginTop: "auto",
	},
	submit: {
		marginTop: 16,
	},
});
