import {Data} from "../../../hooks/useData";
import React from "react";
import {ScaleL} from 'd3'

interface Props {
    yScale: ScaleLinear<number, number, never>
}

export default function AxisLeft({yScale}: Props): JSX.Element {
    return (
        <>
            {
                yScale.ticks().map((tickValue: string) => {
                    // @ts-ignore TS believes that the yScale() function is possibly undefined 🤷
                    return <text key={tickValue} dy={'.32em'} y={ yScale(tickValue)} x={-10} style={{textAnchor: 'end'}}>{tickValue}</text>
                })
            }
        </>
    )
}
