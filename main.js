
$(document).ready(function () {

    var canvas = $("#canvas");
    var context = canvas.get(0).getContext("2d");
    canvas.attr("width",$(window).get(0).innerWidth);
    canvas.attr("height",$(window).get(0).innerHeight);
    var canvasWidth = canvas.width();
    var canvasHeight = canvas.height();

    //設定按鈕------------------------------------------------

    var playAnimation = true;

    var startButton = $("#startAnimation");
    var stopButton = $("#stopAnimation");
    
    startButton.hide();
    startButton.click(function() {
        $(this).hide();
        stopButton.show();

        playAnimation = true;
        animate();
    });

    stopButton.click(function() {
        $(this).hide();
        startButton.show();

        playAnimation = false;
    });
    


    var canvasX= canvasWidth/2;      //canvas X 起始位置
    var canvasY = canvasHeight/2;   //canvas Y 起始位置

    var angleY = Math.PI/360;

    var stars=[
        [56.1, 4.3],[43.6, 8.5],[34.1, 13.8],[22.7, 25.5],[16.4, 37.3],[11.9, 51.0],[8.7, 65.0],[6.9, 77.3],[4.7, 94.0],[3.9, 106.0],[2.4, 122.7],[1.4, 136.7],[1.1, 150.3],[0.9, 166.7],
        [1.2, 182.8],[3.4, 201.2],[7.6, 218.0],[16.4, 233.2],[30.2, 243.7],[45.2, 249.0],[64.7, 252.2],[84.7, 253.2],[104.6, 253.0],[123.6, 251.3],[143.7, 247.0],[161.6, 237.8],[172.7, 225.8],
        [179.2, 211.8],[183.2, 195.8],[185.6, 178.8],[186.6, 157.7],[186.9, 137.0],[186.4, 116.8],[185.6, 96.3],[183.9, 73.8],[180.6, 52.2],[174.6, 32.8],[163.2, 16.2],[137.4, 3.8],[114.7, 1.0],
        [93.7, 0.7],[74.2, 1.5],[84.4, 23.7],[67.7, 25.2],[55.9, 27.8],[43.9, 35.3],[37.2, 46.3],[32.7, 60.7],[30.6, 71.0],[28.4, 87.2],[27.1, 98.7],[25.7, 113.7],[24.7, 129.2],[24.1, 143.2],
        [23.6, 158.2],[23.4, 173.2],[24.6, 188.7],[30.4, 213.8],[47.7, 226.3],[74.6, 230.2],[94.2, 230.7],[113.1, 229.8],[133.1, 226.5],[150.2, 217.8],[158.7, 201.7],[161.9, 186.7],[163.6, 168.5],
        [164.1, 146.5],[164.1, 128.3],[163.4, 107.2],[162.2, 86.5],[160.1, 65.5],[156.2, 48.0],[148.2, 33.3],[125.9, 24.8],[104.4, 23.5],[94.3, 23.3],[84.6, 230.3],[59.8, 228.3],[25.8, 200.1],[138.3, 27.3],
        [161.3, 75.3],[163.1, 98.3],[163.8, 117.3],[152.2, 8.7],[170.2, 24.7],[178.2, 42.7],[182.6, 64.0],[184.9, 86.8],[167.7, 232.2],[133.7, 249.7],[96.9, 253.2],[22.9, 239.2],[10.9, 225.3],[1.9, 192.3],
        [85.1, 1.0],[5.6, 86.0],[2.9, 115.2],[125.7, 2.0],[36.6, 221.0]
    ];
    
 
    var starsLine = function (x, y, z, middlePointX, middlePointY) {
        this.x = x;
        this.y = y;

        this.xpos = x - middlePointX;
        this.ypos = y - middlePointY;
        this.zpos = this.z = z;

        this.r = 1 + Math.ceil(Math.random()*4);  //Math.ceil 取整數

    }

  

    var star = new Array();

    var starsLength = stars.length;     

    var middlePointX = 0;
	var middlePointY = 0;  

	// 所有點的總和 求出中點(圓心)
	for(var i=0; i < starsLength; i++){
		middlePointX+=stars[i][0];	
		middlePointY+=stars[i][1];	
	}
	middlePointX = middlePointX/starsLength;
    middlePointY = middlePointY/starsLength;
    
    for(var i=0; i < starsLength; i++){
        
        var x = stars[i][0];
        var y = stars[i][1];
        var z = (Math.random()>0.5)?0:20;

        star.push(new starsLine(x,y,z,middlePointX, middlePointY));
    }

    function rotateX(starsLine1){
        var cos = Math.cos(angleY);
        var sin = Math.sin(angleY);

        var y1 = starsLine1.ypos;
        var z1 = starsLine1.zpos;

        starsLine1.ypos = y1 * cos - z1 * sin;
        starsLine1.zpos = z1 * cos + y1 * sin;
    }

    function rotateY(starsLine1){
        var cos = Math.cos(angleY);
        var sin = Math.sin(angleY);

        var x1 = starsLine1.xpos;
        var z1 = starsLine1.zpos;

        starsLine1.xpos = x1 * cos - z1 * sin;
        starsLine1.zpos = z1 * cos + x1 * sin;
    }

    function rotateZ(starsLine1){
        var cos = Math.cos(angleY);
        var sin = Math.sin(angleY);

        var x1 = starsLine1.xpos;
        var y1 = starsLine1.ypos;

        starsLine1.xpos = x1 * cos - y1 * sin;
        starsLine1.zpos = y1 * cos + x1 * sin;
    }
 
    function animate(){

        context.clearRect(0,0,canvasWidth , canvasHeight);
        
        var starLength = star.length;   
        for(var i = 0; i <starLength; i++) {
            var starsLine1 = star[i];

            for(var j = i+1, k = i+2; j <starLength, k <starLength; j++, k++) {
                var starsLine2 = star[j];
                var starsLine3 = star[k];

                var x1 = starsLine1.x;
                var y1 = starsLine1.y;
                var x2 = starsLine2.x;
                var y2 = starsLine2.y;
                var x3 = starsLine3.x;
                var y3 = starsLine3.y;

                var pointLine = 35;
                var distance1=Math.sqrt(Math.pow((x1-x2),2)+Math.pow((y1-y2),2));
                var distance2=Math.sqrt(Math.pow((x1-x3),2)+Math.pow((y1-y3),2));


                if(distance1 < pointLine){
                    context.beginPath();
                    context.moveTo(x1,y1);
                    context.lineTo(x2,y2);
                    context.strokeStyle = "rgba("+0+","+0+","+0+","+"0."+""+Math.floor(Math.random()*7)+")";;
                    context.stroke();
                }
                if(distance1 < pointLine && distance2 < pointLine){

                    var color = "rgba("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+"0."+""+Math.floor(Math.random()*7)+")";
                    context.fillStyle = color;
                    context.beginPath();
                    context.moveTo(x1,y1);
                    context.lineTo(x2,y2);
                    context.lineTo(x3,y3);
                    context.fill();
                }
            }

            var fl = 250;
            var scale = fl/(fl + starsLine1.zpos);
            starsLine1.x = canvasX + starsLine1.xpos*scale;
            starsLine1.y = canvasY + starsLine1.ypos*scale;

            rotateY(starsLine1);

        }
 

        if (playAnimation) {
            window.requestAnimationFrame(animate);
        }

    }

    animate();

});
