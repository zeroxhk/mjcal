import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { useEventListener } from 'usehooks-ts';
import { Location } from '../models/Location';

const createLocationFromPath = (path: string) => ({ path });

const pushState = (path: string) => window.history.pushState({}, document.title, path);
const replaceState = (path: string) => window.history.replaceState({}, document.title, path);

const useRootRouterContext = (): [
  currentLocation: Location,
  navigate: (l: Location) => void,
  navigateAbsolute: (l: Location) => void,
  replace: (l: Location) => void,
  replaceAbsolute: (l: Location) => void,
] => {
  const [path, setPath] = useState(location.pathname);

  useEventListener('popstate', () => setPath(location.pathname));

  const push = useCallback(({ path }: Location) => {
    setPath(path);
    pushState(path);
  }, []);

  const replace = useCallback(({ path }: Location) => {
    setPath(path);
    replaceState(path);
  }, []);

  return [useMemo(() => createLocationFromPath(path), [path]), push, push, replace, replace];
};

const useParentRouterContext = (
  rootPath: string,
  parentContext: {
    rootPath: string;
    currentLocation: Location;
    navigate: (l: Location) => void;
    navigateAbsolute: (l: Location) => void;
    replace: (l: Location) => void;
    replaceAbsolute: (l: Location) => void;
  },
): [
  currentLocation: Location,
  navigate: (l: Location) => void,
  navigateAbsolute: (l: Location) => void,
  replace: (l: Location) => void,
  replaceAbsolute: (l: Location) => void,
] => {
  return [
    useMemo(
      () => createLocationFromPath(parentContext.currentLocation.path.slice(rootPath.length)),
      [parentContext.currentLocation.path, rootPath],
    ),
    useCallback(({ path }: Location) => parentContext.navigate({ path: `${rootPath}${path}` }), [rootPath]),
    parentContext.navigateAbsolute,
    useCallback(({ path }: Location) => parentContext.replace({ path: `${rootPath}${path}` }), [rootPath]),
    parentContext.replaceAbsolute,
  ];
};

export const RouterContext = createContext<{
  rootPath: string;
  currentLocation: Location;
  navigate: (l: Location) => void;
  navigateAbsolute: (l: Location) => void;
  replace: (l: Location) => void;
  replaceAbsolute: (l: Location) => void;
} | null>(null);

export const RouterContextProvider = ({
  rootPath = '',
  children,
}: {
  rootPath?: string;
  children?: ReactNode;
} = {}) => {
  const parentContext = useContext(RouterContext);
  const [currentLocation, navigate, navigateAbsolute, replace, replaceAbsolute] = parentContext
    ? useParentRouterContext(rootPath, parentContext)
    : useRootRouterContext();

  return (
    <RouterContext.Provider value={{ rootPath, currentLocation, navigate, navigateAbsolute, replace, replaceAbsolute }}>
      {children}
    </RouterContext.Provider>
  );
};
