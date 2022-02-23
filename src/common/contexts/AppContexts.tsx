import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';
import { GameContextProvider } from '../../game/contexts/GameContext';
import { LocaleContextProvider } from '../../locales/contexts/LocaleContext';
import { RouterContextProvider } from '../../router/contexts/RouterContext';
import { PlayersContextProvider } from '../../settings/contexts/PlayersContext';
import { ScoringSettingsContextProvider } from '../../settings/contexts/ScoringSettingsContext';
import { NestComponents } from '../components/NestComponents';

export const AppContextsProvider = ({ children }: { children: ReactNode }) => {
  return (
    <LocaleContextProvider>
      <RouterContextProvider>
        <ThemeProvider
          theme={createTheme({
            palette: {
              mode: 'dark',

              secondary: {
                main: '#b7b7b7',
                dark: '#5e5e5e',
                contrastText: '#000',
              },
            },
          })}
        >
          <CssBaseline />
          <NestComponents components={[PlayersContextProvider, GameContextProvider, ScoringSettingsContextProvider]}>
            {children}
          </NestComponents>
        </ThemeProvider>
      </RouterContextProvider>
    </LocaleContextProvider>
  );
};
