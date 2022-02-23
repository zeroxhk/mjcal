import { createContext, ReactNode, useState } from 'react';
import { useT } from '../../locales/hooks/useT';
import { createPlayer, Player } from '../models/Player';

export const PlayersContext = createContext<{
  players: Player[];
  setPlayers: (p: Player[]) => void;
}>({
  players: [],
  setPlayers: () => {},
});

export const PlayersContextProvider = ({ children }: { children: ReactNode }) => {
  const t = useT();
  const [players, setPlayers] = useState<Player[]>(
    Array.from({ length: 4 }, (_, i) => createPlayer({ name: `${t.player} ${i + 1}` })),
  );

  return <PlayersContext.Provider value={{ players, setPlayers }}>{children}</PlayersContext.Provider>;
};
