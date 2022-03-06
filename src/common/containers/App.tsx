import { GamePage } from '../../game/containers/GamePage';
import { LandingPage } from '../../landing/containers/LandingPage';
import { OpenTablePage } from '../../open-table/containers/OpenTablePage';
import { createRoute, RouterViewSwitch } from '../../router/components/RouterViewSwitch';
import { Header } from '../components/Header';
import '../styles/scrollbars.css';

export const App = () => {
  return (
    <>
      <Header />
      <RouterViewSwitch
        views={[
          createRoute({
            path: '/open-table' as const,
            component: OpenTablePage,
          }),
          createRoute({
            path: '/game' as const,
            component: GamePage,
          }),
          createRoute({
            path: '/' as const,
            component: LandingPage,
          }),
          createRoute({
            path: '/*' as const,
            redirect: '/',
          }),
        ]}
      />
    </>
  );
};
