import { Icon, IconButton, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { useRef } from 'react';
import { Chart } from './Chart';

const WIDTH_PER_ROUND = 25;
const SCROLL_STEP = 500;

export const ScrollableChart = ({
  data,
  isShowScrollButton = true,
}: {
  data: { playerName: string; scores: (number | null)[] }[];
  isShowScrollButton?: boolean;
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  return (
    <Stack width="100%">
      <Box sx={{ overflowX: 'auto', overflowY: 'hidden' }} ref={chartContainerRef}>
        <Box
          sx={{
            minWidth: `${WIDTH_PER_ROUND * (data[0]?.scores.length ?? 1)}px`,
            height: '700px',
            maxHeight: 'calc(80vh - 200px)',
            display: 'flex',
            alignItem: 'center',
          }}
        >
          <Chart data={data} />
        </Box>
      </Box>
      {isShowScrollButton && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={() => chartContainerRef.current?.scrollBy({ left: -SCROLL_STEP, behavior: 'smooth' })}>
            <Icon>chevron_left</Icon>
          </IconButton>
          <IconButton onClick={() => chartContainerRef.current?.scrollBy({ left: SCROLL_STEP, behavior: 'smooth' })}>
            <Icon>chevron_right</Icon>
          </IconButton>
        </Box>
      )}
    </Stack>
  );
};
