const data = [
    {Period: 'DEC', Total: 250, WithBC: 125},
    {Period: 'JAN', Total: 200, WithBC: 100},
    {Period: 'FEB', Total: 250, WithBC: 125},
    {Period: 'MAR', Total: 100, WithBC: 50},
    {Period: 'APR', Total: 350, WithBC: 200},
];

const width = 200;
const height = 130;
const graphWidth = width;
const graphHeight = height;

////////// SET SVG VARIABLES ///////////////////

const svg = d3.select('.canvas')
    .append('svg')
    .attr('width', width)
    .attr('height', height);
;

const graph = svg.append('g')
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    .attr('transform', `translate(30, -30)`);

const gXAxis = graph.append('g')
    .style('color', 'transparent')
    .attr('transform', `translate(0, ${graphHeight})`);

const gYAxis = graph.append('g').style('color', 'transparent');

const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Total)])
    .range([graphHeight, 0]);

const x = d3.scaleBand()
    .domain(data.map(item => item.Period))
    .range([0, graphWidth])
    .paddingInner(0.8)
    .paddingOuter(0.1);

const y2 = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Total)])
    .range([graphHeight, 0]);

const x2 = d3.scaleBand()
    .domain(data.map(item => item.Period))
    .range([0, graphWidth])
    .paddingInner(0.8)
    .paddingOuter(0.1);


////////// DRAWING AXIS ///////////////////
const yAxis = d3.axisLeft(y)
    .ticks(4)
    .tickFormat(d => {
        return d;
    });

const xAxis = d3.axisBottom(x);

graph.append('g')
    .attr('class', 'yAxis')
    .call(yAxis)
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'end');

d3.selectAll('g.yAxis g.tick')
    .append('line')
    .attr('class', 'gridline')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', width)
    .attr('y2', 0);

gXAxis.call(xAxis);

gXAxis.selectAll('text')
    .style('color', 'white')
    .style('font-size', 10);

/////// REMOVING SHORT WHITE LINES IN YAXIS /////////

let list = d3.selectAll('.yAxis').selectAll('.tick');

for(let i = 0; i < list._groups[0].length; i++){
    console.log('hi');
    list._groups[0][i].firstChild.setAttribute('stroke-opacity', 0);
}

gYAxis.selectAll('text')
    .style('color', 'white')
    .style('font-size', 10);

////////// DRAWING CHART ///////////////////

const rects = graph.selectAll('rect')
    .data(data);

rects.enter()
    .append('rect')
    .attr('class', 'bar-rect')
    .attr('width', x.bandwidth)
    .attr('height', d => graphHeight - y(d.Total))
    .attr('x', d => x(d.Period))
    .attr('rx', 7)
    .attr('y', d => y(d.Total))
    .attr('ry', 7);

rects.enter()
    .append('rect')
    .attr('class', 'bar-rect bar-rect_overlapping')
    .attr('width', x2.bandwidth)
    .attr('height', d => graphHeight - y2(d.WithBC))
    .attr('x', d => x2(d.Period))
    .attr('rx', 7)
    .attr('y', d => y2(d.WithBC))
    .attr('ry', 7);
