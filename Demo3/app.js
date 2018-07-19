var Branch = function() {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.x = canvas.width / 2;
    this.y = canvas.height;
    this.radius = 10;
    this.angle = Math.PI / 2;

    this.fillStyle = "#000";
    this.shadowColor = "#000";
    this.shadowBlur = 2;

    this.speed = width/500;
    this.generation = 0;
    this.distance = 0;
};
Branch.prototype = {
    process: function() {
        oldBranches.add(this);
        this.draw();
        if (this.generation > 0) {
            this.drawPoints();
        }
        this.iterate();
        this.split();
        this.die();
    },
    draw: function() {
        var context = this.context;
        context.save();
        context.fillStyle = this.fillStyle;
        context.shadowColor = this.shadowColor;
        context.shadowBlur = this.shadowBlur;
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.arc(this.x, this.y, this.radius, 0, 2*Math.PI, true);
        context.closePath();
        context.fill();
        context.restore();
    },
    drawPoints:function() {
        var context = this.context;
        var p = Math.random();
        var theta = Math.PI/2;
        context.save();
        context.fillStyle = 'green';
        context.shadowColor = this.shadowColor;
        context.shadowBlur = this.shadowBlur;
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.arc(this.x+10*p*Math.cos(theta*p), this.y-10*p*Math.sin(theta*p), 4, 0, 2*Math.PI, true);
        context.closePath();
        context.fill();
        context.restore();
    },
    iterate: function() {
        var deltaX = this.speed * Math.cos(this.angle);
        var deltaY = - this.speed * Math.sin(this.angle);
        this.x += deltaX;
        this.y += deltaY;
        this.radius *= (0.99 - this.generation/250);
        var deltaDistance = Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2));
        this.distance += deltaDistance;
        if (this.speed > this.radius * 2){
            this.speed = this.radius * 2;
        }
        this.angle += Math.random()/5 - 1/5/2;
    },
    split: function() {
        var splitChance = 0;
        if (this.generation === 1)
            splitChance = this.distance / height - 0.2;
        else if (this.generation < 3)
            splitChance = this.distance / height - 0.1;
        if (Math.random() < splitChance) {
            var n = 2 + Math.round(Math.random()*3);
            for (var i = 0; i < n; i++) {
                var branch = new Branch();
                branch.x = this.x;
                branch.y = this.y;
                branch.angle = this.angle;
                branch.radius = this.radius * 0.9;
                branch.generation++;
                branch.fillStyle =this.fillStyle;
                branches.add(branch);
            }
            branches.remove(this);
        }
    },

    die: function() {
        if (this.radius < 0.5) {
            branches.remove(this);
        }
    }
};

var BranchCollection = function() {
    this.branches = [];
    this.canvas = canvas;
};
BranchCollection.prototype = {
    add: function(branch) {
        this.branches.push(branch);
    },
    process: function() {
        for (var b in this.branches) {
            this.branches[b].process();
        }
    },
    remove: function(branch) {
        for (var  b in this.branches)
            if (this.branches[b] === branch)
                this.branches.splice(b, 1);
    }
};

var dieBranches = function () {
    this.oldBeanches = [];
    this.canvas = canvas;
};
dieBranches.prototype = {
    add:function (branch) {
        this.oldBeanches.push(branch)
    },
    draw:function () {
        for (var x in this.oldBeanches) {
            this.oldBeanches[x].draw();
            this.oldBeanches[x].drawPoints();
            this.oldBeanches.splice(x,1);
        }
    }
};

var width = window.innerWidth;
var height = window.innerHeight;
var canvas = document.getElementById("myCanvas");
canvas.width = width;
canvas.height = height;
var n = 2 + Math.random() * 3;
var initialRadius = width / 50;
branches = new BranchCollection();
oldBranches = new dieBranches();

for (var i = 0; i < n; i++) {
    branch = new Branch();
    branch.x = width/2 - initialRadius + i * 2 * initialRadius / n;
    branch.radius = initialRadius;
    branches.add(branch);
}

var interval = setInterval(function() {
    branches.process();
    console.log(oldBranches);
    if (branches.branches.length == 0) {
        clearInterval(interval);
    }
}, 20);

function oldTree() {
    var c = document.getElementById('myCanvas');
    var context = c.getContext('2d');
    c.height = height;
    var oldInterval = setInterval(function() {
        oldBranches.draw();

    }, 20);
}


