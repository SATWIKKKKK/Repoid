import { useSyncExternalStore } from 'react';
import { getStoredThemePreference, subscribeThemePreference } from '../lib/theme';

export function useThemePreference() {
  return useSyncExternalStore(subscribeThemePreference, getStoredThemePreference, getStoredThemePreference);
}