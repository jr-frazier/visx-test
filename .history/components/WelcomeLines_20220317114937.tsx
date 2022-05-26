import {lines} from '../public/lines';
import { LinePath } from '@visx/shape';
import { curveBasis } from '@visx/curve';


interface Props {
    width: number;
}

export default function WelcomeLines({ width }: Props) {
    console.log("Width: " + width);
    return <>
        {lines.map((line, i) => (
                    <LinePath
                        key={`line-${i}`}
                        fill="transparent"
                        stroke="url(#stroke)"
                        strokeWidth={10}
                        data={line}
                        curve={curveBasis}
                        x={(d) => d.x}
                        y={(d) => d.y}
                    />
                ))}
    </>
}