import React from 'react';
import { render } from 'react-dom';
import ParentSize from '@visx/responsive/lib/components/ParentSize';

import StackChart from './StackChart';

export default function App() {
    return (
        <div style={{height: '900px', width: '100%', border: "1px solid black"}}>
            <StackChart width={500} height={height} />
        </div>
    );
}
