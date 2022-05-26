import React from 'react';
import { render } from 'react-dom';
import ParentSize from '@visx/responsive/lib/components/ParentSize';

import StackChart from './StackChart';

export default function App() {
    return (
        <div style={{padding: "10px:", height: '1000px', display: 'flex'}}>
            <ParentSize>{({ width, height }) => <StackChart width={width} height={height} />}</ParentSize>
        </div>
    );
}
