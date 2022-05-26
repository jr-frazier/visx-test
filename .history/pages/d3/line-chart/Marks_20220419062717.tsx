import { Data } from '../../../hooks/useData';
import React from 'react';
import { DSVParsedArray, ScaleBand, ScaleTime, ScaleLinear, line} from 'd3';
/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';

interface Props {
    data: DSVParsedArray<Data>;
    yScale: ScaleLinear<number, number, never>;
    xScale: ScaleTime<number, number, never>;
    yValue: (d: Data) => number;
    xValue: (d: Data) => Date;
    toolTipFormat: (n: Date) => string;
    circleRadius: number;
}
export default function Marks({ data, yScale, xScale, xValue, yValue, toolTipFormat, circleRadius }: Props) {


    return (
        <>  
            <path d={line().x(d => xScale(xValue(d))).y(d=> yScale(yValue(d)))(data)} />
            {data.map((d: Data, index) => {
                return (
                    <circle key={index} fill={'teal'} cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={circleRadius}>
                        <title>{toolTipFormat(xValue(d))}</title>
                    </circle>
                );
            })}
        </>
    );
}
