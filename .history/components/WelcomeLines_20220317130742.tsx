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

 

    // Resize the lines based on the width of the container
    function resizeLines(): Line[] {
        const newWidth = width / 500;
        return lines.map((line) => {
            return line.map((point) => {
                return {
                    x: point.x + width,
                    y: point.y
                };
            });
        });
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