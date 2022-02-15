import { FormLabel, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Player } from '../../../../settings/models/Player';

export const LoserButtonGroup = ({
  players,
  loserIds,
  onLoserIdsChange,
  disabled,
}: {
  players: Player[];
  loserIds: string[];
  onLoserIdsChange: (loserIds: string[]) => void;
  disabled: boolean;
}) => {
  return (
    <Stack>
      <FormLabel>Loser(s)</FormLabel>
      <ToggleButtonGroup
        color="primary"
        value={loserIds}
        onChange={(_, newLoser: string) => onLoserIdsChange([newLoser])}
        exclusive
        fullWidth
        disabled={disabled}
      >
        {players.map(({ id, name }) => (
          <ToggleButton value={id} key={id}>
            {name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
};
