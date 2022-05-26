import React from 'react';
import {GridRows, GridColumns, Grid} from '@visx/grid';
import appleStock, {AppleStock} from "@visx/mock-data/lib/mocks/appleStock";
import cityTemperature from "@visx/mock-data/lib/mocks/cityTemperature";
import { timeParse, timeFormat } from 'd3-time-format'
import {scaleBand, scaleLinear} from "@visx/scale";
import { AxisBottom } from "@visx/axis";
import { Line, LineRadial } from '@visx/shape'
import { Point } from '@visx/point';


const data: Array<AppleStock> = appleStock.slice(0, 12)

export default function LineChart() {
    const width = 1000
    const height = 800

    const parseDate = timeParse('%Y-%m-%d');
    const format = timeFormat('%b %d');
    const formatDate = (date: string) => format(parseDate(date) as Date);
    const getDate = (data: AppleStock) => data.date
    const dateScale = scaleBand<string>({
        domain: data.map(getDate),
        padding: 0.2,
    });

    const closeScale = scaleLinear<number>({
        domain: [0, 12],
        nice: true,
    });
    console.log("Date", data)
    const margin = {top: 40}
    const xMax = width
    const yMax = height - margin.top - 100
    dateScale.rangeRound([0, xMax])
    closeScale.range([yMax, 0])

    return (
         <div>
             <svg width={width} height={height}>
                 <rect x={0} y={0} width={width} height={height} fill={'#e0ecff'} rx={14}/>
                 <Grid
                     top={margin.top}
                     left={0}
                     xScale={dateScale}
                     yScale={closeScale}
                     width={xMax}
                     height={yMax}
                     stroke="black"
                     strokeOpacity={0.1}
                     xOffset={dateScale.bandwidth() / 2}
                 />
                 <circle  cx={0} cy={yMax} r={4} fill={'black'} />
                 <AxisBottom
                     top={yMax + margin.top}
                     scale={dateScale}
                     tickFormat={formatDate}
                     stroke={'black'}
                     tickStroke={'black'}
                     tickLabelProps={() => ({
                         fill: 'black',
                         fontSize: 11,
                         textAnchor: "middle"
                     })}
                 />
             </svg>
         </div>
    )

}
