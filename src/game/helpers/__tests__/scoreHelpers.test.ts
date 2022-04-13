import { describe, expect, it } from 'vitest';
import { ScoringSettings } from '../../../settings/models/ScoringSettings';
import { createRound } from '../../models/Round';
import { getScoresForRound } from '../scoreHelpers';

describe('getScoresForRound', () => {
  it.each([
    {
      round: createRound({
        farn: 3,
        isSelfTouch: false,
        isTied: false,
        loserIds: ['0'],
        winnerId: '1',
        playerIds: ['0', '1', '2', '3'],
      }),
      players: '01234567'.split('').map(id => ({ id })),
      scoringSettings: {
        chungJai: 'full',
        chipValue: '25chicken',
        halfSpicyFrom: 4,
      } as ScoringSettings,
      expected: [-8, 8, 0, 0, null, null, null, null],
    },
    {
      round: createRound({
        farn: 4,
        isSelfTouch: true,
        isTied: false,
        loserIds: ['0'],
        winnerId: '5',
        playerIds: ['0', '5', '1', '3'],
      }),
      players: '01234567'.split('').map(id => ({ id })),
      scoringSettings: {
        chungJai: 'full',
        chipValue: '25chicken',
        halfSpicyFrom: 4,
      } as ScoringSettings,
      expected: [-24, 0, null, 0, null, 24, null, null],
    },
  ])(
    'it should calculate correct score for each player',
    ({ round, players, scoringSettings, expected }) => {
      expect(getScoresForRound(round, { players, scoringSettings })).toEqual(expected);
    },
  );
});
