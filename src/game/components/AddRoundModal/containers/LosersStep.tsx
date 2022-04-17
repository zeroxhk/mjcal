import { DialogContent, DialogTitle } from '@mui/material';
import { useContext } from 'react';
import { useT } from '../../../../locales/hooks/useT';
import { GameContext } from '../../../contexts/GameContext';
import { AddRoundModalContext } from '../AddRoundModal';
import { Actions } from '../components/Actions';
import { createRoundFromDraft } from '../models/DraftRound';
import { LosersStepContent } from './LosersStepContent';

export const LosersStep = () => {
  const t = useT();
  const { draftRound, back, close } = useContext(AddRoundModalContext);
  const { addRound } = useContext(GameContext);

  return (
    <>
      <DialogTitle>{t.addRound}</DialogTitle>
      <DialogContent>
        <LosersStepContent />
      </DialogContent>
      <Actions
        canBack
        canNext={draftRound.loserIds.length > 0}
        nextText={t.next}
        onNext={() => {
          addRound(createRoundFromDraft(draftRound));
          close();
        }}
        onBack={back}
        onClose={close}
      />
    </>
  );
};
