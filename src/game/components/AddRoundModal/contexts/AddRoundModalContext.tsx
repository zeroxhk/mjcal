import { createContext, ReactNode, useCallback, useState } from 'react';
import { createDefaultDraftRound, DraftRound } from '../models/DraftRound';

export const AddRoundModalContext = createContext<{
  draftRound: DraftRound;
  updateDraftRound: (partialDraft: Partial<DraftRound>) => void;
  next: () => void;
  back: () => void;
  close: () => void;
}>({
  draftRound: createDefaultDraftRound(),
  updateDraftRound: () => {},
  next: () => {},
  back: () => {},
  close: () => {},
});

export const AddRoundModalContextProvider = ({
  initial,
  next = () => {},
  back = () => {},
  close = () => {},
  children,
}: {
  initial: { draftRound: DraftRound };
  next?: () => void;
  back?: () => void;
  close?: () => void;
  children: ReactNode;
}) => {
  const [draftRound, updateDraftRound] = useDraftRound(initial.draftRound);

  return (
    <AddRoundModalContext.Provider value={{ draftRound, updateDraftRound, next, back, close }}>
      {children}
    </AddRoundModalContext.Provider>
  );
};

const useDraftRound = (
  initial: DraftRound,
): [draftRound: DraftRound, updateDraftRound: (partialDraft: Partial<DraftRound>) => void] => {
  const [draftRound, setDraftRound] = useState(initial);
  return [
    draftRound,
    useCallback(
      partialDraftRound =>
        setDraftRound(currentDraft => ({
          ...currentDraft,
          ...partialDraftRound,
        })),
      [],
    ),
  ];
};
