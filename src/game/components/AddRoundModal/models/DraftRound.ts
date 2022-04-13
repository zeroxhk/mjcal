export type DraftRound = Readonly<{
  playerIds: readonly string[];
  farn: number;
  winnerId: undefined | string;
  loserIds: readonly string[];
  isBao: boolean;
  isSelfTouch: boolean;
}>;
