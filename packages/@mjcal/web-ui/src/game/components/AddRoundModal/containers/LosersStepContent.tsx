import { Checkbox, FormControlLabel, FormGroup, Stack } from '@mui/material';
import { without } from 'ramda';
import { useContext, useEffect, useMemo } from 'react';
import { PlayersContext } from '../../../../game-settings/contexts/PlayersContext';
import { useT } from '../../../../locales/hooks/useT';
import { LoserButtonGroup } from '../components/LoserButtonGroup';
import { AddRoundModalContext } from '../contexts/AddRoundModalContext';

const usePotentialLoserIds = (): readonly string[] => {
  const { draftRound } = useContext(AddRoundModalContext);
  return useMemo(() => {
    if (!draftRound.winnerId) throw new Error('draftRound.winnerId is undefined');
    return without([draftRound.winnerId], draftRound.playerIds);
  }, [draftRound.playerIds, draftRound.winnerId]);
};

const useIsBao = (): readonly [isBao: boolean, setIsBao: (isBao: boolean) => void] => {
  const { draftRound, updateDraftRound } = useContext(AddRoundModalContext);
  const potentialLoserIds = usePotentialLoserIds();
  return [
    useMemo(() => draftRound.loserIds.length !== 3, [draftRound.loserIds]),
    isBao => updateDraftRound({ loserIds: isBao ? [] : potentialLoserIds }),
  ];
};

export const LosersStepContent = () => {
  const t = useT();
  const { draftRound, updateDraftRound } = useContext(AddRoundModalContext);
  const { getPlayerById } = useContext(PlayersContext);

  const potentialLoserIds = usePotentialLoserIds();

  useEffect(() => {
    if (!draftRound.isSelfTouch) return;
    updateDraftRound({ loserIds: potentialLoserIds });
  }, [draftRound.isSelfTouch, updateDraftRound, potentialLoserIds]);

  const [isBao, setIsBao] = useIsBao();

  return (
    <Stack gap={2}>
      <LoserButtonGroup
        loserIds={draftRound.loserIds}
        disabled={draftRound.isSelfTouch && !isBao}
        onLoserIdsChange={loserIds => updateDraftRound({ loserIds })}
        players={potentialLoserIds.map(getPlayerById)}
      />

      {draftRound.isSelfTouch && (
        <FormGroup sx={{ ml: 'auto' }}>
          <FormControlLabel
            control={<Checkbox checked={isBao} onChange={(_, isBao) => setIsBao(isBao)} />}
            label={`${t.isBao} 🍞`}
          />
        </FormGroup>
      )}
    </Stack>
  );
};
