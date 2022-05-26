import { Data } from '../../../hooks/useData';
import React from 'react';
import { DSVParsedArray, ScaleBand, ScaleLinear } from 'd3';
/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import { Bar } from '@visx/shape';
import { useTooltip, Tooltip, defaultStyles } from '@visx/tooltip';
import { Margin } from './index';

const tooltipStyles = {
    ...defaultStyles,
    minWidth: 60,
    backgroundColor: 'rgba(0,0,0,0.9)',
    color: 'white',
  };

interface Props {
    data: DSVParsedArray<Data>;
    yScale: ScaleBand<string>;
    xScale: ScaleLinear<number, number, never>;
    yValue: (d: Data) => string;
    xValue: (d: Data) => number;
    toolTipFormat: (n: number | { valueOf(): number }) => string;
    margin: Margin;
}
export default function Marks({ data, yScale, xScale, xValue, yValue, toolTipFormat, margin }: Props) {
    const { showTooltip, hideTooltip, tooltipOpen, tooltipLeft, tooltipTop, tooltipData } = useTooltip();

    const colors = [
        'crimson',
        'royalblue',
        'lime',
        'tomato',
        'gold',
        'purple',
        'deeppink',
        'brown',
        'forestgreen',
        'deepskyblue',
    ];

    return (
        <>
            {data.map((d: Data, index) => {
                return (
                    <>
                        <Bar
                            key={`bar-${index}`}
                            x={0}
                            y={yScale(yValue(d))}
                            width={xScale(xValue(d))}
                            height={yScale.bandwidth()}
                            fill="rgba(23, 233, 217, .5)"
                            onMouseOver={() => {
                                const top = yScale(yValue(d)) + margin.top;
                                const left = 0 + xScale(xValue(d)) + margin.left;
                                console.log('Mouse Over');
                                showTooltip({
                                    tooltipData: xValue(d),
                                    tooltipTop: top,
                                    tooltipLeft: left,
                                });
                            }}
                            onMouseOut={hideTooltip}
                        />
                        
                            <Tooltip top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
                                <div>Hello World</div>
                            </Tooltip>
                        
                    </>
                );
            })}
        </>
    );
}
