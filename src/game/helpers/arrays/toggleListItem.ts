import { append, without } from 'ramda';

export const toggleListItem = <X>(x: X, xs: X[]): X[] => {
  return xs.includes(x) ? without([x], xs) : append(x, xs);
};
