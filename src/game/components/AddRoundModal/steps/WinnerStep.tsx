import { Checkbox, FormControlLabel } from '@mui/material';
import { useContext, useEffect } from 'react';
import { AddRoundModalContext } from '../AddRoundModal';
import { FarnSlider } from '../components/FarnSlider';
import { WinnerButtonGroup } from '../components/WinnerButtonGroup';

export const WinnerStep = () => {
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
    <>
      <WinnerButtonGroup players={selectedPlayers} winnerId={winnerId} onWinnerIdChange={setWinnerId} />
      <FarnSlider farn={farn} onFarnChange={setFarn} />
      <FormControlLabel
        control={<Checkbox checked={isSelfTouch} onChange={(_, selfTouch) => setIsSelfTouch(selfTouch)} />}
        label="Is self-touch? 🤏"
      />
    </>
  );
};
