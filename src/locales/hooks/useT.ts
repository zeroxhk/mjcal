import { useLocale } from './useLocale';

export const useT = () => {
  const { t } = useLocale();
  return t;
};
