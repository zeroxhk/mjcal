import {
  Checkbox,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Stack,
} from '@mui/material';
import { useContext, useState } from 'react';
import { useT } from '../../../../locales/hooks/useT';
import { GameContext } from '../../../contexts/GameContext';
import { AddRoundModalContext } from '../AddRoundModal';
import { Actions } from '../components/Actions';
import { CurrentPlayersSelectContainer } from './CurrentPlayersSelectContainer';

export const CurrentPlayersSelectStep = () => {
  const t = useT();
  const { draftRound, next, close } = useContext(AddRoundModalContext);
  const { addRound } = useContext(GameContext);
  const [isTied, setIsTied] = useState(false);

  return (
    <>
      <DialogTitle>{t.addRound}</DialogTitle>
      <DialogContent>
        <Stack gap={2}>
          <CurrentPlayersSelectContainer />
          <FormGroup sx={{ ml: 'auto' }}>
            <FormControlLabel
              control={<Checkbox checked={isTied} onChange={(_, isTied) => setIsTied(isTied)} />}
              label={`${t.isTieGuk} 😮‍💨`}
            />
          </FormGroup>
        </Stack>
      </DialogContent>
      <Actions
        canBack={false}
        canNext={draftRound.playerIds.length === 4}
        nextText={isTied ? t.done : t.next}
        onClose={close}
        onNext={() => {
          if (!isTied) return next();
          addRound({ isTied: true });
          close();
        }}
      />
    </>
  );
};
