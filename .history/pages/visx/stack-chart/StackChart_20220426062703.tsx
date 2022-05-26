import React from 'react';
import { AreaStack } from '@visx/shape';
import { SeriesPoint } from '@visx/shape/lib/types';
import { GradientPinkBlue } from '@visx/gradient';
import cityTemperature, { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import { scaleTime, scaleLinear } from '@visx/scale';
import { timeParse } from 'd3-time-format';
import { AxisBottom, AxisLeft } from '@visx/axis';


const data = cityTemperature;
// const keys = Object.keys(data[0]).filter((k) => k !== 'date') as BrowserNames[];
const parseDate = timeParse('%Y-%m-%d');
export const background = 'green';

const getDate = (d: CityTemperature) => (parseDate(d.date) as Date).valueOf();
const getY0 = (d: SeriesPoint<CityTemperature>) => d[0] / 100;
const getY1 = (d: SeriesPoint<CityTemperature>) => d[1] / 100;
const colors = ['green', 'red', 'blue', 'orange', 'purple', 'yellow']

// console.log(getDate({}))

export type StackedAreasProps = {
  width: number;
  height: number;
  events?: boolean;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export default function StackChart({
  width,
  height,
  margin = { top: 0, right: 0, bottom: 0, left: 0 },
  events = false,
}: StackedAreasProps) {
  // bounds
  const yMax = height - margin.top - margin.bottom;
  const xMax = width - margin.left - margin.right;

  // scales
  const xScale = scaleTime<number>({
    range: [0, xMax],
    domain: [Math.min(...data.map(getDate)), Math.max(...data.map(getDate))],
  });
  const yScale = scaleLinear<number>({
    range: [yMax, 0],
  });

  console.log("Data", cityTemperature)

  return width < 10 ? null : (
    <svg width={width} height={height}>
        <g>
        
      <GradientPinkBlue id="stacked-pink-blue" />
      <rect x={0} y={0} width={width} height={height} fill={background} rx={14} />
      <AreaStack
        top={margin.top}
        left={margin.left}
        // keys={keys}
        data={data}
        x={(d) => xScale(getDate(d.data)) ?? 0}
        y0={(d) => yScale(getY0(d)) ?? 0}
        y1={(d) => yScale(getY1(d)) ?? 0}
      >
        {({ stacks, path }) =>
          stacks.map((stack, i) => (
            <path
              key={`stack-${stack.key}`}
              d={path(stack) || ''}
              stroke="transparent"
              fill={`url(#stacked-pink-blue)`}
              onClick={() => {
                if (events) alert(`${stack.key}`);
              }}
            />
          ))
        }
      </AreaStack>
      <AxisBottom scale={xScale} top={xMax} />
        <AxisLeft scale={yScale} />
      </g>
    </svg>
  );
}
