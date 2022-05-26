import { Data } from '../../../hooks/useData';
import React from 'react';
import { DSVParsedArray, ScaleBand, ScaleTime, ScaleLinear, line, curveNatural} from 'd3';
/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';

interface Props {
    
}
export default function Marks() {


    return (
        <g>  
            {data.features.map((d) => {
                return (
                    <path d={} />
                )
            })}
        </g>
    );
}
