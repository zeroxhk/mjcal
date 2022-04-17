import { Dialog } from '@mui/material';
import { last } from 'ramda';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { PlayersContext } from '../../../settings/contexts/PlayersContext';
import { GameContext } from '../../contexts/GameContext';
import { Round } from '../../models/Round';
import { CurrentPlayersSelectStep } from './containers/CurrentPlayersSelectStep';
import { LosersStep } from './containers/LosersStep';
import { WinnerStep } from './containers/WinnerStep';
import { DraftRound } from './models/DraftRound';

const STEPS = [CurrentPlayersSelectStep, WinnerStep, LosersStep] as const;

const DEFAULT_DRAFT_ROUND: DraftRound = {
  isTied: false,
  playerIds: [],
  farn: 3,
  winnerId: undefined,
  loserIds: [],
  isSelfTouch: false,
};

const useDraftRound = (
  initial: DraftRound,
): [
  draftRound: DraftRound,
  updateDraftRound: (partialDraft: Partial<DraftRound>) => void,
  resetDraftRound: () => void,
] => {
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
    useCallback(() => setDraftRound(initial), [initial]),
  ];
};

const useLatestRound = (): Round | undefined => {
  const { rounds } = useContext(GameContext);
  return last(rounds);
};

const useStep = (): [
  StepComponent: () => JSX.Element,
  next: () => void,
  back: () => void,
  reset: () => void,
] => {
  const [step, setStep] = useState<number>(0);

  return [
    useMemo(() => {
      const Step = STEPS[step];
      if (!Step) throw new Error(`no step at ${step}`);

      return Step;
    }, [step]),
    useCallback(() => setStep(step => Math.min(step + 1, STEPS.length)), []),
    useCallback(() => setStep(step => Math.max(step - 1, 0)), []),
    useCallback(() => setStep(0), []),
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
  isOpened,
  onClose,
}: {
  isOpened: boolean;
  onClose: () => void;
}) => {
  const { players: allPlayers } = useContext(PlayersContext);
  const latestRound = useLatestRound();

  const [StepComponent, next, back, resetStep] = useStep();

  const [draftRound, updateDraftRound, resetDraftRound] = useDraftRound({
    ...DEFAULT_DRAFT_ROUND,
    playerIds: latestRound?.playerIds ?? allPlayers.slice(0, 4).map(({ id }) => id),
  });

  useEffect(() => {
    if (!isOpened) return;
    resetDraftRound();
    resetStep();
  }, [isOpened]);

  return (
    <Dialog open={isOpened} onClose={onClose} fullWidth>
      <AddRoundModalContext.Provider
        value={{ draftRound, updateDraftRound, next, back, close: onClose }}
      >
        <StepComponent />
      </AddRoundModalContext.Provider>
    </Dialog>
  );
};
