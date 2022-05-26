import React from 'react';
import { render } from 'react-dom';
import ParentSize from '@visx/responsive/lib/components/ParentSize';

import StackChart from './StackChart';


export default function App() {
  return <ParentSize>{({ width }) => <StackChart width={width} height={1000} />}</ParentSize>
}