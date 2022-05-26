import * as Plot from '@observablehq/plot';
import { appleStock } from '@visx/mock-data';

// const data = Mock.appleStock

export default function LineChart() {
    console.log(appleStock);
    return (
        <div>
            {Plot.plot({
                marks: [Plot.areaY(appleStock, { x: 'date', y: 'close' })],
            })}
        </div>
    );
}
