require.config({
	packages: [{
		name: 'zrender',
		location: './zrender/src',
		main: 'zrender'
	}]
});


require(["zrender", 'zrender/tool/color',"zrender/animation/animation"], function(zrender, zrColor,Animation) {

	var zr = zrender.init(document.getElementById('Main'));
	var startPoint = {
		x: 0,
		y: 0
	}
	var side_length = 570
    var RectangleShape = require('zrender/shape/Rectangle');
    var startPoints = []
    startPoints[0] = {
    	x: startPoint.x,
    	y: startPoint.y
    }
	startPoints[1] = {
		x: startPoint.x+side_length*2/3,
		y: startPoint.y
	}
	startPoints[2] = {
		x: startPoint.x,
		y: startPoint.y+side_length*2/3
	}
	startPoints[3] = {
		x: startPoint.x+side_length*2/3,
		y: startPoint.y+side_length*2/3
	}
	startPoints[4] = {
    	x: startPoint.x+side_length*1/3,
    	y: startPoint.y+side_length*1/3
    }
    var rectangleShapes = []
    for (var i = 0; i < 5; i++) {
    	var rectangleStyle = {
        x : startPoints[i].x,
        y : startPoints[i].y,
        width : side_length/3,
        height : side_length/3,
        color : 'purple',        
    	}
    	if (i===4) {
    	rectangleStyle = {
        x : startPoints[0].x,
        y : startPoints[0].y,
        width : side_length,
        height : side_length,
        color : 'purple',       
    	}
    	}
    	rectangleShapes[i] = new RectangleShape({
    		style: rectangleStyle
    	})
    	zr.addShape(rectangleShapes[i])
    }
zr.render();
var animation1 = zr.animate(rectangleShapes[4].id,"style",true)
	.when(2000, {
		x: startPoints[4].x,
		y: startPoints[4].y,
		width: side_length/3,
		height: side_length/3
	}).start()       
    

})