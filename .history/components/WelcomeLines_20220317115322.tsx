import {lines} from '../public/lines';
import { LinePath } from '@visx/shape';
import { curveBasis } from '@visx/curve';
type Line = { x: number; y: number }[];

interface Props {
    width: number;
    height: number;
}

export default function WelcomeLines({ width, height }: Props) {
    console.log("Widthssss: " + width);

    React.useLayoutEffect(() => console.log("changed"), [width]);

    function resizeLines(lines: Line[]): Line[] {
        console.log("Width: " + width);
        const scale = Math.min(width / 500, height / 500);
        return lines.map((line) => line.map((point) => ({
            x: point.x * scale,
            y: point.y * scale,
        })));
    }
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