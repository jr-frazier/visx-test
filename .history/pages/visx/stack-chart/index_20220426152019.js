import React from 'react';
import { render } from 'react-dom';
import ParentSize from '@visx/responsive/lib/components/ParentSize';

import StackChart from './StackChart';

export default function App() {
    return (
        <div>
            <StackChart width={500} height={900} />
        </div>
    );
}
