import { useContext } from 'react';
import { PlayerList } from '../components/PlayerList';
import { PlayersContext } from '../contexts/PlayersContext';

export const PlayerListContainer = () => {
  const { players, setPlayers } = useContext(PlayersContext);
  return <PlayerList players={players} onSetPlayers={newPlayers => setPlayers(newPlayers)} />;
};
