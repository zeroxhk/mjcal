import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { useEventListener } from 'usehooks-ts';
import { Location } from '../models/Location';

const createLocationFromPath = (path: string) => ({ path });

const pushState = (path: string) => window.history.pushState({}, document.title, path);

const useRootRouterContext = (): [
  currentLocation: Location,
  navigate: (l: Location) => void,
  navigateAbsolute: (l: Location) => void,
] => {
  const [path, setPath] = useState(location.pathname);

  useEventListener('popstate', () => setPath(location.pathname));

  return [
    useMemo(() => createLocationFromPath(path), [path]),
    useCallback(({ path }: Location) => {
      setPath(path);
      pushState(path);
    }, []),
    useCallback(({ path }: Location) => {
      setPath(path);
      pushState(path);
    }, []),
  ];
};

const useParentRouterContext = (
  rootPath: string,
  parentContext: {
    rootPath: string;
    currentLocation: Location;
    navigate: (l: Location) => void;
    navigateAbsolute: (l: Location) => void;
  },
): [currentLocation: Location, navigate: (l: Location) => void, navigateAbsolute: (l: Location) => void] => {
  return [
    useMemo(
      () => createLocationFromPath(parentContext.currentLocation.path.slice(rootPath.length)),
      [parentContext.currentLocation.path, rootPath],
    ),
    useCallback(({ path }: Location) => parentContext.navigate({ path: `${rootPath}${path}` }), [rootPath]),
    parentContext.navigateAbsolute,
  ];
};

export const RouterContext = createContext<{
  rootPath: string;
  currentLocation: Location;
  navigate: (l: Location) => void;
  navigateAbsolute: (l: Location) => void;
} | null>(null);

export const RouterContextProvider = ({
  rootPath = '',
  children,
}: {
  rootPath?: string;
  children?: ReactNode;
} = {}) => {
  const parentContext = useContext(RouterContext);
  const [currentLocation, navigate, navigateAbsolute] = parentContext
    ? useParentRouterContext(rootPath, parentContext)
    : useRootRouterContext();

  return (
    <RouterContext.Provider value={{ rootPath, currentLocation, navigate, navigateAbsolute }}>
      {children}
    </RouterContext.Provider>
  );
};
