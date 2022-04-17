import { Box, Container, Stack } from '@mui/material';
import { scan, transpose } from 'ramda';
import { useContext } from 'react';
import { useModal } from '../../common/hooks/useModal';
import { AddRoundModal } from '../../game/components/AddRoundModal/AddRoundModal';
import { AddRoundModalTrigger } from '../../game/components/AddRoundModal/components/AddRoundModalTrigger';
import { GameContext } from '../../game/contexts/GameContext';
import { getScoresForRound } from '../../game/helpers/scoreHelpers';
import { useT } from '../../locales/hooks/useT';
import { PlayersContext } from '../../settings/contexts/PlayersContext';
import { ScoringSettingsContext } from '../../settings/contexts/ScoringSettingsContext';
import { ScrollableChart } from '../components/ScrollableChart';

export const ChartPage = () => {
  const t = useT();
  const { players } = useContext(PlayersContext);
  const { settings: scoringSettings } = useContext(ScoringSettingsContext);
  const { rounds } = useContext(GameContext);
  const scoress = transpose(
    rounds.map(round => getScoresForRound(round, { allPlayers: players, scoringSettings })),
  );

  const [isAddRoundModalOpened, openAddRoundModal, closeAddRoundModal] = useModal();

  return (
    <>
      <Container maxWidth="xl">
        <Stack gap={2} alignItems={'flex-start'}>
          <AddRoundModalTrigger onOpenModal={openAddRoundModal} />
          {rounds.length <= 0 ? (
            <Box
              sx={{
                width: '100%',
                height: '70vh',
                backgroundColor: theme => theme.palette.grey[900],
                color: theme => theme.palette.getContrastText(theme.palette.grey[900]),
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {t.chartPlaceholderText}
            </Box>
          ) : (
            <ScrollableChart
              data={scoress
                .map(scores => scan((acc, score) => acc + (score ?? 0), 0, scores))
                .map((scores, i) => ({
                  playerName: players[i]?.name ?? '## NO PLAYER FOUND ##',
                  scores,
                }))}
            />
          )}
        </Stack>
      </Container>
      <AddRoundModal isOpened={isAddRoundModalOpened} onClose={closeAddRoundModal} />
    </>
  );
};
