import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useContext, useEffect, useMemo } from 'react';
import { useLocale } from '../../../../locales/hooks/useLocale';
import { AddRoundModalContext } from '../AddRoundModal';
import { LoserButtonGroup } from '../components/LoserButtonGroup';

export const LosersStep = () => {
  const { t } = useLocale();
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
  useEffect(() => setLoserIds(isSelfTouch && !isBao ? potentialLosers.map(({ id }) => id) : []), [isSelfTouch, isBao]);
  useEffect(() => setCanNext(loserIds.length > 0), [loserIds]);

  return (
    <>
      {isSelfTouch && (
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={isBao} onChange={(_, bao) => setIsBao(bao)} />}
            label={`${t.isBao} 🍞`}
          />
        </FormGroup>
      )}

      <LoserButtonGroup
        loserIds={loserIds}
        disabled={isSelfTouch && !isBao}
        onLoserIdsChange={setLoserIds}
        players={potentialLosers}
      />
    </>
  );
};
