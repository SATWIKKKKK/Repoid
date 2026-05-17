const ROUND_ENTRY_PATHS: Record<string, string> = {
  'practice-tracks': '/practice-tracks',
  'scenario-round': '/scenario-round',
  'coding-round': '/coding-round',
  'mock-interview': '/mock-interview',
  'full-test': '/dashboard',
};

export function getRoundEntryPath(roundType: string) {
  return ROUND_ENTRY_PATHS[roundType] ?? '/dashboard';
}