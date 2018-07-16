window.addEventListener('load',canvasApp);
//宽500长500
function canvasApp() {
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");

    // ctx.lineWidth=10;
    newRoot(500,700,160,Math.PI/2,0,15);
    newRoot(495,700,160,Math.PI/2,0,15);
    function newRoot (x,y,l,o, cnt,lineWidth) {
        if (cnt > 12) return;
        var p = Math.random()*2;
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.lineWidth = lineWidth;
        if (cnt > 8) ctx.strokeStyle = 'green';
        else ctx.strokeStyle = 'black';
        ctx.moveTo(x,y);//根节点
        ctx.lineTo(x+Math.cos(o)*l,y-Math.sin(o)*l);//树干
        ctx.stroke();
        newRoot(x+Math.cos(o)*l, y-Math.sin(o)*l,4*(l/parseInt(p*2+5)), o+Math.PI/parseInt(p*6+8), cnt + 1,lineWidth-2);
        newRoot(x+Math.cos(o)*l, y-Math.sin(o)*l,4*(l/parseInt(p*2+5)), o-Math.PI/parseInt(p*6+8), cnt + 1,lineWidth-2);
        newRoot(x+Math.cos(o)*l, y-Math.sin(o)*l,4*(l/parseInt(p*2+5)), o-Math.PI/parseInt(p*6+8), cnt + 1,lineWidth-2);

    }


}
canvasApp();
