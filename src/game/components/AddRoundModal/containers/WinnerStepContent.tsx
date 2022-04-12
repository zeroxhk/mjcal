import { Checkbox, FormControlLabel, Stack } from '@mui/material';
import { useCallback, useContext } from 'react';
import { useT } from '../../../../locales/hooks/useT';
import { PlayersContext } from '../../../../settings/contexts/PlayersContext';
import { AddRoundModalContext } from '../AddRoundModal';
import { FarnInput } from '../components/FarnInput';
import { WinnerSelect } from '../components/WinnerSelect';

export const WinnerStepContent = () => {
  const t = useT();
  const { draftRound, updateDraftRound } = useContext(AddRoundModalContext);
  const { getPlayerById } = useContext(PlayersContext);

  return (
    <Stack gap={2}>
      <WinnerSelect
        players={draftRound.playerIds.map(getPlayerById)}
        winnerId={draftRound.winnerId}
        onWinnerIdChange={useCallback(
          winnerId => updateDraftRound({ winnerId }),
          [updateDraftRound],
        )}
      />
      <Stack direction="row-reverse" justifyContent="flex-start" flexWrap="wrap" gap={2}>
        <FarnInput
          farn={draftRound.farn}
          onFarnChange={useCallback(farn => updateDraftRound({ farn }), [updateDraftRound])}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={draftRound.isSelfTouch}
              onChange={useCallback(
                (_, isSelfTouch) => updateDraftRound({ isSelfTouch }),
                [updateDraftRound],
              )}
            />
          }
          label={`${t.isSelfTouch} 🤏`}
        />
      </Stack>
    </Stack>
  );
};
