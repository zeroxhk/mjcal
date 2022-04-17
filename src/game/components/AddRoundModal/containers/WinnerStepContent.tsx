import { Checkbox, FormControlLabel, Stack } from '@mui/material';
import { useContext } from 'react';
import { PlayersContext } from '../../../../game-settings/contexts/PlayersContext';
import { useT } from '../../../../locales/hooks/useT';
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
        onWinnerIdChange={winnerId => updateDraftRound({ winnerId })}
      />
      <Stack direction="row-reverse" justifyContent="flex-start" flexWrap="wrap" gap={2}>
        <FarnInput farn={draftRound.farn} onFarnChange={farn => updateDraftRound({ farn })} />
        <FormControlLabel
          control={
            <Checkbox
              checked={draftRound.isSelfTouch}
              onChange={(_, isSelfTouch) => updateDraftRound({ isSelfTouch })}
            />
          }
          label={`${t.isSelfTouch} 🤏`}
        />
      </Stack>
    </Stack>
  );
};
