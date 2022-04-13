import { Checkbox, FormControlLabel, FormGroup, Stack } from '@mui/material';
import { without } from 'ramda';
import { useContext, useMemo } from 'react';
import { useT } from '../../../../locales/hooks/useT';
import { PlayersContext } from '../../../../settings/contexts/PlayersContext';
import { AddRoundModalContext } from '../AddRoundModal';
import { LoserButtonGroup } from '../components/LoserButtonGroup';

export const LosersStepContent = () => {
  const t = useT();
  const { draftRound, updateDraftRound } = useContext(AddRoundModalContext);
  const { getPlayerById } = useContext(PlayersContext);

  const potentialLoserIds = useMemo(() => {
    if (!draftRound.winnerId) throw new Error('draftRound.winnerId is undefined');
    return without([draftRound.winnerId], draftRound.playerIds);
  }, [draftRound.playerIds, draftRound.winnerId]);

  const isBao = useMemo(() => draftRound.loserIds.length === 3, [draftRound.loserIds]);

  return (
    <Stack gap={2}>
      <LoserButtonGroup
        loserIds={draftRound.loserIds}
        disabled={draftRound.isSelfTouch && isBao}
        onLoserIdsChange={loserIds => updateDraftRound({ loserIds })}
        players={potentialLoserIds.map(getPlayerById)}
      />

      {draftRound.isSelfTouch && (
        <FormGroup sx={{ ml: 'auto' }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isBao}
                onChange={(_, isBao) => {
                  if (!draftRound.winnerId) {
                    throw new Error('winnerId is undefined');
                  }

                  updateDraftRound({
                    loserIds: isBao ? potentialLoserIds : [],
                  });
                }}
              />
            }
            label={`${t.isBao} 🍞`}
          />
        </FormGroup>
      )}
    </Stack>
  );
};
