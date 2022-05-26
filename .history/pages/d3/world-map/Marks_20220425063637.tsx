import React from 'react';
import { geoEqualEarth, geoPath } from 'd3';

const projection = geoEqualEarth()
const path = geoPath(projection)

interface Props {
    data: any;
}
export default function Marks({ data }: Props) {
    console.log("Marks", data)

    return (
        <g>  
            {data.features.map((feature , i) => {
                return (
                    <path key={feature.id} d={path(feature)} />
                )
            })}
        </g>
    );
}
