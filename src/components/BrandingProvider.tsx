import React from 'react';
import { useBrandingStore } from '../store/branding';
import { useThemeStore } from '../store/theme';

export default function BrandingProvider({ children }: { children: React.ReactNode }) {
  const { 
    primaryColor, 
    secondaryColor, 
    accentColor,
    faviconUrl,
    siteTitle 
  } = useBrandingStore();
  const { theme } = useThemeStore();

  React.useEffect(() => {
    // Update favicon
    if (faviconUrl) {
      const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = faviconUrl;
      document.head.appendChild(link);
    }

    // Update title
    if (siteTitle) {
      document.title = siteTitle;
    }

    // Update theme colors
    document.documentElement.style.setProperty('--brand-600', primaryColor);
    document.documentElement.style.setProperty('--brand-700', adjustColor(primaryColor, -10));
    document.documentElement.style.setProperty('--brand-500', adjustColor(primaryColor, 10));
  }, [primaryColor, secondaryColor, accentColor, faviconUrl, siteTitle, theme]);

  return <>{children}</>;
}

function adjustColor(color: string, amount: number): string {
  const hex = color.replace('#', '');
  const num = parseInt(hex, 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}