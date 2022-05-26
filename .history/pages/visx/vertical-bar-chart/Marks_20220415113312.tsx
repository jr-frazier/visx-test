import {Data} from "../../../hooks/useData";
import React from "react";
import {DSVParsedArray, ScaleBand, ScaleLinear} from "d3";
/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import {Bar} from "@visx/shape";

interface Props {
    data: DSVParsedArray<Data>
    yScale: ScaleBand<string>
    xScale: ScaleLinear<number, number, never>
    yValue: (d: Data) => string
    xValue: (d: Data) => number
    toolTipFormat: (n: number | { valueOf(): number }) => string
}
export default function Marks({data, yScale, xScale, xValue, yValue, toolTipFormat}: Props) {

    const colors = ["crimson", "royalblue", "lime", "tomato", "gold", "purple", "deeppink", "brown", "forestgreen", "deepskyblue"]

    return (
        <>
            {data.map((d: Data, index) => {
                    return (
                        // <rect
                        //     fill={colors[index]}
                        //     x={0}
                        //     y={yScale(yValue(d))}
                        //     width={xScale(xValue(d))}
                        //     height={yScale.bandwidth()}
                        // >
                        //          <title>{toolTipFormat(xValue(d))}</title>
                        //     </rect>
                        <Bar
                            key={`bar-${index}`}
                            x={0}
                            y={yScale(yValue(d))}
                            width={xScale(xValue(d))}
                            height={yScale.bandwidth()}
                            fill="rgba(23, 233, 217, .5)"
                        />
                    )
                }
            )}
        </>
    )
}
