import {
  Checkbox,
  FormControl,
  FormLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useCallback, useMemo } from 'react';
import { useT } from '../../../../locales/hooks/useT';
import { Player } from '../../../../settings/models/Player';
import { toggleListItem } from '../../../helpers/arrays/toggleListItem';

export const CurrentPlayersSelect = ({
  allPlayers,
  selectedPlayerIds,
  onSelectedPlayerIdsChange,
}: {
  allPlayers: Player[];
  selectedPlayerIds: string[];
  onSelectedPlayerIdsChange: (s: string[]) => void;
}) => {
  const selectedPlayerIdSet = useMemo(() => new Set(selectedPlayerIds), [selectedPlayerIds]);
  const t = useT();

  return (
    <FormControl fullWidth sx={{ mt: 1 }}>
      <FormLabel focused={false}>{t.addRoundModal.currentPlayersSelectTitle}</FormLabel>
      <List>
        {allPlayers.map(player => {
          const isDisabled = useMemo(
            () => !selectedPlayerIdSet.has(player.id) && selectedPlayerIds.length >= 4,
            [selectedPlayerIdSet, selectedPlayerIds.length],
          );
          return (
            <ListItem
              key={player.id}
              disablePadding
              disabled={isDisabled}
              onClick={useCallback(() => {
                if (isDisabled) return;
                onSelectedPlayerIdsChange(toggleListItem(player.id, selectedPlayerIds));
              }, [player.id, selectedPlayerIds])}
            >
              <ListItemButton role={undefined} dense>
                <ListItemIcon>
                  <Checkbox edge="start" checked={selectedPlayerIdSet.has(player.id)} tabIndex={-1} disableRipple />
                </ListItemIcon>
                <ListItemText primary={player.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </FormControl>
  );
};
