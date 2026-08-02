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

export const typography = {
	display: { fontFamily: fontFamily.extraBold, fontSize: 34, lineHeight: 37.4 },
	heading: { fontFamily: fontFamily.extraBold, fontSize: 28, lineHeight: 33.6 },
	title: { fontFamily: fontFamily.bold, fontSize: 18, lineHeight: 23.4 },
	labelLg: { fontFamily: fontFamily.semiBold, fontSize: 15, lineHeight: 21 },
	body: { fontFamily: fontFamily.medium, fontSize: 14, lineHeight: 21 },
	caption: { fontFamily: fontFamily.regular, fontSize: 13, lineHeight: 19.5 },
	micro: { fontFamily: fontFamily.bold, fontSize: 11, lineHeight: 15.4 },
} as const;
