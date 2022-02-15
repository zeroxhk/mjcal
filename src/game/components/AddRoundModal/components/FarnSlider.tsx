import { Box, Slider, Stack, TextField } from '@mui/material';

export const FarnSlider = ({ farn, onFarnChange }: { farn: number; onFarnChange: (farn: number) => void }) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
      <TextField
        value={farn}
        label="farn"
        inputProps={{ readOnly: true }}
        size="small"
        sx={({ spacing }) => ({ width: spacing(8) })}
      />
      <Box sx={{ pr: 1 }} flexGrow={1}>
        <Slider
          value={farn}
          onChange={(_, v) => onFarnChange(v as number)}
          step={1}
          max={15}
          marks={[3, 7, 13].map(i => ({ value: i, label: `${i} farn` }))}
        />
      </Box>
    </Stack>
  );
};
