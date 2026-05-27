import React from 'react';
import { useThemePreference } from '../hooks/useThemePreference';
import { shouldUseDarkTheme } from '../lib/theme';

type LogoProps = {
  className?: string;
  alt?: string;
  lightSrc?: string;
  darkSrc?: string;
};

export default function Logo({
  className,
  alt = 'Repoid',
  lightSrc = '/assets/light-mode.svg',
  darkSrc = '/assets/dark-mode.svg',
}: LogoProps) {
  const pref = useThemePreference();
  const isDark = shouldUseDarkTheme(pref);
  const src = isDark ? darkSrc : lightSrc;

  return <img src={src} alt={alt} className={className} />;
}
