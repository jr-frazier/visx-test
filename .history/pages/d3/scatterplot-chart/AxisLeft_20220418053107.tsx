import {Data} from "../../../hooks/useData";
import React from "react";
import {ScaleLinear} from 'd3'

interface Props {
    yScale: ScaleLinear<number, number, never>
    innerWidth: number;
}

export default function AxisLeft({yScale, innerWidth}: Props): JSX.Element {
    return (
        <>
            {
                yScale.ticks().map((tickValue: number) => {
                    // @ts-ignore TS believes that the yScale() function is possibly undefined 🤷
                   return <g className='tick' key={tickValue} transform={`translate(${yScale(tickValue)}, 0)`}>
                        <line stroke={'#4f4f4f'} x1={0} y1={0} x2={innerWidth} y2={0}/>
                        <text key={tickValue} dy={'.32em'} y={ yScale(tickValue)} x={-10} style={{textAnchor: 'end'}}>{tickValue}</text>
                    </g>
                })
            }
        </>
    )
}

