require.config({
	packages: [{
		name: 'zrender',
		location: './zrender/src',
		main: 'zrender'
	}]
});


require(["zrender", 'zrender/tool/color', "zrender/animation/animation"], function(zrender, zrColor, Animation) {

	var zr = zrender.init(document.getElementById('Main'));
	var RectangleShape = require('zrender/shape/Rectangle');
	var color = "purple"
	var max_level = 6
	var max_length = 405
	var zeroPoint = {
		x: 0,
		y: 0
	}
	var animation_timelapse = 700
	
	

	var addSquare = function(point, side_length) {
		var squareStyle = {
			x: point.x,
			y: point.y,
			width: side_length,
			height: side_length,
			color: color,
		}
		var square = new RectangleShape({
			style: squareStyle
		})
		zr.addShape(square)
		return square
	}

	var addSquares = function(point, side_length, level) {
		var points = []
		points[0] = {
			x: point.x + side_length,
			y: point.y + side_length
		}
		points[1] = {
			x: point.x,
			y: point.y
		}
		points[2] = {
			x: point.x + side_length*2,
			y: point.y
		}
		points[3] = {
			x: point.x,
			y: point.y + side_length*2
		}
		points[4] = {
			x: point.x + side_length*2,
			y: point.y + side_length*2
		}

		for (var i = 0; i < 5; i++) {
			startPoints[level].push(points[i])
			squares[level].push(addSquare(points[i],side_length))
		}
	}
	

	var startPoints = []
	var squares = []
	startPoints[0] = []
	squares[0] = []
	startPoints[0][0] = zeroPoint
	var side_lengths = []
	side_lengths[0] = max_length
	squares[0][0] = addSquare(startPoints[0][0], side_lengths[0])
	var level = 0


	for (var i = 1; i < max_level; i++) {
		var len = startPoints[i - 1].length
		startPoints[i] = []
		squares[i] = []
		side_lengths.push(side_lengths[i-1]/3)
		for (var j = 0; j < len; j++) {
			addSquares(startPoints[i - 1][j], side_lengths[i], i)
		}
		console.log(i)
	}

	zr.render()

	var change_level = 0;
	var changeSquares = function(changelevel) {
		console.log(changelevel)
		console.log(startPoints[changelevel])
		var len = startPoints[changelevel].length
		var side_length = side_lengths[changelevel]

		for (var j = 0; j < len; j++) {
			console.log("changelevel: "+ changelevel+ " square: "+j);
			console.log(animation_timelapse)
			console.log(squares[changelevel][j].id)
			console.log(startPoints[changelevel][j])
			console.log(startPoints[changelevel][j].x + side_length / 3)
				var square_change = zr.animate(squares[changelevel][j].id, "style", false).
				when(animation_timelapse, {
					x: startPoints[changelevel][j].x + side_length / 3,
					y: startPoints[changelevel][j].y + side_length / 3,
					width: side_length/3,
					height: side_length/3
				}).start()
			}
	}

	var runsChange = function(changelevel) {
		changeSquares(changelevel)
		setTimeout(function(){
			if (changelevel < max_level-2) {
				for (var i = 0; i < startPoints[changelevel].length; i++) {
					zr.delShape(squares[changelevel][i])
				}			
				runsChange(changelevel+1)
			}
		},animation_timelapse)
	}

    setTimeout(function(){
    	changeSquares(0)
    	setTimeout(function(){
    		zr.delShape(squares[0][0])
    		runsChange(1)
    	},animation_timelapse)
    },500)

})