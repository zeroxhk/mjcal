import { useState } from 'react';

export const useModal = (
  Modal: (props: { isOpened: boolean; onClose: () => void }) => JSX.Element,
): [Modal: () => JSX.Element, open: () => void, close: () => void, isOpened: boolean] => {
  const [isOpened, setIsOpened] = useState(false);
  const open = () => setIsOpened(true);
  const close = () => setIsOpened(false);

  return [() => <Modal isOpened={isOpened} onClose={close} />, open, close, isOpened];
};
