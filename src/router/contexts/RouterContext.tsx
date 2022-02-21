import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

type Location = { path: string };

const createLocationFromPath = (path: string) => ({ path });

export const RouterContext = createContext<{
  rootPath: string;
  currentLocation: Location;
  navigate: (l: Location) => void;
} | null>(null);

export const RouterContextProvider = ({
  rootPath = '',
  children,
}: {
  rootPath?: string;
  children?: ReactNode;
} = {}) => {
  const [currentLocation, navigate] = (() => {
    const parentContext = useContext(RouterContext);
    if (parentContext) {
      const { currentLocation, navigate } = parentContext;
      return [
        useMemo(
          () => createLocationFromPath(currentLocation.path.slice(rootPath.length)),
          [currentLocation.path, rootPath],
        ),
        ({ path }: Location) => navigate({ path: `${rootPath}${path}` }),
      ];
    }

    const [path, setPath] = useState(location.pathname);
    return [
      useMemo(() => createLocationFromPath(path), [path]),
      ({ path }: Location) => {
        const absolutePath = `${rootPath}${path}`;
        setPath(path);
        window.history.pushState({}, document.title, absolutePath);
      },
    ];
  })();

  return <RouterContext.Provider value={{ rootPath, currentLocation, navigate }}>{children}</RouterContext.Provider>;
};
