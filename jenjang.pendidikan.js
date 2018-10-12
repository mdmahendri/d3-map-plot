function showPendidikanChart(idProv) {
	// atur margin dari svg chart
	var margin = {top: 20, right: 30, bottom: 30, left: 100},
	width = 280 - margin.left - margin.right,
	height = 445 - margin.top - margin.bottom;

	var x = d3.scaleLinear()
	.range([0, width]);
	var xAxis = d3.axisBottom(x).ticks(4);

	var y = d3.scaleBand()
	.rangeRound([0, height])
	.padding(.1);
	var yAxis = d3.axisLeft(y);

	// inisiasi container chart
	d3.select('#pendidikan').html('');
	var container = d3.select('#pendidikan')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	// set domain dari x dan y
	x.domain([0, d3.max(pendidikanData, function(d) { return +d.content[idProv]; })]);
	y.domain(pendidikanData.map(function(d) { return d.jenjang; } ));

	container.append('g')
	.attr('class', 'x axis')
	.attr('transform', 'translate(0,' + height + ')')
	.call(xAxis);

	container.append('g')
	.attr('class', 'y axis')
	.call(yAxis)
    .selectAll(".tick text")
  	.call(wrap, y.bandwidth());


	if (isNaN(idProv)) return;

	container.selectAll('.pendidikan-bar')
	.data(pendidikanData)
	.enter().append('rect')
	.attr('class', 'pendidikan-bar')
	.attr('y', function(d) { return y(d.jenjang); })
	.attr('width', function(d) { return x(+d.content[idProv]); })
	.attr('height', y.bandwidth());
}