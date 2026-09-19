import { Slot } from "expo-router";
import { View } from "react-native";

import { TabBar } from "@/components/TabBar";

export default function TabsLayout() {
	return (
		<View style={{ flex: 1 }}>
			<Slot />
			<TabBar.Root>
				<TabBar.Item icon="home" name="Início" href="/" />
				<TabBar.Item icon="wallet" name="Contas" href="/accounts" />
			</TabBar.Root>
		</View>
	);
}
