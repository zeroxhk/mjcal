import { useContext, useEffect } from 'react';
import { AddRoundModalContext } from '../AddRoundModal';
import { CurrentPlayersSelect } from '../components/CurrentPlayersSelect';

export const CurrentPlayersSelectStep = () => {
  const { players, selectedPlayerIds, setSelectedPlayerIds, setCanNext } = useContext(AddRoundModalContext);

  useEffect(() => setCanNext(selectedPlayerIds.length === 4), [selectedPlayerIds]);

  return (
    <CurrentPlayersSelect
      allPlayers={players}
      selectedPlayerIds={selectedPlayerIds}
      onSelectedPlayerIdsChange={setSelectedPlayerIds}
    />
  );
};
