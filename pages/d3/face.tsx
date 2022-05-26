import React from 'react'
// import {arc, Arc} from 'd3'
import {Circle, Arc} from '@visx/shape'

export default function Face() {
    const [width, setWidth] = React.useState(960)
    const [height, setHeight] = React.useState(500)
    const [centerX, setCenterX] = React.useState(width / 2)
    const [centerY, setCenterY] = React.useState(height / 2)
    const [strokeWidth, setStrokeWidth] = React.useState(20)
    const [eyeOffsetX, setEyeOffsetX] = React.useState(90)
    const [eyeOffsetY, setEyeOffsetY] = React.useState(-70)
    const [eyeRadius, setEyeRadius] = React.useState(30)
    const [mouthRadius, setMouthRadius] = React.useState(140)
    const [mouthWidth, setMouthWidth] = React.useState(20)
    // const mouthArc: Arc<any, any> = arc()
    //     .innerRadius(mouthRadius)
    //     .outerRadius(mouthRadius + mouthWidth)
    //     .startAngle(Math.PI / 2)
    //     .endAngle(Math.PI * 3/2);

    return (
        <div>
            <svg width={width} height={height}>
                <g transform={`translate(${centerX}, ${centerY})`}>
                    <Circle r={centerY - strokeWidth - 2} fill='yellow' stroke='black'
                            strokeWidth={strokeWidth}/>
                    <Circle r={eyeRadius} cx={-eyeOffsetX} cy={eyeOffsetY}/>
                    <Circle r={eyeRadius} cx={+eyeOffsetX} cy={eyeOffsetY}/>
                    {/* This is implemented using D3.js */}
                    {/*@ts-ignore*/}
                    {/*<path d={mouthArc()}/>*/}
                    <Arc innerRadius={mouthRadius} outerRadius={mouthRadius + mouthWidth} startAngle={Math.PI / 2} endAngle={Math.PI * 3/2} />
                    <g
                        transform='rotate(51 22 45)'
                    >
                        <defs>
                            <clipPath id="cut-off-bottom">
                                <rect x="130" y="0" width="100" height="100" />
                            </clipPath>
                        </defs>
                        <rect strokeWidth={3} stroke={'pink'} fill={'pink'} x="105" width="80" height="70" rx="35" clip-path="url(#cut-off-bottom)"/>
                    </g>
                </g>
            </svg>
        </div>
    )
}
