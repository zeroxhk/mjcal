import { useEffect } from 'react';
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
  const { currentLocation, navigate } = useRouterContext();

  const currentPath = currentLocation.path;
  const view = views.find(({ path }) => matchRoute(path, currentPath));
  if (!view) return null;

  if ('redirect' in view) {
    useEffect(() => {
      navigate({ path: view.redirect });
    }, []);
    return null;
  }

  return (
    <RouterContextProvider rootPath={view.path === '/' ? '' : view.path}>
      <view.component {...getRouteParams(view.path, currentPath)} />
    </RouterContextProvider>
  );
};
