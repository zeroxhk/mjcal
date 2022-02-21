import { BottomNavigation, BottomNavigationAction, Box, Container } from '@mui/material';
import { ReactNode, useMemo } from 'react';
import { RouterViewSwitch } from '../../router/components/RouterViewSwitch';
import { useRouterContext } from '../../router/hooks/useRouterContext';

export const BottomMenuViewSwitcher = <T extends string>({
  PreView,
  views,
}: {
  PreView: (props: { viewId?: T }) => JSX.Element;
  views: readonly { id: T; path: string; label: string; icon: ReactNode; component: () => JSX.Element }[];
}) => {
  const { currentLocation, navigate } = useRouterContext();
  const currentViewId = useMemo(
    () => views.find(({ path }) => path === currentLocation.path)?.id,
    [...views.map(({ id }) => id), ...views.map(({ path }) => path), currentLocation.path],
  );

  return (
    <Box sx={{ pb: 12 }}>
      <PreView viewId={currentViewId} />
      <RouterViewSwitch views={views} />
      <Container maxWidth="xl" sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1 }}>
        <BottomNavigation
          showLabels
          value={views.findIndex(({ id }) => id === currentViewId)}
          onChange={(_, newIndex) => {
            const path = views[newIndex]?.path;
            if (!path) return;
            navigate({ path });
          }}
          sx={{ width: '100%' }}
        >
          {views.map(({ label, icon }, i) => (
            <BottomNavigationAction label={label} icon={icon} key={i} />
          ))}
        </BottomNavigation>
      </Container>
    </Box>
  );
};
