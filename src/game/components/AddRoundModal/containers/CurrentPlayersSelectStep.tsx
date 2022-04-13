import { DialogContent, DialogTitle } from '@mui/material';
import { useContext } from 'react';
import { useT } from '../../../../locales/hooks/useT';
import { AddRoundModalContext } from '../AddRoundModal';
import { Actions } from '../components/Actions';
import { CurrentPlayersSelectContainer } from './CurrentPlayersSelectContainer';

export const CurrentPlayersSelectStep = () => {
  const t = useT();
  const { draftRound, next, close } = useContext(AddRoundModalContext);

  return (
    <>
      <DialogTitle>{t.addRound}</DialogTitle>
      <DialogContent>
        <CurrentPlayersSelectContainer />
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
