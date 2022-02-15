import {
  Box,
  Button,
  Icon,
  IconButton,
  InputAdornment,
  Paper,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from '@mui/material';
import produce from 'immer';
import { createPlayer, Player } from '../models/Player';

/*
const IsPlayingCheckbox = ({
  isPlaying,
  isDisabled,
  disabledMessage,
  onChange,
}: {
  isPlaying: boolean;
  isDisabled: boolean;
  disabledMessage: string;
  onChange: () => void;
}) => {
  const checkbox = <Checkbox checked={isPlaying} disabled={isDisabled} onChange={onChange} />;
  if (isDisabled)
    return (
      <Tooltip title={disabledMessage} arrow enterTouchDelay={0}>
        <Box component="span">{checkbox}</Box>
      </Tooltip>
    );
  return checkbox;
};
*/

export const PlayerList = ({
  players,
  onSetPlayers,
  sx,
}: {
  players: Player[];
  onSetPlayers: (ps: Player[]) => void;
  sx?: SxProps;
}) => {
  return (
    <Paper sx={{ flexGrow: 1, display: 'flex', gap: 1, flexDirection: 'column', padding: 2, ...sx }}>
      <Box sx={{ marginBottom: 1 }}>
        <Button
          variant="outlined"
          startIcon={<Icon>person_add</Icon>}
          onClick={() =>
            onSetPlayers(
              produce(players, draft => {
                draft.push(createPlayer({ name: `Player ${players.length + 1}` }));
              }),
            )
          }
        >
          Add Player
        </Button>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 320 }}>
          <TableBody>
            {players.map((player, i) => (
              <TableRow key={player.id}>
                <TableCell padding="checkbox">
                  <IconButton
                    onClick={() => onSetPlayers(players.filter(({ id }) => id !== player.id))}
                    disabled={players.length <= 4}
                  >
                    <Icon>delete</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>
                  <TextField
                    label={`Player ${i + 1}`}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon sx={{ marginRight: 1 }}>person</Icon>
                        </InputAdornment>
                      ),
                    }}
                    value={player.name}
                    onChange={event =>
                      onSetPlayers(
                        produce(players, playersDraft => {
                          const playerDraft = playersDraft.find(({ id }) => id === player.id);
                          if (!playerDraft) return;
                          playerDraft.name = event.target.value;
                        }),
                      )
                    }
                    fullWidth
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
