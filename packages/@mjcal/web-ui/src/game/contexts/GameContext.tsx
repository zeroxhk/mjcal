import { createContext, ReactNode, useState } from 'react';
import { createRound, Round, RoundWithoutId } from '../models/Round';

export const GameContext = createContext<{
  rounds: readonly Round[];
  addRound: (r: RoundWithoutId) => void;
  removeRound: (id: string) => void;
}>({
  rounds: [],
  addRound: () => {},
  removeRound: () => {},
});

export const GameContextProvider = ({ children }: { children: ReactNode }) => {
  const [rounds, setRounds] = useState<Round[]>([]);

  return (
    <GameContext.Provider
      value={{
        rounds,
        addRound: r => setRounds([...rounds, createRound(r)]),
        removeRound: id => setRounds(rounds.filter(round => round.id !== id)),
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
