import { useTheme } from '@mui/material';
import { ResponsiveLine } from '@nivo/line';
import { useMemo } from 'react';
import { useT } from '../../locales/hooks/useT';

export const Chart = ({ data }: { data: { playerName: string; scores: (number | null)[] }[] }) => {
  const theme = useTheme();
  const t = useT();
  const yScaleMax = useMemo(() => Math.max(...data.flatMap(({ scores }) => scores).map(s => Math.abs(s ?? 0))), [data]);

  return (
    <ResponsiveLine
      data={data.map(({ playerName, scores }) => ({
        id: playerName,
        data: scores.map((score, i) => ({ x: i, y: score })),
      }))}
      pointLabelYOffset={-12}
      enableSlices="x"
      theme={{
        background: theme.palette.background.default,
        textColor: theme.palette.text.secondary,
        fontSize: 11,
        grid: {
          line: {
            stroke: theme.palette.secondary.dark,
            strokeWidth: 1,
          },
        },
        tooltip: {
          container: {
            background: theme.palette.secondary.light,
            color: theme.palette.secondary.contrastText,
            fontSize: 12,
          },
        },
      }}
      margin={{ top: 20, right: 20, bottom: 85, left: 60 }}
      yScale={{
        type: 'linear',
        min: -yScaleMax,
        max: yScaleMax,
      }}
      colors={{ scheme: 'set3' }}
      gridXValues={data[0]?.scores.length ?? 0}
      axisBottom={{
        legend: t.round,
        legendOffset: 36,
        legendPosition: 'middle',
        tickValues: data[0]?.scores.length ?? 0,
      }}
      axisLeft={{
        legend: t.score,
        legendOffset: -40,
        legendPosition: 'middle',
      }}
      useMesh={true}
      legends={[
        {
          anchor: 'bottom-left',
          direction: 'row',
          justify: false,
          translateX: -20,
          translateY: 70,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
        },
      ]}
    />
  );
};
