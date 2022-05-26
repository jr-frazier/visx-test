import React from 'react'
import {csv, DSVParsedArray, max, scaleBand, scaleLinear, format} from 'd3'
import useData, { Data } from '../../../hooks/useData'
import AxisBottom from './AxisBottom'
import AxisLeft from "./AxisLeft";
import Marks from './Marks'


type Margin = {
    top: number
    right: number
    bottom: number
    left: number
}

const width = 960
const height = 1000
const margin: Margin = {top: 20, right: 20, bottom: 20, left: 200}

const d3Format = format(".2s")
const formatTickValue = (tickValue: number | { valueOf(): number }) => d3Format(tickValue).replace("G", "B")

export default function BarChart() {

    const data = useData()
    const yValue = (d: Data) => d.countries
    const xValue = (d: Data) => d.population


    if (!data) {
        return <pre>Loading...</pre>;
    }

    const innerHeight = height - margin.top - margin.bottom
    const innerWidth = width - margin.left - margin.right

    const yScale = scaleBand()
        .domain(data.map(yValue))
        .range([0, innerHeight])
        .padding(0.3) // controls the padding between the bars

    const xScale = scaleLinear()
        // @ts-ignore
        .domain([0, max(data, xValue)])
        .range([0, innerWidth])

    return (
        <div style={{border: '1px solid black', height: '1050'}}>

            <svg width={width} height={height + 50}>
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    <AxisBottom xScale={xScale} innerHeight={innerHeight} tickFormat={formatTickValue}/>
                    <AxisLeft yScale={yScale}/>
                    <Marks data={data} yScale={yScale} xScale={xScale} yValue={yValue} xValue={xValue} toolTipFormat={formatTickValue} />
                    <text style={{textAnchor: 'middle'}} x={innerWidth / 2} y={innerHeight + 40}>Population</text>
                </g>

            </svg>

        </div>
    )
}