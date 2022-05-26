import {Data} from "../../../hooks/useData";
import React from "react";
import {ScaleBand} from 'd3'

interface Props {
    yScale: ScaleBand<string>
}

export default function AxisLeft({yScale}: Props): JSX.Element {
    return (
        <>
            {
                yScale.domain().map((tickValue: string) => {
                    // @ts-ignore TS believes that the yScale() function is possibly undefined 🤷
                    return <text key={tickValue} dy={'.32em'} y={ yScale(tickValue) + yScale.bandwidth() / 2} x={-10} style={{textAnchor: 'end'}}>{tickValue}</text>
                })
            }
        </>
    )
}