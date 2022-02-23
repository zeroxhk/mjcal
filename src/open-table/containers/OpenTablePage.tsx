import { Container } from '@mui/material';
import { createRoute, RouterViewSwitch } from '../../router/components/RouterViewSwitch';
import { useRouterContext } from '../../router/hooks/useRouterContext';
import { FirstWuStep } from './FirstWuStep';
import { PlayersStep } from './PlayersStep';
import { ScoringSettingsStep } from './ScoringSettingsStep';

export const OpenTablePage = () => {
  const { navigate, navigateAbsolute } = useRouterContext();
  return (
    <Container maxWidth="xl" sx={{ pt: 5 }}>
      <RouterViewSwitch
        views={[
          createRoute({
            path: '/scoring-settings',
            component: () => <ScoringSettingsStep onNext={() => navigate({ path: '/players' })} />,
          }),
          createRoute({
            path: '/players',
            component: () => (
              <PlayersStep
                onBack={() => navigate({ path: '/scoring-settings' })}
                onNext={() => navigate({ path: '/first-wu' })}
              />
            ),
          }),
          createRoute({
            path: '/first-wu',
            component: () => (
              <FirstWuStep
                onBack={() => navigate({ path: '/players' })}
                onNext={() => navigateAbsolute({ path: '/game/chart' })}
              />
            ),
          }),
          createRoute({
            path: '*',
            redirect: '/scoring-settings',
          }),
        ]}
      />
    </Container>
  );
};
