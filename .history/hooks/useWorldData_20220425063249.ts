import React from "react"
import {json, DSVParsedArray, DSVRowArray, DSVRowString} from "d3"
import {feature} from 'topojson'

export interface Data {
   timestamp: Date
   temperature: number
}

/**
 * Data set for City temperatures over a week in San Francisco
 */
export default function useData():DSVParsedArray<Data> | undefined {
    const [data, setData] = React.useState<DSVParsedArray<Data>>()
    const jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json'
 
    console.log("Data", data)
    React.useEffect(() => {
        json(jsonUrl)
            .then((topojsonData) => {
                
                const {countries} = topojsonData.objects
                setData(feature(topojsonData, countries))
            })
            .catch(err => console.error(err))
    }, [])

    return data
}