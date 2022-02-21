import { useContext } from 'react';
import { RouterContext } from '../contexts/RouterContext';

export const useRouterContext = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('no router context found');
  }
  return context;
};
