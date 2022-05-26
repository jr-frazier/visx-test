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

const data = appleStock;

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
    const x = data => new Date(data.date);
    const y = data => data.close;
    return <div>This is a starter</div>
}