import { Checkbox, FormControlLabel, Stack } from '@mui/material';
import { useContext, useEffect } from 'react';
import { useT } from '../../../../locales/hooks/useT';
import { AddRoundModalContext } from '../AddRoundModal';
import { FarnInput } from '../components/FarnInput';
import { WinnerSelect } from '../components/WinnerSelect';

export const WinnerStep = () => {
  const t = useT();
  const {
    selectedPlayers, //
    winnerId,
    setWinnerId,
    farn,
    setFarn,
    isSelfTouch,
    setIsSelfTouch,
    setCanNext,
  } = useContext(AddRoundModalContext);

  useEffect(() => setCanNext(!!winnerId), [winnerId]);

  return (
    <Stack gap={2}>
      <WinnerSelect players={selectedPlayers} winnerId={winnerId} onWinnerIdChange={setWinnerId} />
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
