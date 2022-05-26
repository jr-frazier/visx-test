import React from 'react';
import { render } from 'react-dom';
import ParentSize from '@visx/responsive/lib/components/ParentSize';

import Example from './Example';
import './sandbox-styles.css';


export default function Sandbox() {
    return (
        <ParentSize>{({ width, height }) => <Example width={width} height={height} />}</ParentSize>,
        document.getElementById('root'),
    )
}

render(
  <ParentSize>{({ width, height }) => <Example width={width} height={height} />}</ParentSize>,
  document.getElementById('root'),
);