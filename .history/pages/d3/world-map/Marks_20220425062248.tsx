import React from 'react';
import { geoEqualEarth, geoPath } from 'd3';

const projection = geoEqualEarth()
const path = geoPath(projection)

interface Props {
    
}
export default function Marks() {


    return (
        <g>  
            {data.features.map((feature) => {
                return (
                    <path d={path(feature)} />
                )
            })}
        </g>
    );
}
