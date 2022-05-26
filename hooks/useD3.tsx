import React from 'react';
import * as d3 from 'd3';

export const useD3 = (renderChartFn: (arg0: d3.Selection<d3.BaseType, unknown, HTMLElement, any>) => void, dependencies: React.DependencyList | undefined) => {
    const ref = React.useRef();


    React.useEffect(() => {

        if (!ref.current) {
            return
        }
        renderChartFn(d3.select(ref.current));
        return () => {};
      }, dependencies);
    return ref;
}
