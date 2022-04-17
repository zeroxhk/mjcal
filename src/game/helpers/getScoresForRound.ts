import { negate } from 'ramda';
import { trunc } from 'ramda-adjunct';
import { ScoringSettings } from '../../game-settings/models/ScoringSettings';
import { Round } from '../models/Round';

const getBaseScore = ({
  farn,
  chipValue,
  halfSpicyFrom,
}: {
  farn: number;
  chipValue: number;
  halfSpicyFrom: number;
}): number =>
  trunc(
    2 ** Math.min(farn, halfSpicyFrom) *
      1.5 ** Math.max(0, Math.ceil((farn - halfSpicyFrom) / 2)) *
      (4 / 3) ** Math.max(0, Math.floor((farn - halfSpicyFrom) / 2)),
  ) * chipValue;

const getWinScale = ({ isSelfTouch }: { isSelfTouch: boolean }): number => {
  return isSelfTouch ? 6 : 4;
};

const getSelfTouchLoserScale = ({
  isLoser,
  isBao,
}: {
  isLoser: boolean;
  isBao: boolean;
}): number => {
  if (!isLoser) return 0;
  if (isBao) return 6;
  return 2;
};

const getOutChungLoserScale = ({
  chungJai,
  isOutChunger,
}: {
  chungJai: ScoringSettings['chungJai'];
  isOutChunger: boolean;
}): number => {
  switch (chungJai) {
    case 'full': {
      if (isOutChunger) return 4;
      return 0;
    }
    case 'half': {
      if (isOutChunger) return 2;
      return 1;
    }
  }
};

const getScoresForRoundPlayers = (
  round: Round,
  { chipValue, halfSpicyFrom, chungJai }: ScoringSettings,
): [number, number, number, number] => {
  if (round.isTied) return [0, 0, 0, 0];
  const baseScore = getBaseScore({ farn: round.farn, halfSpicyFrom, chipValue });
  const scales = round.playerIds.map(id =>
    round.winnerId === id
      ? getWinScale({ isSelfTouch: round.isSelfTouch })
      : negate(
          round.isSelfTouch
            ? getSelfTouchLoserScale({
                isLoser: round.loserIds.includes(id),
                isBao: round.loserIds.length === 1,
              })
            : getOutChungLoserScale({
                chungJai,
                isOutChunger: round.loserIds.includes(id),
              }),
        ),
  );

  return scales.map(scale => baseScore * scale) as [number, number, number, number];
};

export const getScoresForRound = (
  round: Round,
  {
    allPlayers,
    scoringSettings,
  }: { allPlayers: { id: string }[]; scoringSettings: ScoringSettings },
): (number | null)[] => {
  const scores = getScoresForRoundPlayers(round, scoringSettings);

  return allPlayers.map(({ id }) => scores[round.playerIds.indexOf(id)] ?? null);
};
