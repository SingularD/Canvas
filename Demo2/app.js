window.addEventListener('load',canvasApp);
//宽500长500
function canvasApp() {
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    newRoot(500,800,160,Math.PI/2,0,20);
    //theLeft:161 ; theRight: 839; theTop: 93
    function newRoot (x,y,l,o, cnt,lineWidth) {
        if (cnt > 6) {
            return;
        }
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.lineWidth = lineWidth;
        ctx.moveTo(x,y);//根节点
        ctx.lineTo(x+Math.cos(o)*l,y-Math.sin(o)*l);//树干
        ctx.stroke();
        if (cnt > 5) {
            ctx.beginPath();
            ctx.arc(x+Math.cos(o)*l,y-Math.sin(o)*l,10,0,2*Math.PI);
            ctx.fillStyle = 'green';
            ctx.fill();
        }
        newRoot(x+Math.cos(o)*l, y-Math.sin(o)*l,l*0.8, o+Math.PI/7, cnt + 1,lineWidth-2);
        newRoot(x+Math.cos(o)*l, y-Math.sin(o)*l,l*0.8, o-Math.PI/7, cnt + 1,lineWidth-2);
    }
    function newPoint(x,y,R) {
        for (var i = 0;i < 800;i++){
            ctx.beginPath();
            ctx.arc(x+aPoint(R).X,y-aPoint(R).Y,10,0,2*Math.PI);
            ctx.fillStyle = 'green';
            ctx.fill();
        }
        function aPoint(R) {
            var r = Math.random()*0.9*R;
            var o = (Math.random()*11-1)*Math.PI/9;
            var X = r*Math.cos(o);
            var Y = r*Math.sin(o);
            return {X,Y};
        }
    }
    newPoint(500,470,360);
}
canvasApp();
