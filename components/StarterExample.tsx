import {AnimatedAxis, AnimatedGrid, AnimatedLineSeries, Tooltip, XYChart,} from '@visx/xychart';
import {scaleThreshold} from '@visx/scale';
import {appleStock,} from '@visx/mock-data'
import {Zoom} from '@visx/zoom';

const data1 = appleStock.slice(0, 100)

const data2 = appleStock.slice(0, 100).map((x, i) => {
        // return i % 2 === 0 ? {...x, close: x.close + Math.floor(Math.random() * 10)} : {...x, close: x.close - Math.floor(Math.random() * 5)}
        return {...x, close: x.close - 50}
    }
)


const accessors = {
    xAccessor: d => d.date,
    yAccessor: d => d.close,
};

const threshold = scaleThreshold({
    domain: [0.02, 0.04, 0.06, 0.08, 0.1],
    range: ['#f2f0f7', '#dadaeb', '#bcbddc', '#9e9ac8', '#756bb1', '#54278f'],
});


export default function StarterExample() {
    const width = 900
    const height = 400

    return (
        <Zoom<SVGSVGElement>
            width={width}
            height={height}
            // scaleXMin={1 / 2}
            // scaleXMax={4}
            // scaleYMin={1 / 2}
            // scaleYMax={4}
            // wheelDelta={(event) => event}
            // initialTransformMatrix={initialTransform}
        >
            {(zoom) => {
                console.log("Zoom", zoom)
                return (<div ref={zoom.containerRef}>
                    <XYChart height={height} width={width} xScale={{type: 'band'}} yScale={{type: 'linear'}}>
                        <AnimatedAxis orientation="bottom"/>
                        <AnimatedAxis orientation='left'/>
                        <AnimatedGrid columns={false} numTicks={4}/>
                        <AnimatedLineSeries
                            dataKey="Line 1"
                            data={data1}
                            {...accessors}
                            onWheel={(e) => console.log("Wheel")}
                        />
                        {/*<AnimatedLineSeries dataKey="Line 2" data={data2} {...accessors} />*/}
                        <Tooltip
                            snapTooltipToDatumX
                            snapTooltipToDatumY
                            showVerticalCrosshair
                            showSeriesGlyphs
                            renderTooltip={({tooltipData, colorScale}) => (
                                <div>
                                    <div style={{color: (tooltipData.nearestDatum.key)}}>
                                        {tooltipData.nearestDatum.key}
                                    </div>
                                    {accessors.xAccessor(tooltipData.nearestDatum.datum)}
                                    {', '}
                                    {accessors.yAccessor(tooltipData.nearestDatum.datum)}
                                </div>
                            )}
                        />
                    </XYChart>

                </div>)
            }}
        </Zoom>

    )
}
