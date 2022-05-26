import React from 'react';
import { render } from 'react-dom';
import ParentSize from '@visx/responsive/lib/components/ParentSize';

import StackChart from './StackChart';


export default function App() {
  return <ParentSize>{({ width, height }) => <StackChart width={width} height={height - 2} />}</ParentSize>
}