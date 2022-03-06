import { Fab, Icon, SpeedDialIcon, useMediaQuery, useTheme } from '@mui/material';
import { useT } from '../../../../locales/hooks/useT';

export const AddRoundModalTrigger = ({ onOpenModal }: { onOpenModal?: () => void }) => {
  const theme = useTheme();
  const t = useT();
  const isFloating = useMediaQuery(theme.breakpoints.down('xl')).valueOf();

  return (
    <Fab
      color="primary"
      {...(isFloating
        ? {
            variant: 'circular',
            sx: { position: 'fixed', bottom: theme.spacing(10), right: theme.spacing(3), zIndex: 10 },
          }
        : {
            variant: 'extended',
            sx: { gap: 1, '&::after': { content: `"${t.addRound}"` } },
          })}
      onClick={onOpenModal}
    >
      <SpeedDialIcon icon={<Icon>ramen_dining</Icon>} />
    </Fab>
  );
};
