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
 * Makes call to un database to get the world population data as of 2020
 */
export default function useData():DSVParsedArray<Data> | undefined {
    const [data, setData] = React.useState<DSVParsedArray<Data>>()
    const gistUrl = 'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/639388c2cbc2120a14dcf466e85730eb8be498bb/iris.csv'
 

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
