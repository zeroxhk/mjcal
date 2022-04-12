import { AddRoundModal } from '../components/AddRoundModal/AddRoundModal';
import { AddRoundModalTrigger } from '../components/AddRoundModal/components/AddRoundModalTrigger';

export const AddRoundModalContainer = ({
  TriggerComponent = AddRoundModalTrigger,
}: {
  TriggerComponent?: ({ onOpenModal }: { onOpenModal: () => void }) => JSX.Element;
}) => {
  return <AddRoundModal key={0} TriggerComponent={TriggerComponent} />;
};
