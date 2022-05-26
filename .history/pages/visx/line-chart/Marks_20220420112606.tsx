import { Data } from '../../../hooks/useData';
import React from 'react';
import { DSVParsedArray, ScaleBand, ScaleTime, ScaleLinear, line, curveNatural} from 'd3';
/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import { LinePath } from '@visx/shape';

interface Props {
    data: DSVParsedArray<Data>;
    yScale: ScaleLinear<number, number, never>;
    xScale: ScaleTime<number, number, never>;
    yValue: (d: Data) => number;
    xValue: (d: Data) => Date;
    toolTipFormat: (n: Date) => string;
    circleRadius: number;
    hideTooltip: () => void;
    showTooltip: (args: any) => void;
}
export default function Marks({ data, yScale, xScale, xValue, yValue, toolTipFormat, circleRadius, showTooltip, hideTooltip }: Props) {


    return (
        <>  
            {/* <path 
            d={line().x((d: [number, number]) => xScale(xValue(d))).y(d=> yScale(yValue(d))).curve(curveNatural)(data)} 
            stroke='teal' 
            fill='none' 
            strokeWidth={3} 
            strokeLinejoin={'round'} 
            strokeLinecap={'round'}/> */}

            <LinePath
                  curve={curveNatural}
                  data={data}
                  x={(d) => xScale(xValue(d)) ?? 0}
                  y={(d) => yScale(yValue(d)) ?? 0}
                  stroke="royalblue"
                  strokeWidth={3}
                  shapeRendering="geometricPrecision"
                  markerMid="url(#marker-circle)"
                  
                //   markerStart={markerStart}
                //   markerEnd={markerEnd}
                />  
            {/* {data.map((d: Data, index) => {
                return (
                    <circle key={index} fill={'teal'} cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={circleRadius}>
                        <title>{toolTipFormat(xValue(d))}</title>
                    </circle>
                );
            })} */}
        </>
    );
}
