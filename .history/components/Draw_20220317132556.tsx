import React, { useCallback, useState } from 'react';
import { LinePath } from '@visx/shape';
import { useDrag } from '@visx/drag';
import { curveBasis } from '@visx/curve';
import { LinearGradient } from '@visx/gradient';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import WelcomeLines from '../components/WelcomeLines';

type Line = { x: number; y: number }[];
type Lines = Line[];

export type DragIIProps = {
    width?: number;
    // height?: number;
    data?: Lines;
};

export default function Draw({ data = [], width = 500 }: DragIIProps) {
    const [lines, setLines] = useState<Lines>(data);

    const height = 550;
    const onDragStart = useCallback(
        (currDrag) => {
            // add the new line with the starting point
            setLines((currLines) => [...currLines, [{ x: currDrag.x, y: currDrag.y }]]);
        },
        [setLines],
    );
    const onDragMove = useCallback(
        (currDrag) => {
            // add the new point to the current line
            setLines((currLines) => {
                const nextLines = [...currLines];
                const newPoint = { x: currDrag.x + currDrag.dx, y: currDrag.y + currDrag.dy };
                const lastIndex = nextLines.length - 1;
                nextLines[lastIndex] = [...(nextLines[lastIndex] || []), newPoint];
                return nextLines;
            });
        },
        [setLines],
    );
    const {
        x = 0,
        y = 0,
        dx,
        dy,
        isDragging,
        dragStart,
        dragEnd,
        dragMove,
    } = useDrag({
        onDragStart,
        onDragMove,
        resetOnStart: true,
    })

    const heightToScale = Math.min(width / 1600) * height;
    
    return width < 10 ? null : (
        <div className="DragII" style={{ touchAction: 'none' }}>
            <svg width={width} height={heightToScale}>
                <LinearGradient id="stroke" from="#ff00d4" to="#00ffe5" />
                <rect fill="#04002b" width={width} height={heightToScale} rx={14} />
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

                <WelcomeLines width={width} height={height} />
                <g>
                    {isDragging && (
                        /* capture mouse events (note: <Drag /> does this for you) */
                        <rect
                            width={width}
                            height={heightToScale}
                            onMouseMove={dragMove}
                            onMouseUp={dragEnd}
                            fill="transparent"
                        />
                    )}
                    {/* decorate the currently drawing line */}
                    {isDragging && (
                        <g>
                            <rect
                                fill="white"
                                width={8}
                                height={8}
                                x={x + dx - 4}
                                y={y + dy - 4}
                                pointerEvents="none"
                            />
                            <circle cx={x} cy={y} r={4} fill="transparent" stroke="white" pointerEvents="none" />
                        </g>
                    )}
                    {/* create the drawing area */}
                    <rect
                        fill="transparent"
                        width={width}
                        height={heightToScale}
                        onMouseDown={dragStart}
                        onMouseUp={isDragging ? dragEnd : undefined}
                        onMouseMove={isDragging ? dragMove : undefined}
                        onTouchStart={dragStart}
                        onTouchEnd={isDragging ? dragEnd : undefined}
                        onTouchMove={isDragging ? dragMove : undefined}
                    />
                </g>
            </svg>
            <div>
            <Tooltip title="Refresh">
                <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => setLines(data)}>
                    <RefreshIcon />
                </IconButton>
            </Tooltip>
            </div>

            <style jsx>{`
                .DragII {
                    display: flex;
                    flex-direction: column;
                    user-select: none;
                }

                svg {
                    margin: 1rem 0;
                    cursor: crosshair;
                }

                .deets {
                    display: flex;
                    flex-direction: row;
                    font-size: 12px;
                }
                .deets > div {
                    margin: 0.25rem;
                }
            `}</style>
        </div>
    );
}
