import ParentSize from '@visx/responsive/lib/components/ParentSize';
import StackChart from './StackChart'
import React from "react";
import {schemeBlues} from 'd3-scale-chromatic'



export default function AreaStackChart(): JSX.Element {

    return (
        <div style={{width: '100%', height: "900px", display: 'flex', justifyContent: 'center', margin: "20px"}}>
            <ParentSize >{({ width, height }) => <StackChart width={width} height={height} colors={schemeBlues[3]} />}</ParentSize>
        </div>
    )
}
