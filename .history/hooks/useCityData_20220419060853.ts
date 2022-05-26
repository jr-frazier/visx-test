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
    const gistUrl = 'https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/7d4c3914cc6a29a7f5165f7d5d82b735d97bcfe4/week_temperature_sf.csv'
 

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
