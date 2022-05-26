import { Data } from '../../../hooks/useData';
import React from 'react';
import { DSVParsedArray, ScaleBand, ScaleLinear } from 'd3';
/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';

interface Props {
    data: DSVParsedArray<Data>;
    yScale: ScaleLinear<number, number, never>;
    xScale: ScaleLinear<number, number, never>;
    yValue: (d: Data) => string;
    xValue: (d: Data) => number;
    toolTipFormat: (n: number | { valueOf(): number }) => string;
}
export default function Marks({ data, yScale, xScale, xValue, yValue, toolTipFormat }: Props) {


    return (
        <>
            {data.map((d: Data, index) => {
                return (
                    <circle key={index} fill={'teal'} cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={10}>
                        <title>{toolTipFormat(xValue(d))}</title>
                    </circle>
                );
            })}
        </>
    );
}
