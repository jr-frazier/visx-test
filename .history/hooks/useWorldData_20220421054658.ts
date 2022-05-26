import React from "react"
import {csv, DSVParsedArray, DSVRowArray, DSVRowString} from "d3"

export interface Data {
   timestamp: Date
   temperature: number
}

/**
 * Data set for City temperatures over a week in San Francisco
 */
export default function useData():DSVParsedArray<Data> | undefined {
    const [data, setData] = React.useState<DSVParsedArray<Data>>()
    const gistUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.jsonimport'
 

    React.useEffect(() => {
        const row: unknown = (d: Data) => {
            d.temperature = +d.temperature
            d.timestamp = new Date(d.timestamp) 
            return d;
        };

        csv(gistUrl, row as DSVRowString)
            .then((response) => setData(response))
            .catch(err => console.error(err))
    }, [])

    return data
}
