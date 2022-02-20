import { BottomNavigation, BottomNavigationAction, Box, Container } from '@mui/material';
import { ReactNode, useState } from 'react';

export const BottomMenuViewSwitcher = <T extends string>({
  PreView,
  views,
}: {
  PreView: (props: { viewId?: T }) => JSX.Element;
  views: readonly { id: T; label: string; icon: ReactNode; View: () => JSX.Element }[];
}) => {
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  const ViewComponent = views[selectedMenuIndex]?.View ?? (() => null);

  return (
    <Box sx={{ pb: 12 }}>
      <PreView viewId={views[selectedMenuIndex]?.id} />
      <ViewComponent />
      <Container maxWidth="xl" sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1 }}>
        <BottomNavigation
          showLabels
          value={selectedMenuIndex}
          onChange={(_, newValue) => setSelectedMenuIndex(newValue)}
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
