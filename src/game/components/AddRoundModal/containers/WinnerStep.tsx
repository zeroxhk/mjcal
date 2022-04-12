import { DialogContent, DialogTitle } from '@mui/material';
import { useContext } from 'react';
import { useT } from '../../../../locales/hooks/useT';
import { AddRoundModalContext } from '../AddRoundModal';
import { Actions } from '../components/Actions';
import { WinnerStepContent } from './WinnerStepContent';

export const WinnerStep = () => {
  const t = useT();
  const { winnerId, next, back, close } = useContext(AddRoundModalContext);

  return (
    <>
      <DialogTitle>{t.addRound}</DialogTitle>
      <DialogContent>
        <WinnerStepContent />
      </DialogContent>
      <Actions
        canBack
        canNext={!!winnerId}
        nextText={t.next}
        onNext={next}
        onBack={back}
        onClose={close}
      />
    </>
  );
};
