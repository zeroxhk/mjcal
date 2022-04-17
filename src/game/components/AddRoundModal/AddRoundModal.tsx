import { Dialog } from '@mui/material';
import { nanoid } from 'nanoid';
import { last } from 'ramda';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { PlayersContext } from '../../../game-settings/contexts/PlayersContext';
import { GameContext } from '../../contexts/GameContext';
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

const useStep = (): [StepComponent: () => JSX.Element, next: () => void, back: () => void] => {
  const [step, setStep] = useState<number>(0);

  return [
    useMemo(() => {
      const Step = STEPS[step];
      if (!Step) throw new Error(`no step at ${step}`);

      return Step;
    }, [step]),
    useCallback(() => setStep(step => Math.min(step + 1, STEPS.length)), []),
    useCallback(() => setStep(step => Math.max(step - 1, 0)), []),
  ];
};

const useDefaultPlayerIds = (): readonly string[] => {
  const { players: allPlayers } = useContext(PlayersContext);
  const { rounds } = useContext(GameContext);

  return last(rounds)?.playerIds ?? allPlayers.slice(0, 4).map(({ id }) => id);
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

const AddRoundModalImpl = ({ isOpened, onClose }: { isOpened: boolean; onClose: () => void }) => {
  const [StepComponent, next, back] = useStep();

  const [draftRound, updateDraftRound] = useDraftRound({
    ...DEFAULT_DRAFT_ROUND,
    playerIds: useDefaultPlayerIds(),
  });

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

export const AddRoundModal = ({
  isOpened,
  onClose,
}: {
  isOpened: boolean;
  onClose: () => void;
}) => {
  const [key, setKey] = useState(nanoid());
  return (
    <AddRoundModalImpl
      isOpened={isOpened}
      onClose={() => {
        onClose();
        setKey(nanoid());
      }}
      key={key}
    />
  );
};
