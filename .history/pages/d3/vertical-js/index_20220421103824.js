import useData from '../../../hooks/useData'
import {format} from 'd3'

const width = 960
const height = 1000
const margin = {top: 20, right: 20, bottom: 20, left: 200}

const d3Format = format(".2s")
const formatTickValue = (tickValue) => d3Format(tickValue).replace("G", "B")

export default function BarChart() {

    const data = useData()
    const yValue = (d) => d.countries
    const xValue = (d) => d.population


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
                    {xScale.ticks().map((tickValue) => (
                      <g className='tick' key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
                        <line stroke={'#4f4f4f'} x1={0} y1={0} x2={0} y2={innerHeight}/>
                        <text y={innerHeight + 15} style={{textAnchor: 'middle'}}>{tickFormat(tickValue)}</text>
                      </g>
                    ))}
                    {yScale.domain().map((tickValue) => {
                        return (
                          <text 
                              key={tickValue} 
                              dy={'.32em'} 
                              y={ yScale(tickValue) + yScale.bandwidth() / 2} 
                              x={-10} style= {{textAnchor:'end'}}>{tickValue}
                          </text>
                        )})
                    }
                    {data.map((d, index) => {
                   return (
                       <rect
                           key={d}
                           fill={colors[index]}
                           x={0}
                           y={yScale(yValue(d))}
                           width={xScale(xValue(d))}
                           height={yScale.bandwidth()}
                       >
                            <title>{formatTickValue(xValue(d))}</title>
                       </rect>
                   )
                }
                )}
                    <text style={{textAnchor: 'middle'}} x={innerWidth / 2} y={innerHeight + 40}>Population</text>
                </g>

            </svg>

        </div>
    )
}