import * as React from "react";
import * as d3 from "d3";

function drawChart(svgRef: React.RefObject<SVGSVGElement>) {
  const data = [4, 8, 15, 16, 23, 42]
  const h = 120;
  const w = 250;
  const svg = d3.select(svgRef.current);

  svg
  .style("color", "red")


svg
.style("font", "10px sans-serif")
.style("text-align", "right")
.style("color", "white");

svg.selectAll("div")
    .data(data)
    .join("div")
      .style("background", "steelblue")
      .style("padding", "3px")
      .style("margin", "1px")
      .style("width", d => `${d * 10}px`)
      .text(d => d);

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

  return (
    <div ref={chart}>
        
    </div>
  );
};

export default Chart;
