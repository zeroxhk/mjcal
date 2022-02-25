import { Container, Icon } from '@mui/material';
import { useContext, useMemo } from 'react';
import { ChartPage } from '../../chart/containers/ChartPage';
import { BottomMenuViewSwitcher } from '../../common/components/BottomMenuViewSwitcher';
import { usePromptBeforeUnload } from '../../common/hooks/usePromptBeforeUnload';
import { useT } from '../../locales/hooks/useT';
import { SettingsPage } from '../../settings/containers/SettingsPage';
import { TablePage } from '../../table/containers/TablePage';
import { GameContext } from '../contexts/GameContext';
import { AddRoundModalContainer } from './AddRoundModalContainer';

export const GamePage = () => {
  const t = useT();
  const { rounds } = useContext(GameContext);

  usePromptBeforeUnload(t.beforeUnloadMessage, {
    active: useMemo(() => rounds.length > 0, [rounds.length]),
  });

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
