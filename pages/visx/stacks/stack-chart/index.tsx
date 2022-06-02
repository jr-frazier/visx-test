import React from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';

import StackChart from './StackChart';

export default function Chart() {
    return <ParentSize>{({ width, height }) => <StackChart width={1500} height={900} />}</ParentSize>
}
