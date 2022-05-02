import { render } from '@testing-library/react';
import { expect, it, vitest } from 'vitest';
import { PlayersContext } from '../../../../../game-settings/contexts/PlayersContext';
import { LocaleContextProvider } from '../../../../../locales/contexts/LocaleContext';
import { AddRoundModalContext } from '../../AddRoundModal';
import { LosersStepContent } from '../LosersStepContent';

it('should assumes not bao and select all potential losers when isSelfTouch', () => {
  const updateDraftRound = vitest.fn();
  render(
    <LocaleContextProvider>
      <PlayersContext.Provider
        value={{
          getPlayerById: n => ({ id: n, name: n }),
          players: '1234'.split('').map(n => ({ id: n, name: n })),
          setPlayers: () => {},
        }}
      >
        <AddRoundModalContext.Provider
          value={{
            draftRound: {
              isTied: false,
              playerIds: '1234'.split(''),
              farn: 3,
              winnerId: '2',
              loserIds: [],
              isSelfTouch: true,
            },
            updateDraftRound,
            next: () => {},
            back: () => {},
            close: () => {},
          }}
        >
          <LosersStepContent />
        </AddRoundModalContext.Provider>
      </PlayersContext.Provider>
    </LocaleContextProvider>,
  );

  expect(updateDraftRound).toHaveBeenCalledWith({ loserIds: '134'.split('') });
});
