import * as React from 'react';
import * as d3 from 'd3';

function drawChart(svgRef: React.RefObject<SVGSVGElement>) {
    const data = [4, 8, 15, 16, 23, 42];
    const h = 120;
    const w = 250;
    const svg = d3.select(svgRef.current);

    // svg.attr('width', width)
    //     .attr('height', y.range()[1])
    //     .attr('font-family', 'sans-serif')
    //     .attr('font-size', '10')
    //     .attr('text-anchor', 'end');

    // const bar = svg
    //     .selectAll('g')
    //     .data(data)
    //     .join('g')
    //     .attr('transform', (d, i) => `translate(0,${y(i)})`);

    // bar.append('rect')
    //     .attr('fill', 'steelblue')
    //     .attr('width', x)
    //     .attr('height', y.bandwidth() - 1);

    // bar.append('text')
    //     .attr('fill', 'white')
    //     .attr('x', (d) => x(d) - 3)
    //     .attr('y', (y.bandwidth() - 1) / 2)
    //     .attr('dy', '0.35em')
    //     .text((d) => d);
    // svg
    // .style("font", "10px sans-serif")
    // .style("text-align", "right")
    // .style("color", "white");

    // svg.selectAll("div")
    //     .data(data)
    //     .join("div")
    //       .style("background", "steelblue")
    //       .style("padding", "3px")
    //       .style("margin", "1px")
    //       .style("width", d => `${d * 10}px`)
    //       .text(d => d);

    //   svg
    //     .selectAll("rect")
    //     .data(data)
    //     .enter()
    //     .append("rect")
    //     .attr("x", (d, i) => i * 40)
    //     .attr("y", (d, i) => h - 10 * d)
    //     .attr("width", 20)
    //     .attr("height", (d, i) => d * 10)
    //     .attr("fill", "steelblue");
}

const Chart: React.FunctionComponent = () => {
    const chart = React.useRef(null);
    React.useEffect(() => {
        drawChart(chart);
    }, [chart]);

    return <div ref={chart}></div>;
};

export default Chart;
