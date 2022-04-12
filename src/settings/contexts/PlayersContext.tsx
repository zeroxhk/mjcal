import { zip } from 'ramda';
import { createContext, ReactNode, useCallback, useMemo, useState } from 'react';
import { useT } from '../../locales/hooks/useT';
import { createPlayer, Player } from '../models/Player';

export const PlayersContext = createContext<{
  players: Player[];
  setPlayers: (players: Player[]) => void;
  getPlayerById: (id: string) => Player;
}>({
  players: [],
  setPlayers: () => {},
  getPlayerById: () => {
    throw new Error('no context');
  },
});

export const PlayersContextProvider = ({ children }: { children: ReactNode }) => {
  const t = useT();
  const [players, setPlayers] = useState<Player[]>(
    Array.from({ length: 4 }, (_, i) => createPlayer({ name: `${t.player} ${i + 1}` })),
  );

  const idToPlayerMap = useMemo(
    () =>
      new Map(
        zip(
          players.map(({ id }) => id),
          players,
        ),
      ),
    [players],
  );

  const getPlayerById = useCallback(
    (id: string) => {
      const player = idToPlayerMap.get(id);
      if (!player) throw new Error(`cannot get player ${id}`);
      return player;
    },
    [idToPlayerMap],
  );

  return (
    <PlayersContext.Provider value={{ players, setPlayers, getPlayerById }}>
      {children}
    </PlayersContext.Provider>
  );
};
