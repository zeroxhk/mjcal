import { createContext, ReactNode, useEffect, useState } from 'react';
import ZH_HK from '../copies/zh-hk';
import { Copies } from '../models/Copies';
import { LocaleKey } from '../models/LocaleKey';

const getCopies = {
  chinglish: () => import('../copies/chinglish'),
  'zh-hk': () => ({ default: ZH_HK }),
};

export const LocaleContext = createContext<{
  t: Copies;
  setLocale: (localeKey: LocaleKey) => void;
  locale: LocaleKey;
} | null>(null);

export const LocaleContextProvider = ({ children }: { children: ReactNode }) => {
  const [localeKey, setLocaleKey] = useState<LocaleKey>('zh-hk');
  const [copies, setCopies] = useState<Copies>(ZH_HK);

  useEffect(() => {
    console.log(localeKey);
    (async () => {
      setCopies((await getCopies[localeKey]()).default);
    })();
  }, [localeKey]);

  return (
    <LocaleContext.Provider value={{ t: copies, locale: localeKey, setLocale: setLocaleKey }}>
      {children}
    </LocaleContext.Provider>
  );
};
