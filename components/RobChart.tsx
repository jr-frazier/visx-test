import {Axis, Grid, LineSeries, Tooltip, XYChart} from '@visx/xychart';
import {RenderTooltipParams} from '@visx/xychart/lib/components/Tooltip';
import React, {useMemo} from 'react';
import {Zoom} from "@visx/zoom";
import {RectClipPath} from '@visx/clip-path';

type Point = [number, number]

const series: Array<Point> = [...Array(101)].map((x, index) => [index, Math.sin(index/5) + 1])
const series2: Array<Point> = [...Array(101)].map((x, index) => [index, Math.cos(index/7) + 1])

function Chart({width, height}: {width: number, height: number}) {
    const {min, max} = useMemo(
        () => {
            return {
                min: [series, series2].reduce((minS, s) => Math.min(minS, s.reduce((m, p) => Math.min(m, p[0]), Infinity)), Infinity),
                max: [series, series2].reduce((minS, s) => Math.max(minS, s.reduce((m, p) => Math.max(m, p[0]), -Infinity)), -Infinity)
            }
        },
        []
    )
    /**
     * Renders the tooltip for the nearest data point to the mouse.
     * @param params The tooltip params
     */
    function renderTooltip(params: RenderTooltipParams<Point>): JSX.Element {
        const {tooltipData, colorScale} = params
        if (tooltipData === undefined || colorScale === undefined) {
            return <div/>
        }

        const {nearestDatum} = tooltipData
        if (nearestDatum === undefined) {
            return <div/>
        }
        const {key, datum} = nearestDatum
        const legendRadius = 5
        return <div>
            <div style={{marginBottom: 5, fontSize: '0.9em', fontWeight: 700}}>
                Time {datum[0]}
            </div>
            <div style={{color: colorScale(key), fontWeight: 600}}>
                {key}
                <svg width={legendRadius * 2} height={legendRadius * 2} style={{marginLeft: 5}}>
                    <circle fill={colorScale(key)} r={legendRadius} cx={legendRadius} cy={legendRadius}/>
                </svg>
            </div>
            <div style={{marginLeft: 10 + legendRadius}}>
                Value {datum[1]}
            </div>
        </div>
    }

    const originalDomain = max - min

    return (
        <Zoom width={width} height={500}>
            {(zoom => {
                const {translateX, scaleX} = zoom.transformMatrix
                const tx = translateX * originalDomain / (width - 100)
                const domain = [-tx / scaleX, (originalDomain - tx) / scaleX]
                return (
                    <div
                        // @ts-ignore
                        ref={zoom.containerRef}
                    >
                        <XYChart
                            height={500}
                            width={width}
                            xScale={{type: 'linear', zero: false, domain, range: [50, width-50]}}
                            yScale={{type: 'linear', zero: true}}
                        >
                            <RectClipPath id="zoom-clip" x={50} y={50} width={width-100} height={400}/>
                            <Grid columns={false} lineStyle={{strokeWidth: 1, stroke: 'lightgray'}}/>
                            <>
                                <LineSeries
                                    dataKey="series1"
                                    data={series}
                                    xAccessor={datum => datum[0]}
                                    yAccessor={datum => datum[1]}
                                    clipPath="url(#zoom-clip)"
                                />
                                <LineSeries
                                    dataKey="series2"
                                    data={series2}
                                    xAccessor={datum => datum[0]}
                                    yAccessor={datum => datum[1]}
                                    clipPath="url(#zoom-clip)"
                                />
                            </>
                            <Axis
                                key="series-chart-x-axis"
                                orientation="bottom"
                                label="time"
                                strokeWidth={1}
                            />
                            <Axis
                                key="series-chart-y-axis"
                                orientation="left"
                                label="zoomable"
                            />
                            <Tooltip<Point>
                                snapTooltipToDatumX
                                snapTooltipToDatumY
                                showVerticalCrosshair
                                verticalCrosshairStyle={{strokeWidth: 1}}
                                showSeriesGlyphs
                                renderTooltip={renderTooltip}
                            />
                        </XYChart>
                    </div>
                )
            })}

        </Zoom>
    );
}

export default Chart;
