import { useContext } from 'react';
import { PlayersContext } from '../../settings/contexts/PlayersContext';
import { AddRoundModal } from '../components/AddRoundModal/AddRoundModal';
import { AddRoundModalTrigger } from '../components/AddRoundModal/components/AddRoundModalTrigger';
import { GameContext } from '../contexts/GameContext';

export const AddRoundModalContainer = ({
  TriggerComponent = AddRoundModalTrigger,
}: {
  TriggerComponent?: ({ onOpenModal }: { onOpenModal: () => void }) => JSX.Element;
}) => {
  const { players } = useContext(PlayersContext);
  const { addRound } = useContext(GameContext);
  return <AddRoundModal players={players} onAddRound={addRound} TriggerComponent={TriggerComponent} />;
};
