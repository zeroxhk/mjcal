import { useEffect, useState } from 'react';

export const useDynamicImport = <T>(fetchData: () => Promise<T>, defaultValue: T): T => {
  const [data, setData] = useState(defaultValue);
  useEffect(() => {
    (async () => {
      setData(await fetchData());
    })();
  }, []);

  return data;
};
