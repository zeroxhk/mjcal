import { Checkbox, FormControlLabel, Stack } from '@mui/material';
import { useContext } from 'react';
import { useT } from '../../../../locales/hooks/useT';
import { PlayersContext } from '../../../../settings/contexts/PlayersContext';
import { AddRoundModalContext } from '../AddRoundModal';
import { FarnInput } from '../components/FarnInput';
import { WinnerSelect } from '../components/WinnerSelect';

export const WinnerStepContent = () => {
  const t = useT();
  const {
    selectedPlayerIds, //
    winnerId,
    setWinnerId,
    farn,
    setFarn,
    isSelfTouch,
    setIsSelfTouch,
  } = useContext(AddRoundModalContext);
  const { getPlayerById } = useContext(PlayersContext);

  return (
    <Stack gap={2}>
      <WinnerSelect
        players={selectedPlayerIds.map(getPlayerById)}
        winnerId={winnerId}
        onWinnerIdChange={setWinnerId}
      />
      <Stack direction="row-reverse" justifyContent="flex-start" flexWrap="wrap" gap={2}>
        <FarnInput farn={farn} onFarnChange={setFarn} />
        <FormControlLabel
          control={
            <Checkbox
              checked={isSelfTouch}
              onChange={(_, selfTouch) => setIsSelfTouch(selfTouch)}
            />
          }
          label={`${t.isSelfTouch} 🤏`}
        />
      </Stack>
    </Stack>
  );
};
