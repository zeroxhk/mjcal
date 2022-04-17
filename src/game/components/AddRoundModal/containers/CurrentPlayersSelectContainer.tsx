import { useContext } from 'react';
import { PlayersContext } from '../../../../game-settings/contexts/PlayersContext';
import { AddRoundModalContext } from '../AddRoundModal';
import { CurrentPlayersSelect } from '../components/CurrentPlayersSelect';

export const CurrentPlayersSelectContainer = () => {
  const { draftRound, updateDraftRound } = useContext(AddRoundModalContext);
  const { players: allPlayers } = useContext(PlayersContext);

  return (
    <CurrentPlayersSelect
      allPlayers={allPlayers}
      selectedPlayerIds={draftRound.playerIds}
      onSelectedPlayerIdsChange={playerIds => updateDraftRound({ playerIds })}
    />
  );
};
