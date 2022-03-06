import produce from 'immer';
import { createContext, ReactNode, useContext, useState } from 'react';
import { PlayersContext } from '../../settings/contexts/PlayersContext';
import { createRandomRound, createRound, Round, RoundWithoutId } from '../models/Round';

export const GameContext = createContext<{
  rounds: Round[];
  addRound: (r: RoundWithoutId) => void;
  removeRound: (id: string) => void;
}>({
  rounds: [],
  addRound: () => {},
  removeRound: () => {},
});

export const GameContextProvider = ({ children }: { children: ReactNode }) => {
  const { players } = useContext(PlayersContext);
  const [rounds, setRounds] = useState<Round[]>(
    Array.from({ length: 60 }, () => createRandomRound({ playerIds: players.map(({ id }) => id) })),
  );

  return (
    <GameContext.Provider
      value={{
        rounds,
        addRound: r =>
          setRounds(
            produce(rounds, draft => {
              draft.push(createRound(r));
            }),
          ),
        removeRound: id => setRounds(rounds.filter(round => round.id !== id)),
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
