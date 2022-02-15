import { Icon, IconButton, Stack } from '@mui/material';
import { Box } from '@mui/system';
import throttle from 'lodash.throttle';
import { RefObject, useEffect, useRef, useState } from 'react';
import { Chart } from './Chart';

const WIDTH_PER_ROUND = 25;

const useScrolls = (ref: RefObject<HTMLElement>): { left: number; top: number } | null => {
  const [scrolls, setScrolls] = useState<{ left: number; top: number } | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;

    setScrolls({
      left: el.scrollLeft,
      top: el.scrollTop,
    });
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;

    const scrollHandler = throttle(
      () =>
        setScrolls({
          left: el.scrollLeft,
          top: el.scrollTop,
        }),
      100,
    );

    el.addEventListener('scroll', scrollHandler);
    return () => el.removeEventListener('scroll', scrollHandler);
  }, [ref]);

  return scrolls;
};

const SCROLL_STEP = 500;

export const ScrollableChart = ({ data }: { data: { playerName: string; scores: (number | null)[] }[] }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const scrolls = useScrolls(chartContainerRef);

  return (
    <Stack>
      <Box sx={{ overflowX: 'auto', overflowY: 'hidden' }} ref={chartContainerRef}>
        <Box
          sx={{
            minWidth: `${WIDTH_PER_ROUND * (data.at(0)?.scores.length ?? 1)}px`,
            height: '700px',
            maxHeight: 'calc(80vh - 200px)',
            display: 'flex',
            alignItem: 'center',
          }}
        >
          <Chart data={data} />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton
          onClick={() => chartContainerRef.current?.scrollBy({ left: -SCROLL_STEP, behavior: 'smooth' })}
          disabled={!scrolls || scrolls.left <= 0}
        >
          <Icon>chevron_left</Icon>
        </IconButton>
        <IconButton
          onClick={() => chartContainerRef.current?.scrollBy({ left: SCROLL_STEP, behavior: 'smooth' })}
          disabled={
            !scrolls ||
            !chartContainerRef.current ||
            scrolls.left >= chartContainerRef.current.scrollWidth - chartContainerRef.current.clientWidth
          }
        >
          <Icon>chevron_right</Icon>
        </IconButton>
      </Box>
    </Stack>
  );
};
