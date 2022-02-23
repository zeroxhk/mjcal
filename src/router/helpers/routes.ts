import { apply, zip } from 'ramda';
import { RouteParam } from '../models/Route';

export const getRouteParams = <R extends string, P extends string>(routePath: R, path: P): RouteParam<P> =>
  Object.fromEntries(
    zip(routePath.split('/'), path.split('/'))
      .filter(([routePart]) => routePart.startsWith(':'))
      .map(([routePart, pathPart]) => [routePart.slice(1), pathPart]),
  ) as any;

export const matchRoute = (routePath: string, path: string): boolean => {
  const routeParts = routePath.split('/');
  const pathParts = path.split('/');

  if (routeParts.length > pathParts.length) return false;

  return zip(routeParts, pathParts).every(apply(matchRoutePart));
};

const matchRoutePart = (routePart: string, pathPart: string): boolean => {
  if (routePart === '*') return true;
  if (routePart.startsWith(':')) return true;
  return routePart === pathPart;
};
