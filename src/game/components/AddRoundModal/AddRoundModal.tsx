import { Dialog } from '@mui/material';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { PlayersContext } from '../../../settings/contexts/PlayersContext';
import { CurrentPlayerSelectStep } from './containers/CurrentPlayerSelectStep';
import { LosersStep } from './containers/LosersStep';
import { WinnerStep } from './containers/WinnerStep';

const STEP_COUNT = 3;

export const AddRoundModalContext = createContext({
  selectedPlayerIds: [] as string[],
  setSelectedPlayerIds: (_ids: string[]) => {},
  farn: 3,
  setFarn: (_farn: number) => {},
  winnerId: undefined as undefined | string,
  setWinnerId: (_ids: undefined | string) => {},
  loserIds: [] as string[],
  setLoserIds: (_ids: string[]) => {},
  isBao: false,
  setIsBao: (_bao: boolean) => {},
  isSelfTouch: false,
  setIsSelfTouch: (_st: boolean) => {},
  next: () => {},
  back: () => {},
  close: () => {},
});

const DEFAULT_STATE = {
  step: 0,
  farn: 3,
  winnerId: undefined,
  loserIds: [] as string[],
  isBao: false,
  isSelfTouch: false,
} as const;

export const AddRoundModal = ({
  TriggerComponent,
}: {
  TriggerComponent: ({ onOpenModal }: { onOpenModal: () => void }) => JSX.Element;
}) => {
  const { players: allPlayers } = useContext(PlayersContext);

  const [open, setOpen] = useState(false);
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<string[]>(
    allPlayers.slice(0, 4).map(({ id }) => id),
  );

  const [step, setStep] = useState<number>(DEFAULT_STATE.step);
  const [farn, setFarn] = useState<number>(DEFAULT_STATE.farn);
  const [winnerId, setWinnerId] = useState<string | undefined>(DEFAULT_STATE.winnerId);
  const [loserIds, setLoserIds] = useState<string[]>(DEFAULT_STATE.loserIds);
  const [isBao, setIsBao] = useState<boolean>(DEFAULT_STATE.isBao);
  const [isSelfTouch, setIsSelfTouch] = useState<boolean>(DEFAULT_STATE.isSelfTouch);

  useEffect(() => {
    if (!open) return;
    setStep(DEFAULT_STATE.step);
    setFarn(DEFAULT_STATE.farn);
    setWinnerId(DEFAULT_STATE.winnerId);
    setLoserIds(DEFAULT_STATE.loserIds);
    setIsBao(DEFAULT_STATE.isBao);
    setIsSelfTouch(DEFAULT_STATE.isSelfTouch);
  }, [open]);

  return (
    <>
      <TriggerComponent onOpenModal={() => setOpen(true)} />
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <AddRoundModalContext.Provider
          value={{
            selectedPlayerIds,
            setSelectedPlayerIds,
            farn,
            setFarn,
            winnerId,
            setWinnerId,
            loserIds,
            setLoserIds,
            isBao,
            setIsBao,
            isSelfTouch,
            setIsSelfTouch,
            next: useCallback(() => setStep(Math.min(step + 1, STEP_COUNT - 1)), [step]),
            back: useCallback(() => setStep(Math.max(step - 1, 0)), [step]),
            close: useCallback(() => setOpen(false), []),
          }}
        >
          {[() => <CurrentPlayerSelectStep />, () => <WinnerStep />, () => <LosersStep />][
            step
          ]?.()}
        </AddRoundModalContext.Provider>
      </Dialog>
    </>
  );
};
