import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';
import { GameContextProvider } from '../../game/contexts/GameContext';
import { LocaleContextProvider } from '../../locales/contexts/LocaleContext';
import { PlayersContextProvider } from '../../settings/contexts/PlayersContext';
import { ScoringSettingsContextProvider } from '../../settings/contexts/ScoringSettingsContext';

const Nest = ({
  children,
  components,
}: {
  children: ReactNode;
  components: ((props: { children: ReactNode }) => JSX.Element)[];
}): JSX.Element => components.reduceRight((acc, Provider) => <Provider>{acc}</Provider>, <>{children}</>);

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
      <Nest
        components={[
          LocaleContextProvider,
          PlayersContextProvider,
          GameContextProvider,
          ScoringSettingsContextProvider,
        ]}
      >
        {children}
      </Nest>
    </ThemeProvider>
  );
};
