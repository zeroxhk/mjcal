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
      <IconButton onClick={() => onFarnChange(farn - 1)}>
        <Icon>remove</Icon>
      </IconButton>
      <TextField
        sx={{ width: theme => theme.spacing(8) }}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        value={farn}
        label={t.farn}
        onChange={event => {
          const newFarn = Number(event.target.value);
          if (Number.isNaN(newFarn)) return;
          onFarnChange(newFarn);
        }}
      />
      <IconButton onClick={() => onFarnChange(farn + 1)}>
        <Icon>add</Icon>
      </IconButton>
    </Stack>
  );
};
