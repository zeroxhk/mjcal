import { RouterViewSwitch } from '../../router/components/RouterViewSwitch';
import { Header } from '../components/Header';
import { GamePage } from './GamePage';

export const App = () => {
  return (
    <>
      <Header />
      <RouterViewSwitch
        views={[
          {
            path: '/game',
            component: GamePage,
          },
        ]}
      />
    </>
  );
};
