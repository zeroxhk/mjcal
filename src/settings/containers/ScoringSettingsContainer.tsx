import { useContext } from 'react';
import { ScoringSettings } from '../components/ScoringSettings';
import { ScoringSettingsContext } from '../contexts/ScoringSettingsContext';

export const ScoringSettingsContainer = () => {
  const { settings, setSettings } = useContext(ScoringSettingsContext);
  return <ScoringSettings settings={settings} onSetSettings={setSettings} />;
};
