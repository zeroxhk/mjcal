import { Fab, Icon, SpeedDialIcon, useMediaQuery, useTheme } from '@mui/material';
import { useLocale } from '../../../../locales/hooks/useLocale';

export const AddRoundModalTrigger = (props: { onClick?: () => void }) => {
  const theme = useTheme();
  const { t } = useLocale();
  const isFloating = useMediaQuery(theme.breakpoints.down('xl')).valueOf();

  return (
    <Fab
      color="primary"
      {...(isFloating
        ? {
            variant: 'circular',
            sx: { position: 'fixed', bottom: theme.spacing(10), right: theme.spacing(3), zIndex: 1 },
          }
        : {
            variant: 'extended',
            sx: { gap: 1, '&::after': { content: `"${t.addRound}"` } },
          })}
      {...props}
    >
      <SpeedDialIcon icon={<Icon>ramen_dining</Icon>} />
    </Fab>
  );
};
