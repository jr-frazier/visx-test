import React from 'react';
import {AreaStack, Line} from '@visx/shape';
import {curveCardinal, curveStepAfter} from '@visx/curve'
import {GradientPinkBlue} from '@visx/gradient';
import {TooltipWithBounds, useTooltip} from '@visx/tooltip';
import {scaleLinear, scaleUtc, scaleTime} from '@visx/scale';
import {timeParse} from 'd3-time-format';
import {AxisBottom, AxisLeft} from '@visx/axis';
import {localPoint} from '@visx/event';
import {bisector} from 'd3-array';
import {ScaleTime, timeFormat} from 'd3';
// import {Zoom} from '@visx/zoom';
import Zoom from './Zoom'
import {RectClipPath} from '@visx/clip-path';
import {SeriesPoint} from "@visx/shape/lib/types";
import {EventType} from '@visx/event/lib/types';
import {ProvidedZoom, TransformMatrix} from '@visx/zoom/lib/types';
import {Group} from "@visx/group";

interface Data {
    temp1: number;
    temp2: number;
    temp3: number;
    temp4: number;
    temp5: number;
    date: string;
}

const data: Array<Data> = [
    {temp1: 10, temp2: 15, temp3: 5, temp4: 20, temp5: 7, date: '2020-01-01'},
    {temp1: 20, temp2: 25, temp3: 10, temp4: 40, temp5: 8, date: '2020-01-02'},
    {temp1: 25, temp2: 30, temp3: 15, temp4: 45, temp5: 9, date: '2020-01-03'},
    {temp1: 30, temp2: 35, temp3: 20, temp4: 10, temp5: 30, date: '2020-01-04'},
    {temp1: 35, temp2: 36, temp3: 25, temp4: 50, temp5: 4, date: '2020-01-05'},
    {temp1: 35, temp2: 38, temp3: 30, temp4: 25, temp5: 5, date: '2020-01-06'},
    {temp1: 30, temp2: 40, temp3: 25, temp4: 30, temp5: 7, date: '2020-01-07'},
    {temp1: 33, temp2: 35, temp3: 10, temp4: 15, temp5: 10, date: '2020-01-08'},
    {temp1: 40, temp2: 20, temp3: 15, temp4: 25, temp5: 19, date: '2020-01-09'},
    {temp1: 20, temp2: 25, temp3: 35, temp4: 5, temp5: 13, date: '2020-01-11'},
    {temp1: 13, temp2: 18, temp3: 33, temp4: 4, temp5: 10, date: '2020-01-12'},
    {temp1: 30, temp2: 12, temp3: 30, temp4: 3, temp5: 8, date: '2020-01-13'},
    {temp1: 3, temp2: 5, temp3: 25, temp4: 2, temp5: 7, date: '2020-01-14'},
];

const keys = Object.keys(data[0]).filter((k) => k !== 'date');
const parseDate = timeParse('%Y-%m-%d');
export const background = 'blue';

const getDate = (d: Data) => (parseDate(d.date) || 0).valueOf();
const getY0 = (d: SeriesPoint<Data>) => d[0];
const getY1 = (d: SeriesPoint<Data>) => d[1];
const colors = ["red", "orange", "yellow", "green", "blue"].reverse()
const initialDomain = [Math.min(...data.map(getDate)), Math.max(...data.map(getDate))]
const bisectDate = bisector((d: Data) => new Date(d.date)).left;
const getTempValue1 = data ? (d: Data) => d.temp1 : () => 0;

interface Props {
    width: number;
    height: number;
    events?: boolean;
}

export default function StackChart({width, height, events = false}: Props) {
    // bounds
    const margin = {top: 50, right: 50, bottom: 50, left: 50, zero: 0}

    // calculate the x- and y- max (in pixels) based on the width/height and the margins
    const yMax = height - margin.top - margin.bottom;
    const xMax = width - margin.right - margin.left;

    const {showTooltip, hideTooltip, tooltipData, tooltipLeft, tooltipTop} = useTooltip();

    const xScale = scaleTime({
        domain: initialDomain,
        range: [0, xMax]
    });

    const yScale = scaleLinear({
        domain: [0, yMax],
        range: [yMax, 0],
        zero: true,
    });

    type Shit = {
        initialTransformMatrix: TransformMatrix;
        transformMatrix: TransformMatrix;
        isDragging: boolean;
    }

    function rescaleXAxis(scale: ScaleTime<number, number, never>, zoom: ProvidedZoom<Element> & Shit) {
        const newDomain = scale
            .range()
            .map(r => scale.invert((r - zoom.transformMatrix.translateX) / zoom.transformMatrix.scaleX))
        return scale.copy().domain(newDomain)
    }

    return width < 10 ? null : (
        <div style={{border: '1px solid black'}}>
            <Zoom
                width={width}
                height={height}
                scaleXMin={0.5}
                scaleXMax={4}
                left={margin.left}
            >
                {(zoom) => {
                    const rescaledXAxis = rescaleXAxis(xScale, zoom)

                    function handleTooltip(event: Element | EventType) {
                        if (!data || !rescaledXAxis || !yScale) {
                            return;
                        }
                        const {x: xp} = localPoint(event) || {x: 0};
                        const x = xp - margin.left
                        const x0 = rescaledXAxis.invert(x);
                        const index = bisectDate(data, x0, 1);
                        const d0 = data[index - 1];
                        const d1 = data[index];
                        let d = d0;
                        if (d1 && getDate(d)) {
                            d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0;
                        }
                        showTooltip({
                            tooltipData: timeFormat('%c')(x0),
                            tooltipLeft: x,
                            tooltipTop: getTempValue1(d0),
                        });
                    }

                    return (
                        // @ts-ignore TS is bitching about the ref
                        <svg width={width} height={height} ref={zoom.containerRef}>
                            <Group left={margin.left} top={margin.top}>
                                <RectClipPath
                                    id="zoom-clip"
                                    width={xMax}
                                    height={yMax}/>
                                <AxisLeft
                                    scale={yScale}
                                    label={"Temperature"}
                                />
                                <AxisBottom
                                    scale={rescaledXAxis}
                                    top={height - margin.top - margin.bottom}
                                />
                                <GradientPinkBlue id="stacked-pink-blue"/>
                                <AreaStack
                                    keys={keys}
                                    data={data}
                                    x={(d) => rescaledXAxis(getDate(d.data))}
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
                                                clipPath="url(#zoom-clip)"
                                            />
                                        ))
                                    }
                                </AreaStack>
                                <rect
                                    width={xMax}
                                    height={yMax}
                                    fill="transparent"
                                    onMouseMove={handleTooltip}
                                    onMouseLeave={() => hideTooltip()}
                                />
                                {tooltipData && <Line
                                    from={{x: (tooltipLeft || 0), y: 0}}
                                    to={{x: (tooltipLeft || 0), y: yMax}}
                                    stroke={'black'}
                                    strokeWidth={1}
                                    pointerEvents="none"
                                    strokeDasharray="5,2"
                                />}
                            </Group>
                        </svg>)
                }}
            </Zoom>
            {tooltipData && (
                <div>
                    <TooltipWithBounds
                        key={Math.random()}
                        left={tooltipLeft}
                    >
                        <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
                            <div>
                                Date: {tooltipData}
                            </div>
                            <div>
                                temp1: {tooltipTop}
                            </div>
                            <div>
                                temp2: {tooltipTop}
                            </div>
                        </div>
                    </TooltipWithBounds>
                </div>
            )}
        </div>
    );
}
