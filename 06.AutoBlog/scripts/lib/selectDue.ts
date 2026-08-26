import fs from "node:fs";

export interface CadenceConfig {
  [platform: string]: { postsPerWeek: number; dueDays: string[] };
}

const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function loadCadence(configPath: string): CadenceConfig {
  return JSON.parse(fs.readFileSync(configPath, "utf-8")) as CadenceConfig;
}

export function isDueToday(cadence: CadenceConfig, platform: string, date: Date = new Date()): boolean {
  const todayName = WEEKDAY_NAMES[date.getDay()];
  return cadence[platform]?.dueDays.includes(todayName) ?? false;
}
