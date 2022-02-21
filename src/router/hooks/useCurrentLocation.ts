import { useRouterContext } from './useRouterContext';

export const useCurrentLocation = () => useRouterContext().currentLocation;
