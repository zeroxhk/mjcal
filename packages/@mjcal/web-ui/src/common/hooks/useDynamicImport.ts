import { useState } from 'react';
import { useEffectOnce } from 'usehooks-ts';

export const useDynamicImport = <T>(fetchData: () => Promise<T>, defaultValue: T): T => {
  const [data, setData] = useState(defaultValue);
  useEffectOnce(() => {
    (async () => {
      setData(await fetchData());
    })();
  });

  return data;
};
