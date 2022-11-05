import { Container } from '@mui/material';
import { PlayerListContainer } from './PlayerListContainer';
import { ScoringSettingsContainer } from './ScoringSettingsContainer';

export const SettingsPage = () => {
  return (
    <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <PlayerListContainer />
      <ScoringSettingsContainer />
    </Container>
  );
};
