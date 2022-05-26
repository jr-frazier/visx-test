import React from "react";
import {csv, DSVParsedArray, DSVRowArray, DSVRowString} from "d3";

export interface Data {
    countries: string
    notes: string
    country_code: string
    type: string
    parent_code: string
    population: number
    2020: string
}

/**
 * Makes call to un database to get the world population data as of 2020
 */
export default function useData():DSVParsedArray<Data> | undefined {
    const [data, setData] = React.useState<DSVParsedArray<Data>>()
    // const gistUrl = 'https://gist.githubusercontent.com/jr-frazier/cf700884808303ed83d41101955ec2fd/raw/un_world_population_2020.csv'
    const gistUrl = 'https://gist.githubusercontent.com/netj/8836201/raw/iris.csv'

    React.useEffect(() => {
        const row: unknown = (d: Data) => {
            d.population = +d['2020'] * 1000;
            return d;
        };

        csv(gistUrl, row as DSVRowString)
            .then((response) => setData(response.slice(0, 10)))
            .catch(err => console.error(err))
    }, [])

    return data
}
