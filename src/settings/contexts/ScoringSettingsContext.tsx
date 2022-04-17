import { createContext, ReactNode, useState } from 'react';
import { ScoringSettings } from '../models/ScoringSettings';

const CHIP_VALUES = {
  '25chicken': 0.25,
  '51': 0.5,
  '12mosquitoes': 1,
} as const;

const DEFAULT_SETTINGS: ScoringSettings = {
  chungJai: 'full',
  chipValue: CHIP_VALUES['25chicken'],
  halfSpicyFrom: 4,
};

export const ScoringSettingsContext = createContext<{
  settings: ScoringSettings;
  setSettings: (s: ScoringSettings) => void;
}>({
  settings: DEFAULT_SETTINGS,
  setSettings: () => {},
});

export const ScoringSettingsContextProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<ScoringSettings>(DEFAULT_SETTINGS);

  return (
    <ScoringSettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </ScoringSettingsContext.Provider>
  );
};
