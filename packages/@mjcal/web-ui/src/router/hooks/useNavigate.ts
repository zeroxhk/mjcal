import { useRouterContext } from './useRouterContext';

export const useNavigate = () => useRouterContext().navigate;
