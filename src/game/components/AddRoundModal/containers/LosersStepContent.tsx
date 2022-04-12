import { Checkbox, FormControlLabel, FormGroup, Stack } from '@mui/material';
import { useContext, useEffect, useMemo } from 'react';
import { useT } from '../../../../locales/hooks/useT';
import { PlayersContext } from '../../../../settings/contexts/PlayersContext';
import { AddRoundModalContext } from '../AddRoundModal';
import { LoserButtonGroup } from '../components/LoserButtonGroup';

export const LosersStepContent = () => {
  const t = useT();
  const {
    selectedPlayerIds, //
    winnerId,
    loserIds,
    setLoserIds,
    isSelfTouch,
    isBao,
    setIsBao,
  } = useContext(AddRoundModalContext);

  const { getPlayerById } = useContext(PlayersContext);

  const potentialLoserIds = useMemo(
    () => selectedPlayerIds.filter(id => id !== winnerId),
    [selectedPlayerIds, winnerId],
  );

  useEffect(() => setIsBao(isSelfTouch && isBao), [isSelfTouch, isBao]);
  useEffect(
    () => setLoserIds(isSelfTouch && !isBao ? potentialLoserIds : []),
    [isSelfTouch, isBao],
  );

  return (
    <Stack gap={2}>
      <LoserButtonGroup
        loserIds={loserIds}
        disabled={isSelfTouch && !isBao}
        onLoserIdsChange={setLoserIds}
        players={potentialLoserIds.map(getPlayerById)}
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
