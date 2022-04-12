import { DialogContent, DialogTitle } from '@mui/material';
import { useCallback, useContext } from 'react';
import { useT } from '../../../../locales/hooks/useT';
import { GameContext } from '../../../contexts/GameContext';
import { createNotTiedRound } from '../../../models/Round';
import { AddRoundModalContext } from '../AddRoundModal';
import { Actions } from '../components/Actions';
import { LosersStepContent } from './LosersStepContent';

export const LosersStep = () => {
  const t = useT();
  const {
    selectedPlayerIds, //
    winnerId,
    loserIds,
    farn,
    isBao,
    isSelfTouch,
    back,
    close,
  } = useContext(AddRoundModalContext);
  const { addRound } = useContext(GameContext);

  return (
    <>
      <DialogTitle>{t.addRound}</DialogTitle>
      <DialogContent>
        <LosersStepContent />
      </DialogContent>
      <Actions
        canBack
        canNext={loserIds.length > 0}
        nextText={t.next}
        onNext={useCallback(() => {
          if (!winnerId) throw new Error('no winnerId found');
          addRound(
            createNotTiedRound({
              playerIds: selectedPlayerIds,
              winnerId,
              loserIds,
              farn,
              isBao,
              isSelfTouch,
            }),
          );
          close();
        }, [close, selectedPlayerIds, winnerId, loserIds, farn, isBao, isSelfTouch])}
        onBack={back}
        onClose={close}
      />
    </>
  );
};
