import React from 'react';
import { render } from 'react-dom';
import ParentSize from '@visx/responsive/lib/components/ParentSize';

import StackChart from './StackChart';

export default function App() {
    return (
        <div style={{marginLeft:'100px', paddingLeft: '20px', height: '900px', width: '60%', display: 'flex', border: "1px solid black"}}>
            <ParentSize>{({ width, height }) => <StackChart width={width} height={height} />}</ParentSize>
        </div>
    );
}
