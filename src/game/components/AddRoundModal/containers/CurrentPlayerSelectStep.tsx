import { DialogContent, DialogTitle } from '@mui/material';
import { useContext } from 'react';
import { useT } from '../../../../locales/hooks/useT';
import { AddRoundModalContext } from '../AddRoundModal';
import { Actions } from '../components/Actions';
import { CurrentPlayersSelectStepContent } from './CurrentPlayerSelectStepContent';

export const CurrentPlayerSelectStep = () => {
  const t = useT();
  const { draftRound, next, close } = useContext(AddRoundModalContext);

  return (
    <>
      <DialogTitle>{t.addRound}</DialogTitle>
      <DialogContent>
        <CurrentPlayersSelectStepContent />
      </DialogContent>
      <Actions
        canBack={false}
        canNext={draftRound.playerIds.length === 4}
        nextText={t.next}
        onClose={close}
        onNext={next}
      />
    </>
  );
};
