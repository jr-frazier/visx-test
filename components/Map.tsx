import React from 'react';
import { scaleQuantize } from '@visx/scale';
import { Mercator, Graticule } from '@visx/geo';
import * as topojson from 'topojson-client';
import topology from '../world-topo.json';
import { Point } from "@visx/point";
import { MarkerArrow, MarkerCross, MarkerX, MarkerCircle, MarkerLine } from '@visx/marker'

export const background = '#f9f7e8';

export type GeoMercatorProps = {
    width?: number;
    events?: boolean;
};

interface FeatureShape {
    type: 'Feature';
    id: string;
    geometry: { coordinates: [number, number][][]; type: 'Polygon' };
    properties: { name: string };
}

// @ts-ignore
const world = topojson.feature(topology, topology.objects.units) as {
    type: 'FeatureCollection';
    features: FeatureShape[];
};

const color = scaleQuantize({
    domain: [
        Math.min(...world.features.map((f) => f.geometry.coordinates.length)),
        Math.max(...world.features.map((f) => f.geometry.coordinates.length)),
    ],
    range: ['#ffb01d', '#ffa020', '#ff9221', '#ff8424', '#ff7425', '#fc5e2f', '#f94b3a', '#f63a48'],
});

export default function Map({ width = 200, events = false }: GeoMercatorProps) {
    const centerX = width / 2;
    const height = 900;
    const centerY = height / 2;
    const scale = (width / 630) * 100;

    const point  = new Point({x: 200 , y: 80})
    console.log(world.features)
    return width < 10 ? null : (
        <svg style={{marginTop: '20px'}} width={width} height={height}>
            <rect x={0} y={0} width={width} height={height} fill={background} rx={14} />
            <Mercator<FeatureShape>
                data={world.features}
                scale={scale}
                pointRadius={10}
                center={[0, 0]}
                translate={[centerX, centerY + 50]}
            >
                {(mercator: { path: (arg0: any) => any; features: { feature: any; path: any; }[]; }) => (
                    <g>
                        <Graticule graticule={(g) => mercator.path(g) || ''} stroke="rgba(33,33,33,0.05)" />
                        {mercator.features.map(({ feature, path }, i) => (
                            <path
                                key={`map-feature-${i}`}
                                d={path || ''}
                                fill={color(feature.geometry.coordinates.length)}
                                stroke={background}
                                strokeWidth={0.5}
                                onClick={() => {
                                    if (events) alert(`Clicked: ${feature.properties.name} (${feature.id})`);
                                }}
                            />
                        ))}
                    </g>
                )}
            </Mercator>
            <MarkerCircle id="marker-circle" fill="blue" size={2} refX={200} refY={80} />
            <circle
                key={`radar-point`}
                // cx={-155}
                // cy={20}
                cx={155}
                cy={20}
                r={5}
                fill={"#B56DF2"}
            />
        </svg>
    );
};
