import { useContext } from 'react';
import { PlayersContext } from '../../settings/contexts/PlayersContext';
import { AddRoundModal } from '../components/AddRoundModal/AddRoundModal';
import { GameContext } from '../contexts/GameContext';

export const AddRoundModalContainer = () => {
  const { players } = useContext(PlayersContext);
  const { addRound } = useContext(GameContext);
  return <AddRoundModal players={players} onAddRound={addRound} />;
};
