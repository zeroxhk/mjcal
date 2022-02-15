import { Container, Icon } from '@mui/material';
import { ChartPage } from '../../chart/containers/ChartPage';
import { AddRoundModalContainer } from '../../game/containers/AddRoundModalContainer';
import { SettingsPage } from '../../settings/containers/SettingsPage';
import { TablePage } from '../../table/containers/TablePage';
import { BottomMenuViewSwitcher } from '../components/BottomMenuViewSwitcher';
import { Header } from '../components/Header';
import { AppContextsProvider } from '../contexts/AppContexts';

export const App = () => {
  return (
    <AppContextsProvider>
      <Header />
      <BottomMenuViewSwitcher
        PreView={({ viewId }) => (
          <Container maxWidth="xl" sx={{ mb: 2, display: viewId === 'settings' ? 'none' : undefined }}>
            <AddRoundModalContainer />
          </Container>
        )}
        views={
          [
            {
              id: 'chart',
              label: 'Chart',
              icon: <Icon>stacked_line_chart</Icon>,
              View: ChartPage,
            },
            {
              id: 'table',
              label: 'Table',
              icon: <Icon>list_alt</Icon>,
              View: TablePage,
            },
            {
              id: 'settings',
              label: 'Settings',
              icon: <Icon>settings</Icon>,
              View: SettingsPage,
            },
          ] as const
        }
      />
    </AppContextsProvider>
  );
};
