function showPenyakitChart(idProv) {
	// atur margin dari svg chart
	var margin = {top: 20, right: 50, bottom: 30, left: 20},
	width = 280 - margin.left - margin.right,
	height = 445 - margin.top - margin.bottom;

	var x = d3.scaleLinear()
	.range([width, 0]);
	var xAxis = d3.axisBottom(x).ticks(4);

	var y = d3.scaleBand()
	.rangeRound([0, height])
	.padding(.1);
	var yAxis = d3.axisRight(y);

	// inisiasi container chart
	d3.select('#penyakit').html('');
	var container = d3.select('#penyakit')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	// set domain dari x dan y
	x.domain([0, d3.max(penyakitData, function(d) { return +d.content[idProv]; })]);
	y.domain(penyakitData.map(function(d) { return d.penyakit; } ));

	container.append('g')
	.attr('class', 'x axis')
	.attr('transform', 'translate(0,' + height + ')')
	.call(xAxis);

	container.append('g')
	.attr('class', 'y axis')
	.attr('transform', 'translate(' + width + ',0)')
	.call(yAxis)
    .selectAll(".tick text")
  	.call(wrap, y.bandwidth());


	if (isNaN(idProv)) return;

	container.selectAll('.penyakit-bar')
	.data(penyakitData)
	.enter().append('rect')
	.attr('class', 'penyakit-bar')
	.attr('y', function(d) { return y(d.penyakit); })
	.attr('x', function(d) { return x(+d.content[idProv]) })
	.attr('width', function(d) { return width - x(+d.content[idProv]); })
	.attr('height', y.bandwidth());
}