// unpkg url https://unpkg.com/world-atlas@2.0.2/countries-50m.jsonimport React from 'react'
import {csv, DSVParsedArray, max, scaleBand, scaleLinear, format, extent, scaleTime, timeFormat} from 'd3'
import useWorldData, { Data } from '../../../hooks/useWorldData'
import Marks from './Marks'

const width = 1200
const height = 700

export default function BarChart() {

    const data = useWorldData()

    if (!data) {
        return <pre>Loading...</pre>;
    }


    return (
        <div style={{border: '1px solid black', height: '1050'}}>

            <svg width={width} height={height + 50}>
                    <Marks/>
            </svg>

        </div>
    )
}
