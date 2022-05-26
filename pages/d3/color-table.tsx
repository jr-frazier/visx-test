import React from 'react'
import axios from 'axios'
import {arc, Arc, csvParse, pie, Pie} from 'd3'

interface Data {
    specification: string
    keyword: string
    rgb_hex_value: string
}

export default function ColorTable() {
    const width = 960
    const height = 1000
    const gistUrl = 'https://gist.githubusercontent.com/jr-frazier/1feabb463768158e788c5247f37fd1a4/raw/csv-color-spec.csv'
    const [rawData, setRawData] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const centerX = width / 2
    const centerY = height / 2
    const data = csvParse(rawData)


    React.useEffect(() => {
        setLoading(true)
        axios.get(gistUrl)
            .then(response => setRawData(response.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [])

    const DataDisplay = (data: Array<any>) => {
        return data
    }

    const pieArc: Arc<any, any> = arc()
        .innerRadius(0)
        .outerRadius(width)

    const colorPie: Pie<any, any> = pie().value(1)

    return (
        <>
            <p>Chart that loads color table data from <u><a
                href={'https://developer.mozilla.org/en-US/docs/Web/CSS/color_value'}>MDN Docs</a></u></p>
            <div>
                {loading ?
                    <p>...Loading</p>
                    :
                    <svg width={width} height={height}>
                        <g transform={`translate(${centerX}, ${centerY})`}>
                            {colorPie(data as unknown as Array<Data>).map((d, i) => <path key={`${d.data.rgb_hex_value}-${i}`}
                                                                                  fill={`${d.data.rgb_hex_value}`}
                                                                                  d={pieArc(d)}/>)}
                        </g>
                    </svg>
                    // <svg width={width} height={height}>
                    //     <g transform={`translate(${centerX}, ${centerY})`}>
                    //         {(data as unknown as Array<Data>).map((d, i) => <path key={`${d.rgb_hex_value}-${i}`}
                    //                                                               fill={`${d.rgb_hex_value}`}
                    //                                                               d={pieArc({
                    //                                                                   startAngle: i / data.length * 2 * Math.PI,
                    //                                                                   endAngle: (i + 1) / data.length * 2 * Math.PI
                    //                                                               })}/>)}
                    //     </g>
                    // </svg>
                }
            </div>


        </>
    )
}
