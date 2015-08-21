require.config({
	packages: [{
		name: 'zrender',
		location: './zrender/src',
		main: 'zrender'
	}]
});


require(["zrender", 'zrender/tool/color'], function(zrender, zrColor) {

	var linelength = 6
	var squareData = squareMatrix(linelength)
	var squares = linelength*linelength
	var side_length = parseInt(700/linelength)-10


	var zr = zrender.init(document.getElementById('Main'));
//	zr.clear()

	//var zrColor = require('zrender/tool/color');
//	var width = zr.getWidth();
//	var height = zr.getHeight();
	var width = 500
	var height = 500


	var RectangleShape = require('zrender/shape/Rectangle');
	for (var i = 0; i < squares; i++) {
		colorstr = "rgb("+parseInt(256/linelength*squareData[i][2])+","+parseInt(256/linelength*squareData[i][1])+","+parseInt(256/squares*squareData[i][0])+")"
//		colorstr = "rgb("+256/linelength*squareData[i][2]+","+256/linelength*squareData[i][1]+",127)"
//		colorstr = "rgb(127,"+256/linelength*squareData[i][1]+","+256/squares*squareData[i][0]+")"
//		colorstr = "rgb("+(255-256/squares*squareData[i][0])+","+256/linelength*squareData[i][1]+","+256/squares*squareData[i][0]+")"
//		colorstr = "rgb("+256/squares*squareData[i][0]+","+256/linelength*squareData[i][2]+","+256/linelength*squareData[i][1]+")"
//		colorstr = "rgb("+256/linelength*squareData[i][2]+","+256/linelength*squareData[i][1]+","+256/squares*squareData[i][1]*squareData[i][2]+")"
		zr.addShape(new RectangleShape({
			style: {
				x: squareData[i][2]*(side_length+10),
				y: squareData[i][1]*(side_length+10)+10,
				width: side_length,
				height: side_length,
				color: colorstr,
				text: i
			}


		}));
	}
	zr.render();
})

var squareMatrix = function(n) {
	var square = n*n
	var matrix = []
	var res = []
	for (var i=0; i<n;i++) {
		matrix[i]=[]
		for (var j=0; j<n; j++)
			matrix[i][j]=-1
	}

	var x = parseInt(n/2-0.5)
	var y = 0
	for (var i = 0; i < square; i++) {
		if (y === -1) y = n-1
		if (x === n) x = 0
		if (matrix[y][x]!==-1) y++
		matrix[y][x]=i+1
		res.push([i,y,x])
		x++
		y--
	}
	console.log(matrix)
	console.log(res)
	return res
}
