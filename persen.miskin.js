function showPersenMiskinChart(idProv) {

	// atur margin dari svg chart
	var margin = {top: 20, right: 30, bottom: 30, left: 40},
	width = 300 - margin.left - margin.right,
	height = 200 - margin.top - margin.bottom;

	// buat axis dari x maupun y
	var x = d3.scaleBand()
		.rangeRound([0, width])
		.padding(.1);
	var xAxis = d3.axisBottom(x);

	var y = d3.scaleLinear()
		.range([height, 0]);
	var yAxis = d3.axisRight(y).ticks(6);

	// inisiasi container chart
	d3.select('#miskin').html('');
	var container = d3.select('#miskin')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	// set domain dari x dan y
	x.domain(['2013', '2014', '2015']);
	y.domain([0, d3.max(miskinData, function(d) { return +d.content[idProv]; })]);

	container.append('g')
	.attr('class', 'x axis')
	.attr('transform', 'translate(0,' + height + ')')
	.call(xAxis);

	container.append('g')
	.attr('class', 'y axis')
	.attr('transform', 'translate(' + (width) + ',0)')
	.call(yAxis);


	if (isNaN(idProv)) return;

	container.selectAll('.miskin-bar')
	.data(miskinData)
	.enter().append('rect')
	.attr('class', 'miskin-bar')
	.attr('x', function(d) { return x(d.tahun); })
	.attr('y', function(d) { return y(+d.content[idProv]); })
	.attr('width', x.bandwidth())
	.attr('height', function(d) { return height - y(+d.content[idProv]); });
}

function updateMiskinChart(idProv) {
	// atur margin dari svg chart
	var margin = {top: 20, right: 30, bottom: 30, left: 40},
	width = 960 - margin.left - margin.right,
	height = 300 - margin.top - margin.bottom;

	var y = d3.scaleLinear()
		.range([height, 0]);
}