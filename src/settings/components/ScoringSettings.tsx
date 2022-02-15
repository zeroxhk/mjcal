import { FormControl, FormLabel, Input, Paper, SxProps, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { ScoringSettings as Settings } from '../models/ScoringSettings';

export const ScoringSettings = ({
  settings,
  onSetSettings,
  sx,
}: {
  settings: Settings;
  onSetSettings: (s: Settings) => void;
  sx?: SxProps;
}) => {
  return (
    <Paper sx={{ flexGrow: 1, display: 'flex', gap: 2, flexDirection: 'column', padding: 2, ...sx }}>
      <FormControl>
        <FormLabel sx={{ mb: 1 }}>Chung Jai</FormLabel>
        <ToggleButtonGroup
          value={settings.chungJai}
          exclusive
          onChange={(_, chungJai: Settings['chungJai']) => chungJai && onSetSettings({ ...settings, chungJai })}
          fullWidth
        >
          <ToggleButton value="half">Half</ToggleButton>
          <ToggleButton value="full">Full</ToggleButton>
        </ToggleButtonGroup>
      </FormControl>

      <FormControl>
        <FormLabel sx={{ mb: 1 }}>Chips Value</FormLabel>
        <ToggleButtonGroup
          value={settings.chipValue}
          exclusive
          onChange={(_, chipValue: Settings['chipValue']) => chipValue && onSetSettings({ ...settings, chipValue })}
          fullWidth
        >
          <ToggleButton value="25chicken">25chicken</ToggleButton>
          <ToggleButton value="51">51</ToggleButton>
          <ToggleButton value="12mosquitoes">12mosquitoes</ToggleButton>
        </ToggleButtonGroup>
      </FormControl>

      <FormControl>
        <FormLabel sx={{ mb: 1 }}>Half Spicy From</FormLabel>
        <ToggleButtonGroup
          value={settings.halfSpicyFrom}
          exclusive
          onChange={(_, halfSpicyFrom: Settings['halfSpicyFrom']) =>
            halfSpicyFrom && onSetSettings({ ...settings, halfSpicyFrom })
          }
          fullWidth
          sx={{ mb: 1 }}
        >
          <ToggleButton value="never">Never</ToggleButton>
          <ToggleButton value={4}>4</ToggleButton>
        </ToggleButtonGroup>
        <Input
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]{2}',
          }}
          value={['never', 4].includes(settings.halfSpicyFrom) ? '' : settings.halfSpicyFrom}
          onChange={event => onSetSettings({ ...settings, halfSpicyFrom: Number.parseInt(event.target.value) || 4 })}
          placeholder="custom value"
          sx={{ alignSelf: 'flex-start', pt: 1, pl: 1, pr: 1 }}
        />
      </FormControl>
    </Paper>
  );
};
