import { Dialog } from '@mui/material';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { PlayersContext } from '../../../settings/contexts/PlayersContext';
import { CurrentPlayersSelectStep } from './containers/CurrentPlayersSelectStep';
import { LosersStep } from './containers/LosersStep';
import { WinnerStep } from './containers/WinnerStep';
import { DraftRound } from './models/DraftRound';

const STEP_COUNT = 3;

const DEFAULT_DRAFT_ROUND: DraftRound = {
  playerIds: [],
  farn: 3,
  winnerId: undefined,
  loserIds: [],
  isBao: false,
  isSelfTouch: false,
};

const DEFAULT_STEP = 0 as const;

const useDraftRound = (
  initial: DraftRound,
): [
  draftRound: DraftRound,
  setDraftRound: (partialDraft: DraftRound) => void,
  updateDraftRound: (partialDraft: Partial<DraftRound>) => void,
] => {
  const [draftRound, setDraftRound] = useState(initial);
  return [
    draftRound,
    setDraftRound,
    useCallback(
      partialDraftRound =>
        setDraftRound({
          ...draftRound,
          ...partialDraftRound,
        }),
      [draftRound],
    ),
  ];
};

export const AddRoundModalContext = createContext<{
  draftRound: DraftRound;
  updateDraftRound: (partialDraft: Partial<DraftRound>) => void;
  next: () => void;
  back: () => void;
  close: () => void;
}>({
  draftRound: DEFAULT_DRAFT_ROUND,
  updateDraftRound: () => {},
  next: () => {},
  back: () => {},
  close: () => {},
});

export const AddRoundModal = ({
  TriggerComponent,
}: {
  TriggerComponent: ({ onOpenModal }: { onOpenModal: () => void }) => JSX.Element;
}) => {
  const { players: allPlayers } = useContext(PlayersContext);

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<number>(DEFAULT_STEP);

  const [draftRound, setDraftRound, updateDraftRound] = useDraftRound({
    ...DEFAULT_DRAFT_ROUND,
    playerIds: allPlayers.slice(0, 4).map(({ id }) => id),
  });

  useEffect(() => {
    if (!open) return;
    setStep(DEFAULT_STEP);
    setDraftRound({
      ...DEFAULT_DRAFT_ROUND,
      playerIds: draftRound.playerIds,
    });
  }, [open]);

  return (
    <>
      <TriggerComponent onOpenModal={() => setOpen(true)} />
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <AddRoundModalContext.Provider
          value={{
            draftRound,
            updateDraftRound,
            next: () => setStep(Math.min(step + 1, STEP_COUNT - 1)),
            back: () => setStep(Math.max(step - 1, 0)),
            close: () => setOpen(false),
          }}
        >
          {[() => <CurrentPlayersSelectStep />, () => <WinnerStep />, () => <LosersStep />][
            step
          ]?.()}
        </AddRoundModalContext.Provider>
      </Dialog>
    </>
  );
};
