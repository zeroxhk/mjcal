import { Container, Icon } from '@mui/material';
import { ChartPage } from '../../chart/containers/ChartPage';
import { AddRoundModalContainer } from '../../game/containers/AddRoundModalContainer';
import { useLocale } from '../../locales/hooks/useLocale';
import { SettingsPage } from '../../settings/containers/SettingsPage';
import { TablePage } from '../../table/containers/TablePage';
import { BottomMenuViewSwitcher } from '../components/BottomMenuViewSwitcher';
import { Header } from '../components/Header';

export const App = () => {
  const { t } = useLocale();

  return (
    <>
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
              label: t.bottomMenu.chart,
              icon: <Icon>stacked_line_chart</Icon>,
              View: ChartPage,
            },
            {
              id: 'table',
              label: t.bottomMenu.table,
              icon: <Icon>list_alt</Icon>,
              View: TablePage,
            },
            {
              id: 'settings',
              label: t.bottomMenu.settings,
              icon: <Icon>settings</Icon>,
              View: SettingsPage,
            },
          ] as const
        }
      />
    </>
  );
};
