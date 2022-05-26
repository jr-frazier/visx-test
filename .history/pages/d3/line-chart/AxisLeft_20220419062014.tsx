import { Data } from '../../../hooks/useData';
import React from 'react';
import { ScaleTime } from 'd3';

interface Props {
    yScale: ScaleTime<number, number, never>;
    innerWidth: number;
}

export default function AxisLeft({ yScale, innerWidth }: Props): JSX.Element {
    console.log("ticks", yScale.ticks())
    return (
        <>
            {yScale.ticks().map((tickValue: Date) => {
                // @ts-ignore TS believes that the yScale() function is possibly undefined 🤷
                return (
                    <g className="tick" key={`${tickValue}`} transform={`translate(0, ${yScale(tickValue)})`}>
                        <line stroke={'#4f4f4f'} x1={0} y1={0} x2={innerWidth} y2={0} />
                        <text key={`${tickValue}`} dy={'.32em'} y={0} x={-10} style={{ textAnchor: 'end' }}>
                            {tickValue}
                        </text>
                    </g>
                );
            })}
        </>
    );
}
