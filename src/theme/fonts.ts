import {
	Manrope_400Regular,
	Manrope_500Medium,
	Manrope_600SemiBold,
	Manrope_700Bold,
	Manrope_800ExtraBold,
} from "@expo-google-fonts/manrope";

export const fonts = {
	Manrope_400Regular,
	Manrope_500Medium,
	Manrope_600SemiBold,
	Manrope_700Bold,
	Manrope_800ExtraBold,
};

export const fontFamily = {
	regular: "Manrope_400Regular",
	medium: "Manrope_500Medium",
	semiBold: "Manrope_600SemiBold",
	bold: "Manrope_700Bold",
	extraBold: "Manrope_800ExtraBold",
} as const;

export const size = {
	sm: { fontSize: 12, lineHeight: 18 },
	md: { fontSize: 14, lineHeight: 21 },
	lg: { fontSize: 24, lineHeight: 30 },
	xl: { fontSize: 34, lineHeight: 37.4 },
} as const;
