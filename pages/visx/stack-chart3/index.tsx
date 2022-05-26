import React from 'react';
import { AreaStack } from '@visx/shape';
import { SeriesPoint } from '@visx/shape/lib/types';
import { GradientOrangeRed } from '@visx/gradient';
import browserUsage, { BrowserUsage } from '@visx/mock-data/lib/mocks/browserUsage';
import { scaleTime, scaleLinear } from '@visx/scale';
import { timeParse } from 'd3-time-format';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { extent } from "d3"

type BrowserNames = keyof BrowserUsage;

const data = browserUsage;
const keys = Object.keys(data[0]).filter((k) => k !== 'date') as BrowserNames[];
const parseDate = timeParse('%Y %b %d');
export const background = '#f38181';

const getDate = (d: BrowserUsage) => (parseDate(d.date) as Date).valueOf();
const getY0 = (d: SeriesPoint<BrowserUsage>) => d[0] / 1;
const getY1 = (d: SeriesPoint<BrowserUsage>) => d[1] / 1;

export type StackedAreasProps = {
    events?: boolean;
    margin?: { top: number; right: number; bottom: number; left: number };
};

export default function Example({
                                    margin = { top: 50, right: 50, bottom: 50, left: 50 },
                                    events = false,
                                }: StackedAreasProps) {
    const height = 700
    const width = 900
    // bounds
    const yMax = height - margin.top - margin.bottom;
    const xMax = width - margin.left - margin.right;

    // scales
    const xScale = scaleTime<number>({
        range: [0, xMax],
        domain: [Math.min(...data.map(getDate)), Math.max(...data.map(getDate))],
    });
    const yScale = scaleLinear<number>({
        domain: [0, 100],
        range: [yMax,0],
        nice: true,
    });

    console.log("DATA", data)
    return width < 10 ? null : (
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: "20px"}}>
            <svg width={width} height={height}>
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                <GradientOrangeRed id="stacked-area-orangered" />

                <rect x={0} y={0} width={width - margin.left - margin.bottom} height={height - margin.top - margin.bottom} fill={background} rx={14} />
                    <AxisLeft scale={yScale} label={"Temperature"} />
                    <AxisBottom scale={xScale} top={yMax} />
                <AreaStack
                    top={margin.top}
                    left={margin.left}
                    keys={keys}
                    data={data}
                    x={(d) => xScale(getDate(d.data)) ?? 0}
                    y0={(d) => yScale(getY0(d)) ?? 0}
                    y1={(d) => yScale(getY1(d)) ?? 0}
                >
                    {({ stacks, path }) =>
                        stacks.map((stack) => (
                            <path
                                key={`stack-${stack.key}`}
                                d={path(stack) || ''}
                                stroke="transparent"
                                fill="url(#stacked-area-orangered)"
                                onClick={() => {
                                    if (events) alert(`${stack.key}`);
                                }}
                            />
                        ))
                    }
                </AreaStack>
                </g>
            </svg>
        </div>

    );
}
