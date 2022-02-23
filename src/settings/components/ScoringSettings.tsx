import { FormControl, FormLabel, Input, Paper, SxProps, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useT } from '../../locales/hooks/useT';
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
  const t = useT();
  return (
    <Paper sx={{ flexGrow: 1, display: 'flex', gap: 2, flexDirection: 'column', padding: 2, ...sx }}>
      <FormControl>
        <FormLabel sx={{ mb: 1 }}>{t.chungJai}</FormLabel>
        <ToggleButtonGroup
          value={settings.chungJai}
          exclusive
          onChange={(_, chungJai: Settings['chungJai']) => chungJai && onSetSettings({ ...settings, chungJai })}
          fullWidth
        >
          <ToggleButton value="half">{t.chungJais.half}</ToggleButton>
          <ToggleButton value="full">{t.chungJais.full}</ToggleButton>
        </ToggleButtonGroup>
      </FormControl>

      <FormControl>
        <FormLabel sx={{ mb: 1 }}>{t.chipValue}</FormLabel>
        <ToggleButtonGroup
          value={settings.chipValue}
          exclusive
          onChange={(_, chipValue: Settings['chipValue']) => chipValue && onSetSettings({ ...settings, chipValue })}
          fullWidth
        >
          <ToggleButton value="25chicken">{t.chipValues.c25chicken}</ToggleButton>
          <ToggleButton value="51">{t.chipValues.c25chicken}</ToggleButton>
          <ToggleButton value="12mosquitoes">{t.chipValues.c12mosquitoes}</ToggleButton>
        </ToggleButtonGroup>
      </FormControl>

      <FormControl>
        <FormLabel sx={{ mb: 1 }}>{t.halfSpicyFrom}</FormLabel>
        <ToggleButtonGroup
          value={settings.halfSpicyFrom}
          exclusive
          onChange={(_, halfSpicyFrom: Settings['halfSpicyFrom']) =>
            halfSpicyFrom && onSetSettings({ ...settings, halfSpicyFrom })
          }
          fullWidth
          sx={{ mb: 1 }}
        >
          <ToggleButton value="never">{t.halfSpicyFroms.never}</ToggleButton>
          <ToggleButton value={4}>4</ToggleButton>
        </ToggleButtonGroup>
        <Input
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]{2}',
          }}
          value={['never', 4].includes(settings.halfSpicyFrom) ? '' : settings.halfSpicyFrom}
          onChange={event => onSetSettings({ ...settings, halfSpicyFrom: Number.parseInt(event.target.value) || 4 })}
          placeholder={t.halfSpicyFroms.customPlaceholder}
          sx={{ alignSelf: 'flex-start', pt: 1, pl: 1, pr: 1 }}
        />
      </FormControl>
    </Paper>
  );
};
