window.addEventListener('load',canvasApp);
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
var leaf1 = new Image();
leaf1.src = './Imgs/leaf-1.png';
var leaf2 = new Image();
leaf2.src = './Imgs/leaf-2.png';
var leaf3 = new Image();
leaf3.src = './Imgs/leaf-3.png';//图片加载
function canvasApp() {
    newRoot(500,800,160,Math.PI/2,0,20,6);
    //theLeft:161 ; theRight: 839; theTop: 93
    newPoint(500,480,360,300);
    //树叶的分布，以(x,y)为圆心，R为半径的一个扇形区域随机生成树叶,n为树叶密度
}
function newRoot (x,y,l,o,cnt,lineWidth,end) { //生成一棵树 x,y:树根坐标；l:初始树干长；o:树枝分叉角度；cnt:0；lineWidth:初始树枝宽度；end:树的深度
    if (cnt > end) return;
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.lineWidth = lineWidth;
    ctx.moveTo(x,y);//根节点
    ctx.lineTo(x+Math.cos(o)*l,y-Math.sin(o)*l);//树干
    ctx.stroke();
    if (cnt > end-1) {
        ctx.drawImage(leaf1,x-3,y-9,20,20);
        ctx.drawImage(leaf1,x+Math.cos(o)*l-3,y-Math.sin(o)*l-9,20,20);
        ctx.drawImage(leaf2,x+Math.cos(o)*l-3,y-Math.sin(o)*l-9,20,20);
    }
    newRoot(x+Math.cos(o)*l, y-Math.sin(o)*l,l*0.8, o+Math.PI/7, cnt + 1,lineWidth-2);
    newRoot(x+Math.cos(o)*l, y-Math.sin(o)*l,l*0.8, o-Math.PI/7, cnt + 1,lineWidth-2);
}
function newPoint(x,y,R,n) {
    for (var i = 0;i < n;i++){
        ctx.drawImage(leaf1,x+aPoint(R).X,y-aPoint(R).Y,20,20);
        ctx.drawImage(leaf2,x+aPoint(R).X,y-aPoint(R).Y,20,20);
        ctx.drawImage(leaf3,x+aPoint(R).X,y-aPoint(R).Y,20,20);
    }
    function aPoint(R) { //圆的极坐标公式创建生成树叶区域
        var r = (Math.random()*0.75+0.2)*R;
        var o = (Math.random()*11-1)*Math.PI/9;
        var X = r*Math.cos(o);
        var Y = r*Math.sin(o);
        return {X,Y};
    }
}