import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export type ReaderThemeKey = 'classic' | 'sepia' | 'night';

export const MIN_FONT_SIZE = 14;
export const MAX_FONT_SIZE = 26;

interface ReaderThemeMeta {
  key: ReaderThemeKey;
  label: string;
  description: string;
  preview: {
    background: string;
    accent: string;
    text: string;
  };
}

interface ReaderPreferencesContextValue {
  readerTheme: ReaderThemeKey;
  setReaderTheme: (theme: ReaderThemeKey) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  themeOptions: ReaderThemeMeta[];
  themeLabelMap: Record<ReaderThemeKey, string>;
}

const ReaderPreferencesContext = createContext<ReaderPreferencesContextValue | undefined>(undefined);

export function ReaderPreferencesProvider({ children }: { children: ReactNode }) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [readerTheme, setReaderTheme] = useState<ReaderThemeKey>('classic');
  const [fontSize, setFontSize] = useState(18);

  const themeOptions = useMemo<ReaderThemeMeta[]>(
    () => [
      {
        key: 'classic',
        label: 'Cổ điển',
        description: 'Giấy ngà dịu mắt, phù hợp cho đọc dài.',
        preview: {
          background: colors.pageBackground,
          accent: colors.tint,
          text: colors.text,
        },
      },
      {
        key: 'sepia',
        label: 'Sepia',
        description: 'Gam màu cát vàng gợi ký ức Sài Gòn xưa.',
        preview: {
          background: '#F3E7C9',
          accent: '#C6862D',
          text: '#3B2D1F',
        },
      },
      {
        key: 'night',
        label: 'Đêm',
        description: 'Tông tối tương phản cao để đọc ban đêm.',
        preview: {
          background: '#1B1B1B',
          accent: '#FFCD00',
          text: '#F1E6D3',
        },
      },
    ],
    [colors.pageBackground, colors.text, colors.tint],
  );

  const themeLabelMap = useMemo(
    () =>
      themeOptions.reduce<Record<ReaderThemeKey, string>>((acc, option) => {
        acc[option.key] = option.label;
        return acc;
      }, { classic: 'Cổ điển', sepia: 'Sepia', night: 'Đêm' }),
    [themeOptions],
  );

  const value = useMemo<ReaderPreferencesContextValue>(
    () => ({ readerTheme, setReaderTheme, fontSize, setFontSize, themeOptions, themeLabelMap }),
    [readerTheme, fontSize, themeOptions, themeLabelMap],
  );

  return (
    <ReaderPreferencesContext.Provider value={value}>
      {children}
    </ReaderPreferencesContext.Provider>
  );
}

export function useReaderPreferences() {
  const context = useContext(ReaderPreferencesContext);
  if (!context) {
    throw new Error('useReaderPreferences must be used within a ReaderPreferencesProvider');
  }
  return context;
}

export type { ReaderThemeMeta };

