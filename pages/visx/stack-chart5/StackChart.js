import React from 'react';
import {AreaStack, Line, Bar} from '@visx/shape';
import {curveCardinal, curveStepAfter} from '@visx/curve'
import {SeriesPoint} from '@visx/shape/lib/types';
import {GradientPinkBlue} from '@visx/gradient';
import {useTooltip, Tooltip, defaultStyles, TooltipWithBounds} from '@visx/tooltip';
// import cityTemperature, { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import {scaleTime, scaleLinear, scaleBand, updateScale, scaleUtc} from '@visx/scale';
import {timeParse} from 'd3-time-format';
import {AxisBottom, AxisLeft} from '@visx/axis';
import {localPoint} from '@visx/event';
import {bisector} from 'd3-array';
import {timeFormat} from 'd3';
import {Zoom} from '@visx/zoom';
import {RectClipPath} from '@visx/clip-path';
import {dividerClasses} from '@mui/material';
import {to} from 'react-spring';

import browserUsage, {BrowserUsage} from '@visx/mock-data/lib/mocks/browserUsage';

const data = [
    {temp1: 10, temp2: 15, temp3: 5, temp4: 20, temp5: 7, date: 0},
    {temp1: 40, temp2: 20, temp3: 15, temp4: 25, temp5: 19, date: 10},
    {temp1: 20, temp2: 25, temp3: 10, temp4: 40, temp5: 8, date: 20},
    {temp1: 25, temp2: 30, temp3: 15, temp4: 45, temp5: 9, date: 30},
    // {temp1: 30, temp2: 35, temp3: 20, temp4: 10, temp5: 30, date: 40},
    // {temp1: 35, temp2: 36, temp3: 25, temp4: 50, temp5: 4, date: 50},
    // {temp1: 35, temp2: 38, temp3: 30, temp4: 25, temp5: 5, date: 60},
    // {temp1: 30, temp2: 40, temp3: 25, temp4: 30, temp5: 7, date: 70},
    // {temp1: 33, temp2: 35, temp3: 10, temp4: 15, temp5: 10, date: 80},
    // {temp1: 40, temp2: 20, temp3: 15, temp4: 25, temp5: 19, date: 90},
    // {temp1: 20, temp2: 25, temp3: 35, temp4: 5, temp5: 13, date: 100},
];

const min = 0
const max = 30
// const data = browserUsage
const keys = Object.keys(data[0]).filter((k) => k !== 'date');
// const parseDate = timeParse('%Y %b %d');
export const background = 'blue';

const getY0 = (d) => d[0] / 1;
const getY1 = (d) => d[1] / 1;
// const colors = ['green', 'red', 'blue', 'orange', 'purple', 'yellow']

