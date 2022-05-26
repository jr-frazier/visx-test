import React from 'react';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { GradientOrangeRed } from '@visx/gradient';
import { Group } from '@visx/group';
import { browserUsage, genDateValue, appleStock } from '@visx/mock-data';
import { scaleLinear } from '@visx/scale';
import { Bar } from '@visx/shape';


const data = appleStock;

export default function StarterExample() {
    console.log(data)
    return <div>This is a starter</div>
}