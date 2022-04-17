import {
  Checkbox,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Stack,
} from '@mui/material';
import { useContext } from 'react';
import { useT } from '../../../../locales/hooks/useT';
import { GameContext } from '../../../contexts/GameContext';
import { AddRoundModalContext } from '../AddRoundModal';
import { Actions } from '../components/Actions';
import { createRoundFromDraft } from '../models/DraftRound';
import { CurrentPlayersSelectContainer } from './CurrentPlayersSelectContainer';

export const CurrentPlayersSelectStep = () => {
  const t = useT();
  const { draftRound, next, close, updateDraftRound } = useContext(AddRoundModalContext);
  const { addRound } = useContext(GameContext);

  return (
    <>
      <DialogTitle>{t.addRound}</DialogTitle>
      <DialogContent>
        <Stack gap={2}>
          <CurrentPlayersSelectContainer />
          <FormGroup sx={{ ml: 'auto' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={draftRound.isTied}
                  onChange={(_, isTied) => updateDraftRound({ isTied })}
                />
              }
              label={`${t.isTieGuk} 😮‍💨`}
            />
          </FormGroup>
        </Stack>
      </DialogContent>
      {(({ nextText, onNext }) => (
        <Actions
          canBack={false}
          canNext={draftRound.playerIds.length === 4}
          nextText={nextText}
          onClose={close}
          onNext={onNext}
        />
      ))(
        draftRound.isTied
          ? {
              nextText: t.done,
              onNext: () => {
                addRound(createRoundFromDraft(draftRound));
                close();
              },
            }
          : {
              nextText: t.next,
              onNext: next,
            },
      )}
    </>
  );
};
