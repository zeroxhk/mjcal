import { Button, Stack, Typography } from '@mui/material';
import { useT } from '../../locales/hooks/useT';
import { ScoringSettingsContainer } from '../../settings/containers/ScoringSettingsContainer';

export const ScoringSettingsStep = ({ onNext }: { onNext: () => void }) => {
  const t = useT();

  return (
    <Stack sx={{ gap: 3 }}>
      <Typography variant="h3" component="h1">
        {t.openTablePage.scoringSettings.heading}
      </Typography>
      <ScoringSettingsContainer />
      <Stack sx={{ alignSelf: 'flex-end', flexDirection: 'row', gap: 2 }}>
        <Button variant="contained" size="large" onClick={onNext}>
          {t.next}
        </Button>
      </Stack>
    </Stack>
  );
};
