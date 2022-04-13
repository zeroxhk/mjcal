import { DialogContent, DialogTitle } from '@mui/material';
import { useCallback, useContext } from 'react';
import { useT } from '../../../../locales/hooks/useT';
import { GameContext } from '../../../contexts/GameContext';
import { createRound, Round } from '../../../models/Round';
import { AddRoundModalContext } from '../AddRoundModal';
import { Actions } from '../components/Actions';
import { DraftRound } from '../models/DraftRound';
import { LosersStepContent } from './LosersStepContent';

export const createRoundFromDraft = (draftRound: DraftRound): Round => {
  if (draftRound.playerIds.length !== 4) throw new Error('playerIds.length is not 4');
  if (!draftRound.winnerId) throw new Error('no winnerId');

  return createRound({
    ...draftRound,
    isTied: false,
    playerIds: draftRound.playerIds as [string, string, string, string],
    winnerId: draftRound.winnerId!,
  });
};

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
        onNext={useCallback(() => {
          addRound(createRoundFromDraft(draftRound));
          close();
        }, [close, draftRound])}
        onBack={back}
        onClose={close}
      />
    </>
  );
};
