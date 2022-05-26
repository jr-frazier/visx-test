import React from 'react'

import { Group } from '@visx/group';
import { curveBasis } from '@visx/curve';
import { LinePath, Circle } from '@visx/shape';
import { Threshold } from '@visx/threshold';
import { scaleTime, scaleLinear } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';

export default function ShapePractice() {
    const width = 500
    const height = 500

    return (
        <div>
            <svg width={width} height={height}>
                <rect x={0} y={0} width={width} height={height} fill={'lightblue'} rx={14} />
                <circle fill={'red'}/>
                <Group>
                    {/*<AxisLeft scale={() => [100, 0]} />*/}
                </Group>
            </svg>
        </div>
    )
}
