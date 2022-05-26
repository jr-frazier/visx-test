import React from 'react'
import {csv, DSVParsedArray, max, scaleBand, scaleLinear, format, extent} from 'd3'
import useCityData, { Data } from '../../../hooks/useCityData'
import AxisBottom from './AxisBottom'
import AxisLeft from "./AxisLeft";
import Marks from './Marks'


type Margin = {
    top: number
    right: number
    bottom: number
    left: number
}

const width = '100vw'
const height = 1000
const margin: Margin = {top: 20, right: 20, bottom: 20, left: 200}

const d3Format = format(".2s")
const formatTickValue = (tickValue: number | { valueOf(): number }) => d3Format(tickValue).replace("G", "B")

export default function BarChart() {

    const data = useCityData()

    const xValue = (d: Data) => d.timestamp
    const xAxisLabel = "Timestamp"

    const yValue = (d: Data) => d.temperature
    const yAxisLabel = "Temperature"


    if (!data) {
        return <pre>Loading...</pre>;
    }
  
    const innerHeight = height - margin.top - margin.bottom
    const innerWidth = width - margin.left - margin.right

    /**
     * for Scatter plots this should be a Linear Scale
     */
    const yScale = scaleLinear()
        // @ts-ignore
        .domain(extent(data, yValue))
        .range([innerHeight, 0])

    const xScale = scaleLinear()
        // @ts-ignore
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        .nice()

    return (
        <div style={{border: '1px solid black', height: '1050'}}>

            <svg width={width} height={height + 50}>
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    <AxisBottom xScale={xScale} innerHeight={innerHeight} tickFormat={formatTickValue}/>
                    <text style={{textAnchor: 'middle'}} x={innerWidth / 2} y={innerHeight + 40}>{xAxisLabel}</text>
                    <AxisLeft yScale={yScale} innerWidth={innerWidth}/>
                    <text style={{textAnchor: 'middle'}} x={-innerHeight / 2} y={-100} transform="rotate(-90)">{yAxisLabel}</text>
                    <Marks data={data} yScale={yScale} xScale={xScale} yValue={yValue} xValue={xValue} toolTipFormat={formatTickValue} circleRadius={5} />
                </g>

            </svg>

        </div>
    )
}
