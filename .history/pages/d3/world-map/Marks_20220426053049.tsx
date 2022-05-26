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
            <path d={path({type: "Sphere"})} fill={'lightblue'} stroke={'white'} />
            {data.features.map((feature) => {
                return (
                    <path key={feature.properties.name} d={path(feature)} fill={'green'} stroke={'white'} />
                )
            })}
        </g>
    );
}
