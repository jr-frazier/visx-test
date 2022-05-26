
import React from 'react';
import { csv, DSVParsedArray, max, scaleBand, scaleLinear, format, extent, scaleTime, timeFormat, bisector } from 'd3';
import useCityData, { Data } from '../../../hooks/useCityData';
import { GridRows, GridColumns } from '@visx/grid';
// import AxisBottom from './AxisBottom'
// import AxisLeft from "./AxisLeft";
import { AxisBottom, AxisLeft } from '@visx/axis';
import Marks from './Marks';
import { Line, Bar } from '@visx/shape';
import { useTooltip, Tooltip, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';


type Margin = {
    top: number;
    right: number;
    bottom: number;
    left: number;
};

const width = 1200;
const height = 700;
const margin: Margin = { top: 20, right: 20, bottom: 20, left: 200 };

const d3Format = timeFormat('%a');
const formatTickValue = (tickValue: Date) => d3Format(tickValue);

export default function BarChart() {
    const data = useCityData();
    const {showTooltip, hideTooltip, tooltipData, tooltipLeft} = useTooltip();

    const xValue = (d: Data) => d.timestamp;
    const xAxisLabel = 'Timestamp';

    const yValue = (d: Data) => d.temperature;
    const yAxisLabel = 'Temperature';

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const bisectDate = bisector((d) => new Date(d.date)).left
    const getDate = (d) => new Date(d.date)
    const getTempValue = (d) => d.close;

    const yScale = !data? undefined : scaleLinear()
        // @ts-ignore
        .domain(extent(data, yValue))
        .range([innerHeight, 0])
        .nice();

    const xScale = !data? undefined : scaleTime()
        // @ts-ignore
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        .nice();


    const handleTooltip = React.useCallback(
        (event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
            const { x } = localPoint(event) || { x: 0 }
            const x0 = xScale ? xScale.invert(x) : x

            console.log("x: ", x)
              showTooltip({
                tooltipData: {name: 0},
                tooltipLeft: x,
            });
        },
        [showTooltip],
    );

    // const handleTooltip = React.useCallback(
    //     (event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>, yScale, xScale) => {
    //         const { x } = localPoint(event) || { x: 0 };
    //         const x0 = xScale.invert(x);
    //         const index = bisectDate(data, x0, 1);
    //         const d0 = data[index - 1];
    //         const d1 = data[index];
    //         let d = d0;
    //         if (d1 && getDate(d1)) {
    //             d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0;
    //         }
    //         showTooltip({
    //             tooltipData: d,
    //             tooltipLeft: x,
    //             tooltipTop: yScale(getTempValue(d)),
    //         });
    //     },
    //     [showTooltip],
    // );

    if (!data || !xScale || !yScale) {
        return <pre>Loading...</pre>;
    }

    return (
        <div style={{ border: '1px solid black', height: '1050' }}>
            <svg width={width} height={height + 50}>
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    <GridColumns scale={xScale} width={innerWidth} height={innerHeight} stroke="#e0e0e0" />
                    <GridRows scale={yScale} width={innerWidth} height={innerHeight} stroke="#e0e0e0" />
                    <AxisBottom scale={xScale} top={innerHeight} />
                    <text style={{ textAnchor: 'middle' }} x={innerWidth / 2} y={innerHeight + 40}>
                        {xAxisLabel}
                    </text>
                    <AxisLeft scale={yScale} />
                    <text style={{ textAnchor: 'middle' }} x={-innerHeight / 2} y={-100} transform="rotate(-90)">
                        {yAxisLabel}
                    </text>
                    <Marks
                        data={data}
                        yScale={yScale}
                        xScale={xScale}
                        yValue={yValue}
                        xValue={xValue}
                        toolTipFormat={formatTickValue}
                        circleRadius={5}
                        marginLeft={margin.left}
                        marginTop={margin.top}
                        hideTooltip={hideTooltip}
                        showTooltip={showTooltip}
                    />
                </g>
                <Bar
                    x={margin.left}
                    y={margin.top}
                    width={innerWidth}
                    height={innerHeight}
                    fill="transparent"
                    rx={14}
                    // onTouchStart={handleTooltip}
                    // onTouchMove={handleTooltip}
                    onMouseMove={handleTooltip}
                    // onMouseLeave={() => hideTooltip()}
                /> 

                {tooltipData && (
                       <Line
                       from={{ x: tooltipLeft, y: margin.top }}
                       to={{ x: tooltipLeft, y: innerHeight + margin.top }}
                       stroke={'green'}
                       strokeWidth={2}
                       pointerEvents="none"
                       strokeDasharray="5,2"
                     />     
            )}
                
            </svg>
        </div>
    );
}
