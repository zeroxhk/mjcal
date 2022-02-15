import { Container } from '@mui/material';
import { useContext } from 'react';
import { PlayerList } from '../components/PlayerList';
import { ScoringSettings } from '../components/ScoringSettings';
import { PlayersContext } from '../contexts/PlayersContext';
import { ScoringSettingsContext } from '../contexts/ScoringSettingsContext';

export const SettingsPage = () => {
  const { players, setPlayers } = useContext(PlayersContext);
  const { settings, setSettings } = useContext(ScoringSettingsContext);
  return (
    <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <PlayerList players={players} onSetPlayers={newPlayers => setPlayers(newPlayers)} />
      <ScoringSettings settings={settings} onSetSettings={setSettings} />
    </Container>
  );
};
