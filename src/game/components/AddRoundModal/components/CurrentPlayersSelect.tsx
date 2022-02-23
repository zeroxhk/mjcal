import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { useMemo } from 'react';
import { useT } from '../../../../locales/hooks/useT';
import { Player } from '../../../../settings/models/Player';

export const CurrentPlayersSelect = ({
  allPlayers,
  selectedPlayerIds,
  onSelectedPlayerIdsChange,
}: {
  allPlayers: Player[];
  selectedPlayerIds: string[];
  onSelectedPlayerIdsChange: (s: string[]) => void;
}) => {
  const selectedPlayerIdSet = useMemo(() => new Set(selectedPlayerIds), [selectedPlayerIds]);
  const playerIdToPlayerMap = useMemo(() => new Map(allPlayers.map(player => [player.id, player])), [allPlayers]);
  const t = useT();

  return (
    <FormControl fullWidth sx={{ mt: 1 }}>
      <InputLabel>{t.players}</InputLabel>
      <Select
        multiple
        value={selectedPlayerIds}
        onChange={event => {
          const newIds = typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value;
          if (newIds.length > 4) return;
          onSelectedPlayerIdsChange(newIds);
        }}
        input={<OutlinedInput label={t.player} />}
        renderValue={selectedPlayerIds => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selectedPlayerIds.map(id => (
              <Chip key={id} label={playerIdToPlayerMap.get(id)?.name || 'error: cannot find player'} />
            ))}
          </Box>
        )}
      >
        {allPlayers.map(({ id, name }) => (
          <MenuItem
            key={id}
            value={id}
            sx={({ typography }) => ({
              fontWeight: selectedPlayerIdSet.has(id) ? typography.fontWeightMedium : typography.fontWeightRegular,
            })}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
