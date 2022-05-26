import React from "react"
import {csv, DSVParsedArray, DSVRowArray, DSVRowString} from "d3"

export interface Data {
    sepal_length: number
    sepal_width: number
    petal_length: number
    petal_width: number
    species: string
}

/**
 * Data set for City temperatures over a week in Seattle, WA
 */
export default function useData():DSVParsedArray<Data> | undefined {
    const [data, setData] = React.useState<DSVParsedArray<Data>>()
    const gistUrl = 'https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/7d4c3914cc6a29a7f5165f7d5d82b735d97bcfe4/week_temperature_sf.csv'
 

    React.useEffect(() => {
        const row: unknown = (d: Data) => {
            d.sepal_length = +d.sepal_length
            d.sepal_width = +d.sepal_width 
            d.petal_length = +d.petal_length
            d.petal_width = +d.petal_width
            return d;
        };

        csv(gistUrl, row as DSVRowString)
            .then((response) => setData(response))
            .catch(err => console.error(err))
    }, [])

    return data
}
