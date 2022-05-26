import React from 'react'
import {lines} from '../public/lines';
import { LinePath } from '@visx/shape';
import { curveBasis } from '@visx/curve';
import { ContentPasteSearchOutlined } from '@mui/icons-material';
type Line = { x: number; y: number }[];

interface Props {
    width: number;
    height: number;
}

export default function WelcomeLines({ width, height }: Props) {
    // const [lines, setLines] = React.useState<Line[]>(initialLines);

    function resizeLines(): Line[] {
        console.log("Width: " + width);
        const scale = Math.min(width / 500, height / 500);
        return lines.map((line) => line.map((point) => ({
            x: point.x / scale,
            y: point.y / scale,
        })));
    }


    React.useEffect(() => {
        console.log("RAN", width)
        setLines(resizeLines());

    }, [width, height]);

   
    return <>
        {resizeLines().map((line, i) => (
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