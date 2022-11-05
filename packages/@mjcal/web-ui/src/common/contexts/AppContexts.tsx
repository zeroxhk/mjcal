import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';
import { PlayersContextProvider } from '../../game-settings/contexts/PlayersContext';
import { ScoringSettingsContextProvider } from '../../game-settings/contexts/ScoringSettingsContext';
import { GameContextProvider } from '../../game/contexts/GameContext';
import { LocaleContextProvider } from '../../locales/contexts/LocaleContext';
import { RouterContextProvider } from '../../router/contexts/RouterContext';
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
                contrastText: '#000',
              },
            },
          })}
        >
          <CssBaseline />
          <NestComponents
            components={[
              PlayersContextProvider,
              GameContextProvider,
              ScoringSettingsContextProvider,
            ]}
          >
            {children}
          </NestComponents>
        </ThemeProvider>
      </RouterContextProvider>
    </LocaleContextProvider>
  );
};
