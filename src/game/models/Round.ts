import { nanoid } from 'nanoid';

export type Round = RoundWithoutId & Readonly<{ id: string }>;

export type RoundWithoutId =
  | Readonly<{
      isTied: true;
    }>
  | Readonly<{
      isTied: false;
      playerIds: readonly [string, string, string, string];
      winnerId: string;
      loserIds: readonly string[];
      farn: number;
      isSelfTouch: boolean;
    }>;

export const createRound = (round: RoundWithoutId): Round => ({ id: nanoid(), ...round });

// TODO: remove this
export const createRandomRound = ({ playerIds }: { playerIds: readonly string[] }) => {
  const winnerId = playerIds[Math.floor(Math.random() * playerIds.length)]!;
  return createRound({
    isTied: false,
    playerIds: playerIds.slice(0, 4) as [string, string, string, string],
    winnerId,
    loserIds: [playerIds.filter(id => id !== winnerId)[Math.floor(Math.random() * 3)]!],
    farn: Math.floor(Math.random() * 7) + 3,
    isSelfTouch: false,
  });
};
