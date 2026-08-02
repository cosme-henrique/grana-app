export function maskDate(value: string): string {
	const digits = value.replace(/\D/g, "").slice(0, 8);

	if (digits.length <= 2) {
		return digits;
	}

	if (digits.length <= 4) {
		return `${digits.slice(0, 2)}/${digits.slice(2)}`;
	}

	return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

export function parseBRDate(value: string): string | undefined {
	const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
	if (!match) {
		return undefined;
	}

	const [, day, month, year] = match;
	return `${year}-${month}-${day}`;
}
