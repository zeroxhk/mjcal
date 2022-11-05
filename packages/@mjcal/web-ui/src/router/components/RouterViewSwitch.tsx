import { useEffectOnce } from 'usehooks-ts';
import { RouterContextProvider } from '../contexts/RouterContext';
import { getRouteParams, matchRoute } from '../helpers/routes';
import { useRouterContext } from '../hooks/useRouterContext';
import { RouteParam } from '../models/Route';

type Route = Readonly<
  | {
      path: string;
      component: (props: RouteParam<string>) => JSX.Element;
    }
  | {
      path: string;
      redirect: string;
    }
>;

export const createRoute = <P extends string>(
  r: { path: P; component: (props: RouteParam<P>) => JSX.Element } | { path: P; redirect: string },
) => r;

export const RouterViewSwitch = <V extends readonly Route[]>({ views }: { views: V }) => {
  const { currentLocation, replace } = useRouterContext();

  const currentPath = currentLocation.path;
  const view = views.find(({ path }) => matchRoute(path, currentPath));

  useEffectOnce(() => {
    if (!view) return;
    if ('redirect' in view) {
      replace({ path: view.redirect });
    }
  });

  if (!view) return null;
  if ('redirect' in view) return null;

  return (
    <RouterContextProvider rootPath={view.path === '/' ? '' : view.path}>
      <view.component {...getRouteParams(view.path, currentPath)} />
    </RouterContextProvider>
  );
};
