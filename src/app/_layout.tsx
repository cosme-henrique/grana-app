import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Splash } from "@/components/Splash";
import { db } from "@/database/client";
import { fonts } from "@/theme/fonts";
import { useFonts } from "expo-font";

import migrations from "../../migrations/migrations";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const { success, error } = useMigrations(db, migrations);
	const [fontsLoaded, fontsError] = useFonts(fonts);

	useEffect(() => {
		if ((success || error) && (fontsLoaded || fontsError)) {
			SplashScreen.hideAsync();
		}
	}, [success, error, fontsLoaded, fontsError]);

	if (error) {
		console.error("Erro ao migrar o banco:", error);
		return (
			<View style={styles.container}>
				<Text>Erro ao migrar o banco:</Text>
				<Text>{error.message || JSON.stringify(error)}</Text>
			</View>
		);
	}

	if (!success || (!fontsLoaded && !fontsError)) {
		return <Splash />;
	}

	return (
		<SafeAreaProvider>
			<Stack screenOptions={{ headerShown: false }} />
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
