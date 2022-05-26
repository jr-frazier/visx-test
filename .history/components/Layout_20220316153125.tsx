import React from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';

interface Props {
    children: JSX.Element | JSX.Element[];
}
export default function Layout(props: Props) {

    const renderChildren = (width: number , height: number) =>  React.Children.map(props.children, child => {
        if (typeof child.type === 'string') {
          return child
        }
    
        return React.cloneElement(
          child,
          {width , height}
        )
      })

    return (
        <ParentSize>{({ width, height }) => renderChildren(width, 550)}</ParentSize>
    )
}
