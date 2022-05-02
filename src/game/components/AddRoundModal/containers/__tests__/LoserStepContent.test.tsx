import { fireEvent, render } from '@testing-library/react';
import { ReactElement } from 'react';
import { expect, it } from 'vitest';
import { PlayersContextProvider } from '../../../../../game-settings/contexts/PlayersContext';
import { createPlayer, Player } from '../../../../../game-settings/models/Player';
import { LocaleContextProvider } from '../../../../../locales/contexts/LocaleContext';
import { AddRoundModalContextProvider } from '../../contexts/AddRoundModalContext';
import { createDefaultDraftRound } from '../../models/DraftRound';
import { LosersStepContent } from '../LosersStepContent';

it('should assumes not bao and select all potential losers when isSelfTouch', () => {
  const { getByRole, getAllByRole } = renderWithContexts(<LosersStepContent />, {
    players: '1234'.split('').map(id => createPlayer({ id, name: id })),
    winnerId: '2',
  });

  expect(getAllByRole('button').length).toBe(3);
  expect(getByRole('button', { name: '1' })).toHaveAttribute('aria-pressed', 'true');
  expect(getByRole('button', { name: '3' })).toHaveAttribute('aria-pressed', 'true');
  expect(getByRole('button', { name: '4' })).toHaveAttribute('aria-pressed', 'true');
});

it('should enable button group when isBao is selected', () => {
  const { getByRole } = renderWithContexts(<LosersStepContent />, {
    players: 'abcd'.split('').map(id => createPlayer({ id, name: id })),
    winnerId: 'c',
  });

  fireEvent.click(getByRole('checkbox'));

  expect(getByRole('button', { name: 'a' })).toHaveAttribute('aria-pressed', 'false');
  expect(getByRole('button', { name: 'b' })).toHaveAttribute('aria-pressed', 'false');
  expect(getByRole('button', { name: 'd' })).toHaveAttribute('aria-pressed', 'false');

  fireEvent.click(getByRole('button', { name: 'b' }));

  expect(getByRole('button', { name: 'a' })).toHaveAttribute('aria-pressed', 'false');
  expect(getByRole('button', { name: 'b' })).toHaveAttribute('aria-pressed', 'true');
  expect(getByRole('button', { name: 'd' })).toHaveAttribute('aria-pressed', 'false');
});

const renderWithContexts = (
  element: ReactElement,
  { players, winnerId }: { players: Player[]; winnerId: string },
) => {
  return render(
    <LocaleContextProvider>
      <PlayersContextProvider initial={{ players }}>
        <AddRoundModalContextProvider
          initial={{
            draftRound: createDefaultDraftRound({
              playerIds: players.map(({ id }) => id),
              winnerId,
              isSelfTouch: true,
            }),
          }}
        >
          {element}
        </AddRoundModalContextProvider>
      </PlayersContextProvider>
    </LocaleContextProvider>,
  );
};
