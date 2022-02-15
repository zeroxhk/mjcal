import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';
import { GameContextProvider } from '../../game/contexts/GameContext';
import { PlayersContextProvider } from '../../settings/contexts/PlayersContext';
import { ScoringSettingsContextProvider } from '../../settings/contexts/ScoringSettingsContext';

export const AppContextsProvider = ({ children }: { children: ReactNode }) => {
  return (
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
      <PlayersContextProvider>
        <GameContextProvider>
          <ScoringSettingsContextProvider>{children}</ScoringSettingsContextProvider>
        </GameContextProvider>
      </PlayersContextProvider>
    </ThemeProvider>
  );
};
