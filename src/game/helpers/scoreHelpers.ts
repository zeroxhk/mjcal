import { ScoringSettings } from '../../settings/models/ScoringSettings';
import { Round } from '../models/Round';

export const getScorePortion = ({ farn, halfSpicyFrom }: { farn: number; halfSpicyFrom: number }): number => {
  return Number(
    (
      2 ** Math.min(farn, halfSpicyFrom) *
      1.5 ** Math.max(0, Math.ceil((farn - halfSpicyFrom) / 2)) *
      (4 / 3) ** Math.max(0, Math.floor((farn - halfSpicyFrom) / 2))
    ).toFixed(2),
  );
};

export const getWinScore = ({
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

export const getLoseScore = ({
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

export const getScoresForRound = (
  round: Round,
  { players, scoringSettings }: { players: { id: string }[]; scoringSettings: ScoringSettings },
): (number | null)[] => {
  if (round.isTied) return players.map(() => 0);
  const winScore = getWinScore({
    farn: round.farn,
    baseScore: {
      '25chicken': 0.25,
      '51': 0.5,
      '12mosquitoes': 1,
    }[scoringSettings.chipValue],
    halfSpicyFrom: scoringSettings.halfSpicyFrom === 'never' ? Number.POSITIVE_INFINITY : scoringSettings.halfSpicyFrom,
    isSelfTouch: round.isSelfTouch,
  });

  const playerIdSet = new Set(round.playerIds);

  return players.map(({ id }) => {
    if (!playerIdSet.has(id)) return null;
    if (round.winnerId === id) return winScore;

    return getLoseScore({
      score: winScore,
      chungJai: scoringSettings.chungJai,
      isLoser: round.loserIds.includes(id),
      loserCount: round.loserIds.length,
      isSelfTouch: round.isSelfTouch,
    });
  });
};
