import { Checkbox, FormControlLabel, FormGroup, Stack } from '@mui/material';
import { useContext, useEffect, useMemo } from 'react';
import { useT } from '../../../../locales/hooks/useT';
import { AddRoundModalContext } from '../AddRoundModal';
import { LoserButtonGroup } from '../components/LoserButtonGroup';

export const LosersStep = () => {
  const t = useT();
  const {
    selectedPlayers, //
    winnerId,
    loserIds,
    setLoserIds,
    isSelfTouch,
    isBao,
    setIsBao,
    setCanNext,
  } = useContext(AddRoundModalContext);

  const potentialLosers = useMemo(
    () => selectedPlayers.filter(({ id }) => id !== winnerId),
    [selectedPlayers, winnerId],
  );

  useEffect(() => setIsBao(isSelfTouch && isBao), [isSelfTouch, isBao]);
  useEffect(
    () => setLoserIds(isSelfTouch && !isBao ? potentialLosers.map(({ id }) => id) : []),
    [isSelfTouch, isBao],
  );
  useEffect(() => setCanNext(loserIds.length > 0), [loserIds]);

  return (
    <Stack gap={2}>
      <LoserButtonGroup
        loserIds={loserIds}
        disabled={isSelfTouch && !isBao}
        onLoserIdsChange={setLoserIds}
        players={potentialLosers}
      />

      {isSelfTouch && (
        <FormGroup sx={{ ml: 'auto' }}>
          <FormControlLabel
            control={<Checkbox checked={isBao} onChange={(_, bao) => setIsBao(bao)} />}
            label={`${t.isBao} 🍞`}
          />
        </FormGroup>
      )}
    </Stack>
  );
};
