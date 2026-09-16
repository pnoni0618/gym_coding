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

// 직전 발행 예정일을 구한다. 큐에 남은 글의 createdAt이 이 날짜보다 이전이면,
// 지난 발행일에도 이미 큐에 있었던 글(=발행 완료 처리를 놓쳤을 가능성)로 간주할 수 있다.
export function previousDueDate(cadence: CadenceConfig, platform: string, date: Date = new Date()): Date | undefined {
  const dueDays = cadence[platform]?.dueDays;
  if (!dueDays || dueDays.length === 0) return undefined;

  for (let daysAgo = 1; daysAgo <= 7; daysAgo++) {
    const candidate = new Date(date);
    candidate.setDate(candidate.getDate() - daysAgo);
    if (dueDays.includes(WEEKDAY_NAMES[candidate.getDay()])) {
      candidate.setHours(0, 0, 0, 0);
      return candidate;
    }
  }
  return undefined;
}
