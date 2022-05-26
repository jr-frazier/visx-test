import React from 'react';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { GradientOrangeRed } from '@visx/gradient';
import { Group } from '@visx/group';
import { browserUsage, genDateValue, appleStock } from '@visx/mock-data';
import { scaleLinear } from '@visx/scale';
import { Bar } from '@visx/shape';

type Data = {
    date: string; 
    close: number;
}

const data: Array<Data> = appleStock;

export default function StarterExample() {
    const width = 750;
    const height = 400;
    const margin = {
        top: 60,
        bottom: 60,
        left: 80,
        right: 80,
      };
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;
    const x = (d: Data) => new Date(d.date);
    const y = (d: Data) => d.close;

    console.log(x(data[0])); // Fri Aug 21 1970 12:23:21 GMT-0600 (MDT)
    console.log(y(data[0])); // 72.2
    
    return <div>This is a starter</div>
}