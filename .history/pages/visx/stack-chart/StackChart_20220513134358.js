import React from 'react';
import { AreaStack } from '@visx/shape';
import { SeriesPoint } from '@visx/shape/lib/types';
import { GradientPinkBlue } from '@visx/gradient';
import { useTooltip, Tooltip, defaultStyles, TooltipWithBounds } from '@visx/tooltip';
// import cityTemperature, { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import { scaleTime, scaleLinear, scaleBand } from '@visx/scale';
import { timeParse } from 'd3-time-format';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { localPoint } from '@visx/event';

const data = [
    { temp1: 10, temp2: 15, date: '2020-01-01' },
    { temp1: 20, temp2: 25, date: '2020-01-02' },
    { temp1: 25, temp2: 30, date: '2020-01-03' },
    { temp1: 30, temp2: 35, date: '2020-01-04' },
    { temp1: 35, temp2: 36, date: '2020-01-05' },
    { temp1: 35, temp2: 38, date: '2020-01-06' },
    { temp1: 30, temp2: 40, date: '2020-01-07' },
    { temp1: 33, temp2: 35, date: '2020-01-08' },
    { temp1: 40, temp2: 30, date: '2020-01-09' },
    { temp1: 20, temp2: 25, date: '2020-01-10' },
];
const keys = Object.keys(data[0]).filter((k) => k !== 'date');
const parseDate = timeParse('%Y-%m-%d');
export const background = 'blue';

const getDate = (d) => parseDate(d.date).valueOf();
const getTemp = (d) => d.temp2
const getNewDate = (d) => d.date
const getY0 = (d) => d[0] / 100;
const getY1 = (d) => d[1] / 100;
// const colors = ['green', 'red', 'blue', 'orange', 'purple', 'yellow']

export default function StackChart({
    width,
    height,
    margin = { top: 50, right: 50, bottom: 50, left: 50},
    events = false,
}) {
    // bounds
    const yMax = height - margin.top - margin.bottom;
    const xMax = width - margin.left - margin.right;
    const { showTooltip, hideTooltip, tooltipData, tooltipLeft, tooltipTop } = useTooltip()

    // scales
    const xScale = scaleTime({
      domain: [Math.min(...data.map(getDate)), Math.max(...data.map(getDate))],  
      range: [0, xMax],
      padding: 0.5
    });

    const xScaleAxis = scaleBand({
      domain: data.map(getNewDate),
      range: [0, xMax]
    })
    const yScale = scaleLinear ({
            range: [yMax, 0]
        })

    console.log('Data', Math.max(...data.map(getDate)), xMax);

    const handleTooltip = (event) => {
        if (!data || !xScale || !yScale) {
            return;
        }
        const { x } = localPoint(event) || { x: 0 };
        const x0 = xScale.invert(x - margin.left);
        const index = bisectDate(data, x0, 1);
        const d0 = data[index - 1];
        const d1 = data[index];
        let d = d0;
        if (d1 && getDate(d)) {
            d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0;
        }
        console.log('xxxxxxx', x);
        console.log('index', index)
        // console.log('x: ', yScale(getTempValue(data[index])));
        showTooltip({
            tooltipData: timeFormat('%c')(x0),
            tooltipLeft: x,
            tooltipTop: yScale(getTempValue(d)),
        });
    }

    return width < 10 ? null : (
        <svg width={width} height={height}>
        
            <g transform={`translate(${margin.left}, ${margin.top})`}>
            <AxisLeft scale={yScale} />
            <AxisBottom scale={xScale} top={height - 100} />
                <GradientPinkBlue id="stacked-pink-blue" /> 
                {/* <rect x={0} y={0} width={width - 100} height={height - 100} fill={background} rx={14} />  */}
                <AreaStack
                    top={margin.top}
                    left={margin.left}
                    keys={keys}
                    data={data}
                    x={(d) => xScale(getDate(d.data)) ?? 0}
                    y0={(d) => yScale(getY0(d)) ?? 0}
                    y1={(d) => yScale(getY1(d)) ?? 0}
                    onMouseOver={(e) => console.log("Event", e)}
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
                                onMouseOver={handleTooltip}
                            />
                        ))
                    }
                </AreaStack>
            </g>
        </svg>
    );
}
