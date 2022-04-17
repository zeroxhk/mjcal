import { createRound, Round } from '../../../models/Round';

export type DraftRound = Readonly<{
  isTied: boolean;
  playerIds: readonly string[];
  farn: number;
  winnerId: undefined | string;
  loserIds: readonly string[];
  isSelfTouch: boolean;
}>;

export const createRoundFromDraft = (draftRound: DraftRound): Round => {
  if (!isLengthOf4(draftRound.playerIds)) throw new Error('playerIds.length is not 4');
  if (draftRound.isTied) {
    return createRound({
      isTied: true,
      playerIds: draftRound.playerIds,
    });
  }

  if (!draftRound.winnerId) throw new Error('no winnerId');

  return createRound({
    ...draftRound,
    isTied: false,
    playerIds: draftRound.playerIds,
    winnerId: draftRound.winnerId!,
  });
};

const isLengthOf4 = <X>(xs: readonly X[]): xs is readonly [X, X, X, X] => {
  return xs.length === 4;
};
