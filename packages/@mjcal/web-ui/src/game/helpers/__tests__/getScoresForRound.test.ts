import { expect, it } from 'vitest';
import { ScoringSettings } from '../../../game-settings/models/ScoringSettings';
import { createRound } from '../../models/Round';
import { getScoresForRound } from '../getScoresForRound';

const CHIP_VALUES = {
  '25chicken': 0.25,
  '51': 0.5,
  '12mosquitoes': 1,
} as const;

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
    allPlayers: '01234567'.split('').map(id => ({ id })),
    scoringSettings: {
      chungJai: 'full',
      chipValue: CHIP_VALUES['25chicken'],
      halfSpicyFrom: 4,
    } as ScoringSettings,
    expected: [-8, 8, -0, -0, null, null, null, null],
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
    allPlayers: '01234567'.split('').map(id => ({ id })),
    scoringSettings: {
      chungJai: 'full',
      chipValue: CHIP_VALUES['25chicken'],
      halfSpicyFrom: 4,
    } as ScoringSettings,
    expected: [-24, -0, null, -0, null, 24, null, null],
  },
  {
    round: createRound({
      isTied: true,
      playerIds: ['0', '5', '1', '3'],
    }),
    allPlayers: '01234567'.split('').map(id => ({ id })),
    scoringSettings: {
      chungJai: 'full',
      chipValue: CHIP_VALUES['25chicken'],
      halfSpicyFrom: 4,
    } as ScoringSettings,
    expected: [0, 0, null, 0, null, 0, null, null],
  },
])(
  'it should calculate correct score for each player',
  ({ round, allPlayers, scoringSettings, expected }) => {
    expect(getScoresForRound(round, { allPlayers, scoringSettings })).toEqual(expected);
  },
);
