import { Icon, IconButton, Stack, TextField } from '@mui/material';
import { useT } from '../../../../locales/hooks/useT';

export const FarnInput = ({
  farn,
  onFarnChange,
}: {
  farn: number;
  onFarnChange: (farn: number) => void;
}) => {
  const t = useT();
  return (
    <Stack direction="row">
      <TextField
        InputProps={{
          startAdornment: (
            <IconButton onClick={() => onFarnChange(farn - 1)}>
              <Icon>remove</Icon>
            </IconButton>
          ),
          endAdornment: (
            <IconButton onClick={() => onFarnChange(farn + 1)}>
              <Icon>add</Icon>
            </IconButton>
          ),
        }}
        sx={{ width: theme => theme.spacing(18) }}
        inputProps={{
          inputMode: 'numeric',
          pattern: '[0-9]*',
          style: {
            textAlign: 'center',
          },
        }}
        value={farn}
        label={t.farn}
        onChange={event => {
          const newFarn = Number(event.target.value);
          if (Number.isNaN(newFarn)) return;
          onFarnChange(newFarn);
        }}
      />
    </Stack>
  );
};
