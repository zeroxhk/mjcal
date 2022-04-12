import { useContext } from 'react';
import { PlayersContext } from '../../../../settings/contexts/PlayersContext';
import { AddRoundModalContext } from '../AddRoundModal';
import { CurrentPlayersSelect } from '../components/CurrentPlayersSelect';

export const CurrentPlayersSelectStepContent = () => {
  const { selectedPlayerIds, setSelectedPlayerIds } = useContext(AddRoundModalContext);

  const { players: allPlayers } = useContext(PlayersContext);

  return (
    <CurrentPlayersSelect
      allPlayers={allPlayers}
      selectedPlayerIds={selectedPlayerIds}
      onSelectedPlayerIdsChange={setSelectedPlayerIds}
    />
  );
};
