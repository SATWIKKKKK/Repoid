export type ThemePreference = 'light' | 'dark' | 'system';

export const THEME_STORAGE_KEY = 'promptly_theme_preference';
const THEME_CHANGE_EVENT = 'promptly-theme-change';

function prefersDarkMode() {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
}

export function normalizeThemePreference(value: unknown, fallback: ThemePreference = 'dark'): ThemePreference {
  return value === 'dark' || value === 'light' || value === 'system' ? value : fallback;
}

export function getStoredThemePreference(fallback: ThemePreference = 'dark') {
  try {
    return normalizeThemePreference(localStorage.getItem(THEME_STORAGE_KEY), fallback);
  } catch {
    return fallback;
  }
}

export function shouldUseDarkTheme(value: ThemePreference) {
  return value === 'dark' || (value === 'system' && prefersDarkMode());
}

export function applyThemePreference(value: ThemePreference) {
  const nextPreference = normalizeThemePreference(value);
  const root = document.documentElement;
  const useDarkTheme = shouldUseDarkTheme(nextPreference);

  root.classList.toggle('dark', useDarkTheme);
  root.dataset.theme = nextPreference;
  root.style.colorScheme = useDarkTheme ? 'dark' : 'light';

  try {
    localStorage.setItem(THEME_STORAGE_KEY, nextPreference);
  } catch {
    // Ignore storage failures and still apply the resolved theme.
  }

  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

export function subscribeThemePreference(listener: () => void) {
  if (typeof window === 'undefined') return () => undefined;

  const handleStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY) listener();
  };
  const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
  const handleMediaChange = () => {
    if (getStoredThemePreference() === 'system') listener();
  };

  window.addEventListener(THEME_CHANGE_EVENT, listener);
  window.addEventListener('storage', handleStorage);
  mediaQuery?.addEventListener?.('change', handleMediaChange);

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, listener);
    window.removeEventListener('storage', handleStorage);
    mediaQuery?.removeEventListener?.('change', handleMediaChange);
  };
}
