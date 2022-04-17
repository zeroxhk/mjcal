import { ScoringSettings } from '../../settings/models/ScoringSettings';
import { Round } from '../models/Round';

const getScorePortion = ({
  farn,
  halfSpicyFrom,
}: {
  farn: number;
  halfSpicyFrom: number;
}): number => {
  return Number(
    (
      2 ** Math.min(farn, halfSpicyFrom) *
      1.5 ** Math.max(0, Math.ceil((farn - halfSpicyFrom) / 2)) *
      (4 / 3) ** Math.max(0, Math.floor((farn - halfSpicyFrom) / 2))
    ).toFixed(2),
  );
};

const getWinScore = ({
  farn,
  halfSpicyFrom,
  baseScore,
  isSelfTouch,
}: {
  farn: number;
  halfSpicyFrom: number;
  baseScore: number;
  isSelfTouch: boolean;
}): number => {
  return getScorePortion({ farn, halfSpicyFrom }) * baseScore * (isSelfTouch ? 6 : 4);
};

const getLoseScore = ({
  score,
  chungJai,
  isLoser,
  loserCount,
  isSelfTouch,
}: {
  score: number;
  chungJai: 'full' | 'half';
  isLoser: boolean;
  loserCount: number;
  isSelfTouch: boolean;
}): number => {
  if (isSelfTouch) {
    return isLoser ? (-1 * score) / loserCount : 0;
  }

  switch (chungJai) {
    case 'full': {
      return isLoser ? -1 * score : 0;
    }
    case 'half': {
      return (-1 * score) / (isLoser ? 2 : 4);
    }
  }
};

const getScoresForRound1 = (
  round: Round & { isTied: false },
  {
    baseScore,
    halfSpicyFrom,
    isSelfTouch,
    chungJai,
  }: { baseScore: number; halfSpicyFrom: number; isSelfTouch: boolean; chungJai: 'full' | 'half' },
): [number, number, number, number] => {
  const winScore = getWinScore({
    farn: round.farn,
    baseScore,
    halfSpicyFrom,
    isSelfTouch,
  });

  return round.playerIds.map(id => {
    if (round.winnerId === id) return winScore;

    return getLoseScore({
      score: winScore,
      chungJai,
      isLoser: round.loserIds.includes(id),
      loserCount: round.loserIds.length,
      isSelfTouch: round.isSelfTouch,
    });
  }) as [number, number, number, number];
};

export const getScoresForRound = (
  round: Round,
  { players, scoringSettings }: { players: { id: string }[]; scoringSettings: ScoringSettings },
): (number | null)[] => {
  const scores = round.isTied
    ? [0, 0, 0, 0]
    : getScoresForRound1(round, {
        baseScore: scoringSettings.chipValue,
        halfSpicyFrom: scoringSettings.halfSpicyFrom,
        isSelfTouch: round.isSelfTouch,
        chungJai: scoringSettings.chungJai,
      });

  return players.map(({ id }) => scores[round.playerIds.indexOf(id)] ?? null);
};