export default function StackChart({
                                       width,
                                       height,
                                       // margin = {top: 50, right: 50, bottom: 50, left: 50},
                                       events = false,
                                   }) {
    // bounds
    const [margin, setMargin] = React.useState({top: 50, right: 50, bottom: 50, left: 50})
    const yMax = height - margin.top - margin.bottom;
    const xMax = width - margin.left - margin.right;
    const {showTooltip, hideTooltip, tooltipData, tooltipLeft, tooltipTop} = useTooltip();
    const getTempValue1 = data ? (d) => d.temp1 : () => 0;
    const getTempValue2 = data ? (d) => d.temp2 : () => 0;
    const colors = ["red", "orange", "yellow", "green", "blue"].reverse()
    // const originalDomain = initialDomain[1] - Math.min(...data.map(getDate))
    // const originalDomain = Math.max(...data.map(getDate)) - Math.min(...data.map(getDate))


    ////////////////////////////////////////////////////////////////////////////////////////////
    // const min = Math.min(...data.map(getDate))
    // const max = Math.max(...data.map(getDate))
    //
    //
    // const xScale = scaleTime({
    //     domain: [min, max],
    //     range: [0, xMax],
    //     padding: 0.5,
    // });
    //
    // const yScale = scaleLinear({
    //     domain: [0, yMax],
    //     range: [yMax, 0],
    //     zero: true,
    // });
    //
    // const handleTooltip = (event) => {
    //     if (!data || !xScale || !yScale) {
    //         return;
    //     }
    //     const {x} = localPoint(event) || {x: 0};
    //     const x0 = xScale.invert(x - margin.left);
    //     const index = bisectDate(data, x0, 1);
    //     const d0 = data[index - 1];
    //     const d1 = data[index];
    //     let d = d0;
    //     if (d1 && getDate(d)) {
    //         d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0;
    //     }
    //     showTooltip({
    //         tooltipData: timeFormat('%c')(x0),
    //         tooltipLeft: x,
    //         tooltipTop: [getTempValue1(d0), getTempValue2(d0)],
    //     });
    // };
    ///////////////////////////////////////////////

    const handleTooltip = (event) => {
        const {x} = localPoint(event) || {x: 0};
        // console.log("Local Point", x - margin.left, xMax)

    }

    return width < 10 ? null : (
        <div style={{border: '1px solid black', marginTop: '20px'}}>
            <Zoom
                width={width}
                height={height}
                scaleXMin={0.5}
                scaleXMax={4}
                scaleYMin={0}
                scaleYMax={yMax}
                initialTransformMatrix={{
                    scaleX: 1,
                    scaleY: 1,
                    translateX: 1,
                    translateY: 1,
                    skewX: 0,
                    skewY: 0,
                }}
            >
                {(zoom, event) => {

                    const {translateX, scaleX} = zoom.transformMatrix
                    // const tx = translateX * max / (width - (margin.right + margin.left))
                    const tx = (translateX * max + scaleX) / (width - (margin.right + margin.left))
                    const domain = [-tx / scaleX, (max - tx) / scaleX]
                    // const domain = [min + scaleX, max]
                    // rp
                    //                     const [start, end] = initialDomain
                    //                     const domain = [tx - (tx - start) / scaleX, tx + (end - tx) / scaleX]
                    const xScale = scaleLinear({
                        domain: [min, max],
                        range: [0, xMax],
                        padding: 0.5,
                    });

                    const yScale = scaleLinear({
                        domain: [0, yMax],
                        range: [yMax, 0],
                        zero: true,
                    });



                    console.log("New Scale", translateX )
                    // console.log("local point", event.transform.rescaleX(126))

                    return (<svg width={width} height={height} ref={zoom.containerRef}>
                        <RectClipPath id="zoom-clip" x={50} y={50} width={width - 100} height={400}/>
                        <g
                            // transform={`translate(${margin.left}, ${margin.top})`}
                            transform={`translate(${margin.left}, ${margin.top})`}

                        >
                            <AxisLeft scale={yScale} label={"Temperature"}/>
                            <AxisBottom scale={xScale} top={height - margin.top - margin.bottom}/>
                            <GradientPinkBlue id="stacked-pink-blue"/>
                            <AreaStack
                                top={margin.top}
                                left={margin.left}
                                keys={keys}
                                data={data}
                                x={(d) => {
                                    // console.log("DATA", xScale(d.data.date))
                                    return xScale(d.data.date)
                                }
                            }
                                y0={(d) => yScale(getY0(d)) ?? 0}
                                y1={(d) => yScale(getY1(d)) ?? 0}
                                curve={curveStepAfter}
                            >
                                {({stacks, path}) =>
                                    stacks.map((stack, i) => (
                                        <path
                                            key={`stack-${stack.key}`}
                                            d={path(stack) || ''}
                                            stroke="transparent"
                                            fill={colors[i]}
                                            onClick={() => {
                                                if (events) alert(`${stack.key}`);
                                            }}
                                        />
                                    ))
                                }
                            </AreaStack>
                            <rect
                                width={xMax}
                                height={yMax}
                                fill="transparent"
                                rx={0}
                                onMouseMove={handleTooltip}
                                onMouseLeave={() => hideTooltip()}
                            />


                        </g>
                        {/*{tooltipData && (*/}
                        {/*    <g>*/}
                        {/*        <Line*/}
                        {/*            from={{x: tooltipLeft, y: margin.top}}*/}
                        {/*            to={{x: tooltipLeft, y: xMax + margin.top}}*/}
                        {/*            stroke={'black'}*/}
                        {/*            strokeWidth={2}*/}
                        {/*            pointerEvents="none"*/}
                        {/*            strokeDasharray="5,2"*/}
                        {/*        />*/}
                        {/*    </g>*/}
                        {/*)}*/}
                    </svg>)
                }}
            </Zoom>
            {tooltipData && (
                <div>
                    <TooltipWithBounds
                        key={Math.random()}
                        // top={tooltipTop}
                        left={tooltipLeft}
                        // style={tooltipStyles}
                    >
                        <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
                            <div>
                                Date: {tooltipData.split(",")[0]}
                            </div>
                            <div>
                                temp1: {tooltipTop[0]}
                            </div>
                            <div>
                                temp2: {tooltipTop[1]}
                            </div>
                        </div>
                    </TooltipWithBounds>
                    {/* <Tooltip
                        top={innerHeight + margin.top - 14}
                        left={tooltipLeft}
                        style={{
                            ...defaultStyles,
                            minWidth: 72,
                            textAlign: 'center',
                            transform: 'translateX(-50%)',
                        }}
                    >
                        {tooltipData}
                    </Tooltip> */}
                </div>
            )}

        </div>
    );
}
