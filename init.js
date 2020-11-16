var gamestate = {
    rows: 8,
    columns: 8,
    initrows: 2,
    balls: [],
    edit: false,
    add: false,
};

var box = {
         top: 0,
         left: 0,
         width: 0,
         height: 0
};

var colors = [ "blue", "darkblue", "green", "purple", "red", "brown" ]

var arrowball = new ArrowBall;
var arrowp = new Arrow;

function init() {
//     var pointer=document.createElement('div');
//     pointer.setAttribute('id', 'pointer');
//     document.body.appendChild(pointer);
    
    var gamebox=document.createElement('div');
    gamebox.setAttribute('id', 'gamebox');
    document.body.appendChild(gamebox);

    initbox();
    createBalls();
    createArrow();
    level();
    
    gamebox.addEventListener("mousemove", function(event) {
            moveArrow(event);
    });
    
    gamebox.addEventListener('click', function (e) {
//         gamestate.balls[1][2].remove();
        
        if(gamestate.add && !gamestate.edit)
            addball(e);
        else if (!arrowball.launched) {
            requestAnimationFrame(function(timestamp){ arrowball.move(e, timestamp, true); })
//              var t = setInterval(function () {
//                 arrowball.move(e);
//              }, 20)
        }
//         setTimeout(function(){clearInterval(t)},20000);
    })
    
    window.addEventListener("resize", function (e) {
            initbox();
            for (var j=0; j<gamestate.rows; j++){
                for (var i=0; i<gamestate.columns; i++) {
                    if(gamestate.balls[j][i].display) gamestate.balls[j][i].position();
                }
            }
            arrowball.position();
    });
    
    document.addEventListener("keydown", function (e) {
        kdown(e);
    });

}

function initbox() {
    var rect=gamebox.getBoundingClientRect();
    box.left=Math.floor(rect.left);
    box.top=Math.floor(rect.top);
    box.width=Math.floor(rect.width);
    box.height=Math.floor(rect.height);
} 

function level() {
    var level=document.createElement('div');
    level.setAttribute('id', 'level');
    

    for (var i = 0; i < colors.length; i++) {

        var balldiv = document.createElement('div');
        balldiv.setAttribute('class', 'balldivl')
        balldiv.setAttribute('color', i);
    
        var ball = document.createElement('img');
        ball.setAttribute('src', colors[i]+'.svg');
        ball.setAttribute('class', 'ball');
        balldiv.appendChild(ball);
        level.appendChild(balldiv);
        
        balldiv.addEventListener('click', function (e) {
            var color=this.getAttribute("color");
            gamestate.add=colors[color];
            console.log(colors[color])
        });
        balldiv.addEventListener("mouseenter", function (e) {
            gamestate.edit=true;
        });
        balldiv.addEventListener("mouseleave", function (e) {
            gamestate.edit=false;
        });
    }
    gamebox.appendChild(level);
}
