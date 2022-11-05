import { Dialog } from '@mui/material';
import { nanoid } from 'nanoid';
import { last } from 'ramda';
import { useCallback, useContext, useMemo, useState } from 'react';
import { PlayersContext } from '../../../game-settings/contexts/PlayersContext';
import { GameContext } from '../../contexts/GameContext';
import { CurrentPlayersSelectStep } from './containers/CurrentPlayersSelectStep';
import { LosersStep } from './containers/LosersStep';
import { WinnerStep } from './containers/WinnerStep';
import { AddRoundModalContextProvider } from './contexts/AddRoundModalContext';
import { createDefaultDraftRound } from './models/DraftRound';

const STEPS = [CurrentPlayersSelectStep, WinnerStep, LosersStep] as const;

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

const AddRoundModalImpl = ({ isOpened, onClose }: { isOpened: boolean; onClose: () => void }) => {
  const [StepComponent, next, back] = useStep();

  return (
    <Dialog open={isOpened} onClose={onClose} fullWidth>
      <AddRoundModalContextProvider
        initial={{
          draftRound: createDefaultDraftRound({
            playerIds: useDefaultPlayerIds(),
          }),
        }}
        next={next}
        back={back}
        close={onClose}
      >
        <StepComponent />
      </AddRoundModalContextProvider>
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
