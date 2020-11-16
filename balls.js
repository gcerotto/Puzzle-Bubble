var Ball = function () {
        this.left = 0;
        this.top = 0;
        this.row = 0;
        this.col= 0;
        this.colour = "";
        this.removed = false;
        this.processed = false;
        this.display = false;
        this.dis = false;
        this.centerX = 0;
        this.centerY = 0;
        this.width = 0;
};
    
Ball.prototype.add = function (row, col, colour) {
        this.addtomatrix(row, col, colour);
        this.balldiv = document.createElement('div');
        
        this.balldiv2 = document.createElement('div');
        this.balldiv2.setAttribute('class', 'balldiv' + row%2);
//         this.balldiv2.classList.add("left");
        this.balldiv.appendChild(this.balldiv2);
        
        this.balldiv.setAttribute('id', 'balldiv' + row + col);
        this.balldiv.setAttribute('class', 'balldiv' + row%2);
        this.balldiv.classList.add('hidden');
//         this.balldiv2.innerHTML=blue
         this.ball = document.createElement('img');
         this.ball.setAttribute('src', colour+'.svg');
         this.ball.setAttribute('class', 'ball');
         this.balldiv2.appendChild(this.ball);

//         this.balldiv.classList.add('fall');

        gamebox.appendChild(this.balldiv);
        
        this.position();
        
        this.balldiv.classList.remove('hidden');
        this.display=true;
        this.dis=true;
    };

Ball.prototype.addtomatrix = function (row, col, colour) {
        this.row=row;
        this.col=col;
        this.colour=colour;
}

    
Ball.prototype.position = function () {
        this.width=gamebox.offsetWidth/(gamestate.columns*2+1)*2;
        this.left = this.col*this.width;
        if (this.row % 2) {
            this.left += this.width/2;
        }
        this.top = this.row * (this.width/100*89);
        this.balldiv.style.left=this.left + 'px';
        this.balldiv.style.top=this.top + 'px';
        this.centerX=this.left+(this.width/2);
        this.centerY=this.top+(this.width/2);
    };
    
Ball.prototype.remove = function () {
//     console.log(gamebox.removeChild(this.balldiv));
        if (this.display) {
            var balldiv=document.getElementById("balldiv"+this.row+this.col)
            this.balldiv.classList.add('ontop');
            this.balldiv.classList.add('fall');
            
            var lr = Math.random() < 0.5 ? "left" : "right";
            this.balldiv2.classList.add(lr);
            
            setTimeout(function(){gamebox.removeChild(balldiv)},2000);
            this.display=false;
        }
    };
    

function createBalls () {
    //nella griglia
    for (var j=0; j<gamestate.rows; j++){
        gamestate.balls[j]=[];
        for (var i=0; i<gamestate.columns; i++) {
            gamestate.balls[j][i]=new Ball();
        }
    }                                                                                                                                                                                                              

    for (var j=0; j<gamestate.initrows; j++){
        for(var i=0; i<gamestate.columns; i++) {
            gamestate.balls[j][i].add(j,i,colors[Math.floor(Math.random()*colors.length)]);
            
        }
    }
    
//     console.log(gamestate.balls);
    //sulla freccia
     arrowball.add(colors[Math.floor(Math.random()*colors.length)]);
} 
var xmlns="http://www.w3.org/2000/svg";

//               var svgElem = document.createElementNS (xmlns, "svg");
// //             svgElem.setAttributeNS ("60", "width", boxWidth);
// //             svgElem.setAttributeNS ("60", "height", boxHeight);
//                 svgElem.setAttributeNS(null,"id","mycircle");
//     svgElem.setAttributeNS(null,"cx",30);
//     svgElem.setAttributeNS(null,"cy",30);
//     svgElem.setAttributeNS(null,"r",30);
//     svgElem.setAttributeNS(null,"fill","url(gradient)");
// 
//             var g = document.createElementNS (xmlns, "g");
//             svgElem.appendChild (g);
//             g.setAttributeNS (null, 'transform', 'matrix(1,0,0,-1,0,300)');
// 
// 
//             var defs = document.createElementNS (xmlns, "defs");
//             var grad = document.createElementNS (xmlns, "radialGradient");
//             grad.setAttributeNS (null, "id", "gradient");
//             grad.setAttributeNS (null, "cx", "32");
//             grad.setAttributeNS (null, "cy", "32");
//             grad.setAttributeNS (null, "r", "30");
//             grad.setAttributeNS (null, "fx", "17");
//             grad.setAttributeNS (null, "fy", "17");
//             grad.setAttributeNS (null, "gradientTransform", "translate(-2,-2)");
//             var stopTop = document.createElementNS (xmlns, "stop");
//             stopTop.setAttributeNS (null, "offset", "0%");
//             stopTop.setAttributeNS (null, "stop-color", "#ffffff");
//             grad.appendChild (stopTop);
//             var stopBottom = document.createElementNS (xmlns, "stop");
//             stopBottom.setAttributeNS (null, "offset", "50%");
//             stopBottom.setAttributeNS (null, "stop-color", "#00c0ff");
//             var stop3 = document.createElementNS (xmlns, "stop");
//             stop3.setAttributeNS (null, "offset", "75%");
//             stop3.setAttributeNS (null, "stop-color", "#0080ff");
//             var stop4 = document.createElementNS (xmlns, "stop");
//             stop4.setAttributeNS (null, "offset", "10%");
//             stopBottom.setAttributeNS (null, "stop-color", "#000000");
//             grad.appendChild (stopBottom);
//             defs.appendChild (grad);
//             g.appendChild (defs);
//             document.body.appendChild(svgElem)

// var blue =`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
// <svg
//    xmlns:svg="http://www.w3.org/2000/svg"
//    xmlns="http://www.w3.org/2000/svg"
//     >
//   <defs
//      id="defs">
//     <radialGradient
//        id="gradient"
//        cx="32"
//        cy="32"
//        r="30"
//        fx="17"
//        fy="17"
//        gradientTransform="translate(-2,-2)">
//       <stop
//          offset="0%"
//          stop-color="#ffffff"
//          id="stop1" />
//       <stop
//          offset="50%"
//          stop-color="#00c0ff"
//          id="stop2" />
//       <stop
//          offset="75%"
//          stop-color="#0080ff"
//          id="stop3" />
//       <stop
//          offset="100%"
//          stop-color="#000000"
//          id="stop4"
//          style="stop-color:#133659;stop-opacity:1" />
//     </radialGradient>
//   </defs>
//   <circle
//      r="30"
//      cx="30"
//      cy="30"
//      id="circle13"
//      style="fill:url(#gradient)" />
// </svg>`



