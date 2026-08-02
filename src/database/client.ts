import { openDatabaseSync } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";

import * as schema from "@/database/schema";

const sqlite = openDatabaseSync("grana-app.db");

export const db = drizzle(sqlite, { schema });
