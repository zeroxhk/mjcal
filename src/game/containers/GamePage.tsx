import { BottomNavigation, BottomNavigationAction, Box, Container, Icon } from '@mui/material';
import { ReactNode, useCallback, useContext, useMemo } from 'react';
import { ChartPage } from '../../chart/containers/ChartPage';
import { useModal } from '../../common/hooks/useModal';
import { usePromptBeforeUnload } from '../../common/hooks/usePromptBeforeUnload';
import { useT } from '../../locales/hooks/useT';
import { RouterViewSwitch } from '../../router/components/RouterViewSwitch';
import { useRouterContext } from '../../router/hooks/useRouterContext';
import { SettingsPage } from '../../settings/containers/SettingsPage';
import { AddRoundModal } from '../components/AddRoundModal/AddRoundModal';
import { AddRoundModalTrigger } from '../components/AddRoundModal/components/AddRoundModalTrigger';
import { GameContext } from '../contexts/GameContext';
import { TablePage } from './TablePage';

const BottomMenu = <T extends string>({
  items,
  selectedItemId,
  onSelectedItemIdChange,
}: {
  items: readonly { id: T; label: string; icon: ReactNode }[];
  selectedItemId?: T;
  onSelectedItemIdChange: (id: T) => void;
}) => {
  return (
    <BottomNavigation
      showLabels
      value={items.findIndex(({ id }) => id === selectedItemId)}
      onChange={(_, newIndex) => {
        const item = items[newIndex];
        if (!item) throw new Error(`cannot find item at index ${newIndex}`);
        onSelectedItemIdChange(item.id);
      }}
      sx={{ width: '100%' }}
    >
      {items.map(({ label, icon }, i) => (
        <BottomNavigationAction label={label} icon={icon} key={i} />
      ))}
    </BottomNavigation>
  );
};

const useBottomMenuRouterViewSwitch = <T extends string>(
  views: readonly { path: T; label: string; icon: ReactNode; component: () => JSX.Element }[],
) => {
  const { currentLocation, navigate } = useRouterContext();

  return [
    useCallback(() => <RouterViewSwitch views={views} />, [views]),
    useCallback(
      () => (
        <BottomMenu
          items={useMemo(
            () => views.map(({ path, label, icon }) => ({ id: path, label, icon })),
            [views],
          )}
          selectedItemId={currentLocation.path}
          onSelectedItemIdChange={path => navigate({ path })}
        />
      ),
      [views, currentLocation, navigate],
    ),
  ] as const;
};

export const GamePage = () => {
  const t = useT();
  const { rounds } = useContext(GameContext);

  usePromptBeforeUnload(t.beforeUnloadMessage, {
    active: useMemo(() => rounds.length > 0, [rounds.length]),
  });

  const { currentLocation } = useRouterContext();
  const [RouterView, BottomMenu] = useBottomMenuRouterViewSwitch(
    useMemo(
      () =>
        [
          {
            path: '/chart',
            label: t.bottomMenu.chart,
            icon: <Icon>stacked_line_chart</Icon>,
            component: ChartPage,
          },
          {
            path: '/table',
            label: t.bottomMenu.table,
            icon: <Icon>list_alt</Icon>,
            component: TablePage,
          },
          {
            path: '/settings',
            label: t.bottomMenu.settings,
            icon: <Icon>settings</Icon>,
            component: SettingsPage,
          },
        ] as const,
      [t],
    ),
  );

  const [AddRoundModalContainer, openAddRoundModal] = useModal(AddRoundModal);

  return (
    <>
      <Box sx={{ pb: 12 }}>
        <Container
          maxWidth="xl"
          sx={{ mb: 2, display: currentLocation.path === '/settings' ? 'none' : undefined }}
        >
          <AddRoundModalTrigger onOpenModal={openAddRoundModal} />
        </Container>

        <RouterView />

        <Container
          maxWidth="xl"
          sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1 }}
        >
          <BottomMenu />
        </Container>
      </Box>
      <AddRoundModalContainer />
    </>
  );
};
