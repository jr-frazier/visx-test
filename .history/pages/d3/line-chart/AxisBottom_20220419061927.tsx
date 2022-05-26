import React from "react";
import {ScaleTime} from 'd3'


interface Props {
    xScale: ScaleTime<number, number, never>
    innerHeight: number
    tickFormat: (n: Date) => string
}

export default function AxisBottom({xScale, innerHeight, tickFormat}: Props): JSX.Element {

    return (
        <>
            {xScale.ticks().map((tickValue: Date) => (
                <g className='tick' key={`${tickValue}`} transform={`translate(${xScale(tickValue)}, 0)`}>
                    <line stroke={'#4f4f4f'} x1={0} y1={0} x2={0} y2={innerHeight}/>
                    <text y={innerHeight + 20} style={{textAnchor: 'middle'}}>{tickFormat(tickValue)}</text>
                </g>
            ))}
        </>
    )
}
