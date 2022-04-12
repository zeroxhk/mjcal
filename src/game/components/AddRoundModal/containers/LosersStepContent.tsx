import { Checkbox, FormControlLabel, FormGroup, Stack } from '@mui/material';
import { useCallback, useContext, useEffect, useMemo } from 'react';
import { useT } from '../../../../locales/hooks/useT';
import { PlayersContext } from '../../../../settings/contexts/PlayersContext';
import { AddRoundModalContext } from '../AddRoundModal';
import { LoserButtonGroup } from '../components/LoserButtonGroup';

export const LosersStepContent = () => {
  const t = useT();
  const { draftRound, updateDraftRound } = useContext(AddRoundModalContext);
  const { getPlayerById } = useContext(PlayersContext);

  const potentialLoserIds = useMemo(
    () => draftRound.playerIds.filter(id => id !== draftRound.winnerId),
    [draftRound.playerIds, draftRound.winnerId],
  );

  useEffect(
    () => updateDraftRound({ isBao: draftRound.isSelfTouch && draftRound.isBao }),
    [draftRound.isSelfTouch, draftRound.isBao],
  );

  useEffect(
    () =>
      updateDraftRound({
        loserIds: draftRound.isSelfTouch && !draftRound.isBao ? potentialLoserIds : [],
      }),
    [draftRound.isSelfTouch, draftRound.isBao, potentialLoserIds],
  );

  return (
    <Stack gap={2}>
      <LoserButtonGroup
        loserIds={draftRound.loserIds}
        disabled={draftRound.isSelfTouch && !draftRound.isBao}
        onLoserIdsChange={useCallback(
          loserIds => updateDraftRound({ loserIds }),
          [updateDraftRound],
        )}
        players={potentialLoserIds.map(getPlayerById)}
      />

      {draftRound.isSelfTouch && (
        <FormGroup sx={{ ml: 'auto' }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={draftRound.isBao}
                onChange={useCallback(
                  (_, isBao) => updateDraftRound({ isBao }),
                  [updateDraftRound],
                )}
              />
            }
            label={`${t.isBao} 🍞`}
          />
        </FormGroup>
      )}
    </Stack>
  );
};
