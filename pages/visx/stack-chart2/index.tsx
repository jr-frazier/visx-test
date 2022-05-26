import React from 'react';
import { scaleTime, scaleLinear } from '@visx/scale';
import { timeParse } from 'd3-time-format';

/** Example Data
 * Firefox: "18.82"
 * Google Chrome: "48.09"
 * Internet Explorer: "24.14"
 * Microsoft Edge: "0.03"
 * Mozilla: "0.12"
 * Opera: "1.32"
 * Other/Unknown: "0.01"
 * Safari: "7.46"
 * date: "2015 Jun 15"
 */

import browserUsage, { BrowserUsage } from '@visx/mock-data/lib/mocks/browserUsage'
const data = browserUsage;
const keys = Object.keys(data[0]).filter((k) => k !== 'date') as BrowserNames[];
const parseDate = timeParse('%Y %b %d');



type BrowserNames = keyof BrowserUsage;

type Margin = {
    top: number;
    right: number;
    bottom: number;
    left: number;
};

export default function AreaChart() {
    const margin = { top: 50, right: 50, bottom: 50, left: 50 }
    const height = 700
    const width = 700
    const yMax = height - margin.top - margin.bottom;
    const xMax = width - margin.left - margin.right;

    const xScale = scaleTime<number>({
        range: [0, xMax],
        domain: [Math.min(...data.map(getDate)), Math.max(...data.map(getDate))],
    });
    const yScale = scaleLinear<number>({
        range: [yMax, 0],
    });

    console.log(browserUsage)


    return (<div>Hello</div>);
}
