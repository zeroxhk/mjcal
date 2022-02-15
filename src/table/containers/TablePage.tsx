import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { sum, transpose } from 'ramda';
import { useContext, useMemo } from 'react';
import { GameContext } from '../../game/contexts/GameContext';
import { getScoresForRound } from '../../game/helpers/scoreHelpers';
import { PlayersContext } from '../../settings/contexts/PlayersContext';
import { ScoringSettingsContext } from '../../settings/contexts/ScoringSettingsContext';

export const TablePage = () => {
  const { players } = useContext(PlayersContext);
  const { rounds } = useContext(GameContext);
  const { settings: scoringSettings } = useContext(ScoringSettingsContext);

  const scoress = useMemo(
    () => rounds.map(round => getScoresForRound(round, { players, scoringSettings })),
    [rounds, players, scoringSettings],
  );

  return (
    <Container maxWidth="xl">
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: '65vh' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow sx={{ whiteSpace: 'nowrap' }}>
                <TableCell>#</TableCell>
                {players.map(player => (
                  <TableCell key={player.id}>{player.name}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rounds.length <= 0 ? (
                <TableRow>
                  <TableCell colSpan={1 + players.length} align="center">
                    No data to show yet...
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {scoress.map((scores, i) => (
                    <TableRow key={`round${i}`}>
                      <TableCell>#{i + 1}</TableCell>
                      {scores.map((score, i) => (
                        <TableCell
                          key={i}
                          sx={!!score ? { color: ({ palette }) => palette[score > 0 ? 'success' : 'error'].main } : {}}
                        >
                          {score ?? '-'}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                  <TableRow
                    sx={({ palette }) => ({ bgcolor: '#122b36', color: palette.info.contrastText })}
                    ref={el => el?.scrollIntoView()}
                  >
                    <TableCell>Sum</TableCell>
                    {transpose(scoress)
                      .map(scores => sum(scores.map(n => n ?? 0)))
                      .map((total, i) => (
                        <TableCell
                          key={i}
                          sx={!!total ? { color: ({ palette }) => palette[total > 0 ? 'success' : 'error'].main } : {}}
                        >
                          {total}
                        </TableCell>
                      ))}
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};
