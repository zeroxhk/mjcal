import { FormLabel, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useT } from '../../../../locales/hooks/useT';
import { Player } from '../../../../settings/models/Player';

export const WinnerSelect = ({
  players,
  winnerId,
  onWinnerIdChange,
}: {
  players: Player[];
  winnerId: string | undefined;
  onWinnerIdChange: (p: string) => void;
}) => {
  const t = useT();
  return (
    <Stack>
      <FormLabel>{t.winner}</FormLabel>
      <ToggleButtonGroup
        orientation="vertical"
        color="primary"
        value={winnerId}
        exclusive
        onChange={(_, v) => {
          if (!players.map(({ id }) => id).includes(v)) return;
          onWinnerIdChange(v);
        }}
        fullWidth
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
