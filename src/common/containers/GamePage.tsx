import { Container, Icon } from '@mui/material';
import { useMemo } from 'react';
import { ChartPage } from '../../chart/containers/ChartPage';
import { AddRoundModalContainer } from '../../game/containers/AddRoundModalContainer';
import { useLocale } from '../../locales/hooks/useLocale';
import { SettingsPage } from '../../settings/containers/SettingsPage';
import { TablePage } from '../../table/containers/TablePage';
import { BottomMenuViewSwitcher } from '../components/BottomMenuViewSwitcher';

export const GamePage = () => {
  const { t } = useLocale();

  return (
    <BottomMenuViewSwitcher
      PreView={({ viewId }) => (
        <Container maxWidth="xl" sx={{ mb: 2, display: viewId === 'settings' ? 'none' : undefined }}>
          <AddRoundModalContainer />
        </Container>
      )}
      views={useMemo(
        () =>
          [
            {
              id: 'chart',
              path: '/chart',
              label: t.bottomMenu.chart,
              icon: <Icon>stacked_line_chart</Icon>,
              component: ChartPage,
            },
            {
              id: 'table',
              path: '/table',
              label: t.bottomMenu.table,
              icon: <Icon>list_alt</Icon>,
              component: TablePage,
            },
            {
              id: 'settings',
              path: '/settings',
              label: t.bottomMenu.settings,
              icon: <Icon>settings</Icon>,
              component: SettingsPage,
            },
          ] as const,
        [t],
      )}
    />
  );
};
