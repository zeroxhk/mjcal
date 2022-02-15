import { nanoid } from 'nanoid';

export type Round = RoundWithoutId & { id: string };

export type RoundWithoutId =
  | {
      isTied: true;
    }
  | {
      isTied: false;
      playerIds: [string, string, string, string];
      winnerId: string;
      loserIds: string[];
      farn: number;
      isBao: boolean;
      isSelfTouch: boolean;
    };

export const createRound = (round: RoundWithoutId): Round => ({ id: nanoid(), ...round });

export const createNotTiedRound = ({
  playerIds,
  ...round
}: {
  playerIds: string[];
  winnerId: string;
  loserIds: string[];
  farn: number;
  isBao: boolean;
  isSelfTouch: boolean;
}): Round => {
  if (playerIds.length !== 4) throw new Error('playerIds.length is not 4');
  return createRound({ isTied: false, playerIds: playerIds as [string, string, string, string], ...round });
};

// TODO: remove this
export const createRandomRound = ({ playerIds }: { playerIds: string[] }) => {
  const winnerId = playerIds[Math.floor(Math.random() * 4)];
  return createNotTiedRound({
    playerIds: playerIds.slice(0, 4),
    winnerId,
    loserIds: [playerIds.filter(id => id !== winnerId)[Math.floor(Math.random() * 3)]],
    farn: Math.floor(Math.random() * 7) + 3,
    isBao: false,
    isSelfTouch: false,
  });
};
