import { RouterContextProvider } from '../contexts/RouterContext';
import { useRouterContext } from '../hooks/useRouterContext';

export const RouterViewSwitch = ({ views }: { views: readonly { path: string; component: () => JSX.Element }[] }) => {
  const { currentLocation } = useRouterContext();

  const currentPath = currentLocation.path;
  const view = views.find(({ path }) => currentPath.startsWith(path));
  if (!view) return null;

  return (
    <RouterContextProvider rootPath={view.path}>
      <view.component />
    </RouterContextProvider>
  );
};
