import React from 'react'
import {lines as initialLines} from '../public/lines';
import { LinePath } from '@visx/shape';
import { curveBasis } from '@visx/curve';
import { ContentPasteSearchOutlined } from '@mui/icons-material';
type Line = { x: number; y: number }[];

interface Props {
    width: number;
    height: number;
}

export default function WelcomeLines({ width, height }: Props) {
    const [lines, setLines] = React.useState<Line[]>(initialLines);

 

    // Resize the lines to fit the screen
    function resizeLines(): Line[] {
        const newLines: Line[] = [];
        lines.forEach((line) => {
            const newLine: Line = [];
            line.forEach((point) => {
                const newPoint = {
                    x: point.x * width / 500,
                    y: point.y * height / 500,
                };
                newLine.push(newPoint);
            });
            newLines.push(newLine);
        });
        return newLines;
    }

    React.useEffect(() => {
        console.log("RAN", width)
        setLines(resizeLines());

    }, [width, height]);

   
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