import { useCallback, useState } from 'react';

export const useModal = (): [isOpened: boolean, open: () => void, close: () => void] => {
  const [isOpened, setIsOpened] = useState(false);

  return [
    isOpened,
    useCallback(() => setIsOpened(true), []),
    useCallback(() => setIsOpened(false), []),
  ];
};
