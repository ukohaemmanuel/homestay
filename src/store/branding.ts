import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BrandingState {
  siteName: string;
  siteTitle: string;
  logoUrl: string;
  darkModeLogoUrl: string;
  faviconUrl: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  updateBranding: (branding: Partial<BrandingState>) => void;
}

export const useBrandingStore = create<BrandingState>()(
  persist(
    (set) => ({
      siteName: 'Workshop Manager',
      siteTitle: 'Workshop Management System',
      logoUrl: '',
      darkModeLogoUrl: '',
      faviconUrl: '',
      primaryColor: '#0284C7',
      secondaryColor: '#1E293B',
      accentColor: '#22C55E',
      updateBranding: (branding) => set((state) => ({ ...state, ...branding })),
    }),
    {
      name: 'branding-storage',
    }
  )
);