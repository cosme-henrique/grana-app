export function formatCurrency(value: number): string {
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(value);
}

export function formatShortDate(isoDate: string): string {
	const [, month, day] = isoDate.split("-");
	return `${day}/${month}`;
}

export function formatBRDate(isoDate: string): string {
	const [year, month, day] = isoDate.split("-");
	return `${day}/${month}/${year}`;
}

export function getTodayISODate(): string {
	const now = new Date();
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, "0");
	const day = String(now.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

export function formatMonthYear(date: Date): string {
	const month = new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(
		date,
	);
	return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${date.getFullYear()}`;
}
