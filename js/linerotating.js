 require.config({
        packages: [
            {
                name: 'zrender',
                location: './zrender/src',
                main: 'zrender'
            }
        ]
    });
    require(
        [
            "zrender",
            "zrender/animation/animation",
            'zrender/shape/Line',
            'zrender/shape/Circle'
        ], 
        function(zrender, Animation, LineShape, CircleShape){

            // 初始化zrender
            var zr = zrender.init( document.getElementById("Main") );
            var circle = new CircleShape({
                position : [100, 100],
                scale : [1, 1],
                style : {
                    x : 0,
                    y : 0,
                    r : 50,
                    brushType : 'fill',
                    color : 'rgba(33, 222, 10, 0.1)',
                    lineWidth : 5,
                    text :'circle',
                    textPosition :'inside'
                },
                draggable : true,
                onmouseover  : function(){
                    zr.animate( circle.id,"style")
                        .when( 1000, {
                            r : 100
                        }).when( 2000, {
                            r : 50
                        })
                        .start();
                }
            });
            zr.addShape(circle);
            zr.render();

            var tm1 = zr.animate( circle.id, "", false)
                .when(1000, {
                    position : [200, 0]
                })
                .when(2000, {
                    position : [200, 200]
                })
                .when(3000, {
                    position : [0, 200]
                })
                .when(4000, {
                    position : [100, 100]
                })
                .start();

            zr.animate(circle.id, 'style', false)
                .when(4000, {
                    color: 'rgba(222, 222, 10, 1)'
                })
                .start();



var tenDeg = Math.PI / 18;
var origin = tenDeg;
var RectangleShape = require('zrender/shape/Rectangle');
zr.addShape(new RectangleShape({
    style : {
        x : 100,
        y : 100,
        width : 160,
        height : 40,
        color : 'red' ,
        text : 'Click to rotation!',
        textPosition : 'inside'
    },
    rotation : [tenDeg, 180, 120],
    draggable : true,
    clickable : true,
    onclick: function(params) {
        origin += tenDeg;
        zr.modShape(params.target.id, {rotation : [origin, 180, 120]});
        zr.refresh();
    }
}));
zr.render();

// 直线
//var LineShape = require('zrender/shape/Line');
var line = new LineShape({
    style : {
        xStart : 100,
        yStart : 100,
        xEnd : 400,
        yEnd : 300,
        strokeColor : 'rgba(135, 206, 250, 0.8)',   // == color
        lineWidth : 5,
        lineCap : 'round',
        lineType : 'dashed',
        text:'line',
        textPosition:'end'
    },
    draggable : true
})
zr.addShape(line);
zr.render();

 zr.animate(line.id, 'style', false)
                .when(1000, {
                    xEnd: 500,
                    yEnd: 400
                })
                .start();

 
 var point1 = {
    x: 100,
    y: 500
 }
 var point2 = {
    x: 300,
    y: 500
 }
 var line1 = new LineShape({
    style : {
        xStart : point1.x,
        yStart : point1.y,
        xEnd : point2.x,
        yEnd : point2.y,
        strokeColor : 'rgba(135, 206, 250, 0.8)',   // == color
        lineWidth : 1,
        lineCap : 'round',
        lineType : 'dashed',

    },
    draggable : true
})

 var line2 = new LineShape({
    style : {
        xStart : point2.x,
        yStart : point2.y,
        xEnd : point1.x,
        yEnd : point1.y,
        strokeColor : 'rgba(135, 206, 250, 0.8)',   // == color
        lineWidth : 1,
        lineCap : 'round',
        lineType : 'dashed',

    },
    draggable : true
})

 zr.addShape(line1)
 zr.addShape(line2)
 zr.render()

})