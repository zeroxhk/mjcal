import { Dialog } from '@mui/material';
import { last } from 'ramda';
import { createContext, useCallback, useContext, useState } from 'react';
import { PlayersContext } from '../../../settings/contexts/PlayersContext';
import { GameContext } from '../../contexts/GameContext';
import { Round } from '../../models/Round';
import { CurrentPlayersSelectStep } from './containers/CurrentPlayersSelectStep';
import { LosersStep } from './containers/LosersStep';
import { WinnerStep } from './containers/WinnerStep';
import { DraftRound } from './models/DraftRound';

const STEP_COUNT = 3;

const DEFAULT_DRAFT_ROUND: DraftRound = {
  isTied: false,
  playerIds: [],
  farn: 3,
  winnerId: undefined,
  loserIds: [],
  isSelfTouch: false,
};

const DEFAULT_STEP = 0 as const;

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

const useLatestRound = (): Round | undefined => {
  const { rounds } = useContext(GameContext);
  return last(rounds);
};

export const AddRoundModal = ({
  isOpened,
  onClose,
}: {
  isOpened: boolean;
  onClose: () => void;
}) => {
  const { players: allPlayers } = useContext(PlayersContext);
  const latestRound = useLatestRound();

  const [step, setStep] = useState<number>(DEFAULT_STEP);

  const [draftRound, updateDraftRound] = useDraftRound({
    ...DEFAULT_DRAFT_ROUND,
    playerIds: latestRound?.playerIds ?? allPlayers.slice(0, 4).map(({ id }) => id),
  });

  return (
    <Dialog open={isOpened} onClose={onClose} fullWidth>
      <AddRoundModalContext.Provider
        value={{
          draftRound,
          updateDraftRound,
          next: () => setStep(Math.min(step + 1, STEP_COUNT - 1)),
          back: () => setStep(Math.max(step - 1, 0)),
          close: onClose,
        }}
      >
        {[() => <CurrentPlayersSelectStep />, () => <WinnerStep />, () => <LosersStep />][step]?.()}
      </AddRoundModalContext.Provider>
    </Dialog>
  );
};
