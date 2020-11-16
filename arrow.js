var Arrow = function () {
        this.angle=0;
};


function moveArrow(e) {
    var arrow = document.getElementById("arrowdiv");
    
    var x = e.clientX-box.left;
    var y = e.clientY-box.top;
    
//     var coor = "Coordinates: (" + x + "," + y + ")";
//     document.getElementById("demo").innerHTML = coor;
//     var gb = document.getElementById("pointer");
    
    var arrowX = box.width/2;
//     var arrowY = box.height - arrow.offsetHeight/2;
    var arrowY=arrowball.fixedY
//       var el=document.getElementById("arrow").getBoundingClientRect();
//       console.log(el);
//      console.log(document.getElementById("gamebox").getBoundingClientRect());
    var angle = Math.atan2(x - arrowX, - (y - arrowY) )*(180/Math.PI);
// console.log("x "+x+" y "+y+" ax "+arrowX+" ay "+arrowball.centerY)

//        console.log(angle);
    if (angle < -80) angle=-80;
    if (angle > 80) angle=80;
    
    arrow.style.transform = "translate(-50%, 0) rotate(" + angle + "deg)";
    
    arrowp.angle=angle;
//     var coor = "Coordinates: (" + x + "," + y + ") arrow: left" + arrowX +",top" + arrowY;
//     document.getElementById("demo").innerHTML = coor;
}

function moveArrowDeg(deg) {
    var arrow = document.getElementById("arrowdiv");
    
    var angle=arrowp.angle+deg
        console.log(angle);
    if (angle < -80) angle=-80;
    if (angle > 80) angle=80;
    
    arrow.style.transform = "translate(-50%, 0) rotate(" + angle + "deg)";
    
    arrowp.angle=angle;

//     var coor = "Coordinates: (" + x + "," + y + ") arrow: left" + arrowX +",top" + arrowY;
//     document.getElementById("demo").innerHTML = coor;
}

function createArrow() {
    var arrowdiv=document.createElement('div');
    arrowdiv.setAttribute('id', 'arrowdiv');
    var arrowimg=document.createElement('img');
    arrowimg.setAttribute('id', 'arrow');
    arrowimg.setAttribute('src', 'arrow.svg');
    arrowimg.setAttribute('alt', 'arrow');
    arrowdiv.appendChild(arrowimg);
    gamebox.appendChild(arrowdiv);
}

function kdown(e) {
    if (e.keyCode==37) moveArrowDeg(-10);
    if (e.keyCode==39) moveArrowDeg(10);
    if (e.keyCode==38 || e.keyCode==13 || e.keyCode==32) 
        if (!arrowball.launched) {
            requestAnimationFrame(function(timestamp){ arrowball.move(null, timestamp, false); })
        }
}
