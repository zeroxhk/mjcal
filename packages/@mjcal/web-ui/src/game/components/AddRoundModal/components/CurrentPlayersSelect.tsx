import { FormControl, FormLabel, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useMemo } from 'react';
import { Player } from '../../../../game-settings/models/Player';
import { useT } from '../../../../locales/hooks/useT';

export const CurrentPlayersSelect = ({
  allPlayers,
  selectedPlayerIds,
  onSelectedPlayerIdsChange,
}: {
  allPlayers: readonly Player[];
  selectedPlayerIds: readonly string[];
  onSelectedPlayerIdsChange: (s: string[]) => void;
}) => {
  const selectedPlayerIdSet = useMemo(() => new Set(selectedPlayerIds), [selectedPlayerIds]);
  const t = useT();

  return (
    <FormControl fullWidth sx={{ mt: 1 }}>
      <FormLabel focused={false}>{t.addRoundModal.currentPlayersSelectTitle}</FormLabel>
      <ToggleButtonGroup
        color="primary"
        value={selectedPlayerIds}
        onChange={(_, newSelectedPlayerIds: string[]) =>
          onSelectedPlayerIdsChange(newSelectedPlayerIds)
        }
        fullWidth
        orientation="vertical"
      >
        {allPlayers.map(({ id, name }) => (
          <ToggleButton
            disabled={!selectedPlayerIdSet.has(id) && selectedPlayerIds.length >= 4}
            value={id}
            key={id}
          >
            {name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </FormControl>
  );
};
