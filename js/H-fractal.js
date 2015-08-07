require.config({
	packages: [{
		name: 'zrender',
		location: './zrender/src',
		main: 'zrender'
	}]
});


require(["zrender", 'zrender/tool/color', "zrender/animation/animation", 'zrender/shape/Line'], function(zrender, zrColor, Animation, Line) {

	var zr = zrender.init(document.getElementById('Main'));
	var color = "purple"
	var max_level = 12
	var max_length = 192
	var zeroPoint = {
		x: 500,
		y: 300
	}
	var animation_timelapse = 700
	
	
	var addLine = function(point) {
		var lineStyle = {
			xStart: point.x,
			yStart: point.y,
			xEnd: point.x,
			yEnd: point.y,
			color: color,
			lineWidth: 2
		}
		var line = new Line({
			style: lineStyle
		})
		zr.addShape(line)
		return line
	}

	
	var directionChanges = [[1,0],[0,1]]
	var directions = []
	directions[0] = 0
	var startPoints = []
	var lines = []
	startPoints[0] = zeroPoint
	lines[0] = addLine(startPoints[0])
	var side_lengths = []
	side_lengths[0] = max_length
	var ratio = Math.sqrt(2)

	var level = 0


	for (var i = 1; i < max_level; i++) {
		var lastLevelStart = Math.pow(2, i-1)-1
		var lastLevelEnd = Math.pow(2,i)-1
		side_lengths.push(side_lengths[i-1]/ratio)
		directions[i] = 1 - directions[i-1]
		var directionChange = directionChanges[directions[i-1]]
		var side_length = side_lengths[i-1]
		for (var j = lastLevelStart; j < lastLevelEnd; j++) {
			
			var point1 = {
				x: startPoints[j].x + directionChange[0] * side_length,
				y: startPoints[j].y + directionChange[1] * side_length
			}
			var point2 = {
				x: startPoints[j].x - directionChange[0] * side_length,
				y: startPoints[j].y - directionChange[1] * side_length
			}
			startPoints.push(point1)
			startPoints.push(point2)
			lines.push(addLine(point1))
			lines.push(addLine(point2))
		}
//		console.log(i)
	}

	zr.render()

	var change_level = 0;
	var changeLines = function(changelevel) {
		var levelStart = Math.pow(2,changelevel)-1
		var levelEnd = Math.pow(2,changelevel+1)-1
		var side_length = side_lengths[changelevel]
		var directionChange = directionChanges[directions[changelevel]]
		var side_length = side_lengths[changelevel]

		for (var j = levelStart; j < levelEnd; j++) {

			var pointStart = {
				x: startPoints[j].x + directionChange[0]*side_length,
				y: startPoints[j].y + directionChange[1]*side_length
			}
			var pointEnd = {
				x: startPoints[j].x - directionChange[0]*side_length,
				y: startPoints[j].y - directionChange[1]*side_length
			}
			var line_change = zr.animate(lines[j].id, "style", false).
				when(animation_timelapse, {
					xStart: pointStart.x,
					yStart: pointStart.y,
					xEnd: pointEnd.x,
					yEnd: pointEnd.y
				}).start()
		}
	}

	var runsChange = function(changelevel) {
		changeLines(changelevel)
		setTimeout(function(){
			if (changelevel < max_level-1) {		
				runsChange(changelevel+1)
			}
		},animation_timelapse)
	}

    setTimeout(function(){
    	changeLines(0)
    	setTimeout(function(){
    		runsChange(1)
    	},animation_timelapse)
    },500)


})
