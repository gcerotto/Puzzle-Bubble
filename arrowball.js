var ArrowBall = function () {
        this.left = 0;
        this.top = 0;
        this.colour = "";
        this.centerX = 0;
        this.centerY = 0;
        this.speed = 0.6;
        this.launched = false;
        this.angle = 0;
        this.fixedY = 0;
        this.width = 0;
};

ArrowBall.prototype.add = function (colour) {
    this.colour=colour;
    this.balldiv = document.createElement('div');
    this.balldiv.setAttribute('id', 'arrowballdiv');
    this.balldiv.setAttribute('class', 'balldiv0');                                                                                                                                                                   
    this.ball = document.createElement('img');
    this.ball.setAttribute('src', colour+'.svg');                                                                                                                              
    this.ball.setAttribute('class', 'ball');
    
    this.position();
    
    this.balldiv.appendChild(this.ball);                                                                                                                                                                                   
    gamebox.appendChild(this.balldiv);
};

ArrowBall.prototype.position = function () {
    this.width=Math.floor(gamebox.offsetWidth/(gamestate.columns*2+1)*2);
    this.left=Math.floor(gamebox.offsetWidth/2-this.width/2);    
    this.top=Math.floor(gamebox.offsetHeight/100*84);
    this.balldiv.style.left=this.left + 'px';
    this.balldiv.style.top=this.top + 'px';
    this.centerX=this.left+(this.width/2);
    this.centerY=this.top+(this.width/2);
    this.fixedY = this.centerY;
};

ArrowBall.prototype.disappear = function () {
    var balldiv=document.getElementById("arrowballdiv")
    gamebox.removeChild(balldiv);
};

ArrowBall.prototype.remove = function () {
    var balldiv=document.getElementById("arrowballdiv")
    this.balldiv.classList.add('fall');
    setTimeout(function(){gamebox.removeChild(balldiv)},2000);
};

ArrowBall.prototype.getangle = function (e) {
    
    var x = e.clientX-box.left;
    var y = e.clientY-box.top;
    
    var arrowX = box.width/2;
    var arrowY = this.fixedY;

    var angle = Math.atan2(x - arrowX, - (y - arrowY) )*(180/Math.PI);
    
    if (angle < -80) angle=-80;
    if (angle > 80) angle=80;
    
    this.angle = angle*(Math.PI/180);
    this.dx = this.speed*Math.sin(this.angle);
    this.dy = this.speed*Math.cos(this.angle);
};

ArrowBall.prototype.getspeed = function (e) {
    this.dx = this.speed*Math.sin(arrowp.angle*(Math.PI/180));
    this.dy = this.speed*Math.cos(arrowp.angle*(Math.PI/180));
};


ArrowBall.prototype.move = function (e, timestamp, mouse) {
    
    if(gamestate.edit||gamestate.add) return;
    
    if(!this.launched) {
        if (mouse) {
            this.getangle(e);
        }
        else {
            this.getspeed();
        }
        this.last=timestamp;
    }
    this.launched = true;
    var dt = timestamp - this.last;
    this.left += this.dx*dt;
    this.top -= this.dy*dt;
    this.balldiv.style.left = this.left + 'px';
    this.balldiv.style.top = this.top + 'px';
    this.centerX=this.left+(this.width/2);
    this.centerY=this.top+(this.width/2);
    
    if (this.left <= 0) {
        this.dx*=-1;
        this.left = 0;
    } 
    else if (this.left + this.width >= box.width) {
        this.dx*=-1;
        this.left = box.width-this.width;
    }
    else if (this.top <= box.top) {
//         console.log(box.top+"this"+this.top);
        ball_hit();
        return;
    }
    
    for (var j=0; j<gamestate.rows; j++){
        for (var i=0; i<gamestate.columns; i++) {
            if(gamestate.balls[j][i].display)
                if (ballcollision(arrowball, gamestate.balls[j][i])) {
//                     console.log(gamestate.balls)
//                     console.log(arrowball);
                    console.log("collision ball"+j+i);
                    //gamestate.balls[j][i].remove();
                    ball_hit();
                    return;
                }
        }
    }
    
    this.last=timestamp;
    
    if (mouse)
        requestAnimationFrame(function(timestamp){ arrowball.move(e, timestamp, true); })
    else
        requestAnimationFrame(function(timestamp){ arrowball.move(null, timestamp, false) });

    
};

function ballcollision(ball1, ball2) {
    var dx = ball1.centerX - ball2.centerX;
    var dy = ball1.centerY - ball2.centerY;
    var len = Math.sqrt(dx * dx + dy * dy);
//  console.log("len "+len+" min "+ball1.width*2+ "ARROW X" + ball1.centerX +" ARROW Y "+ ball1.centerY +"   BALL X "+ ball2.centerX +" BALL Y "+ ball2.centerY +" dx "+dx+" dy "+dy)
    if (len < ball1.width) return true 
    else return false;
}

function gridposition(x, y) {
        var row = Math.floor(y / arrowball.width);
        
        var shift=0;
        
        if (row<0) row=0;
        if (row % 2) {
            shift=arrowball.width/2;
        }
        
        var column = Math.floor( (x-shift) / arrowball.width);
        
        if (column<0) column=0;
        if (column>gamestate.columns-1) column=gamestate.columns-1;
        
        return { col: column, row: row };
}

function ball_hit() {
    
        var gridpos = gridposition(arrowball.centerX, arrowball.centerY);
        
        var row=gridpos.row;
        var col=gridpos.col;
        
        if (gridpos.col < 0) {
            gridpos.col = 0;
        }
            
        if (gridpos.col >= gamestate.columns) {
            gridpos.col = gamestate.columns - 1;
        }

        if (gridpos.row < 0) {
            gridpos.row = 0;
        }
            
        if (gridpos.row >= gamestate.rows) {
            gridpos.row = gamestate.rows - 1;
        }
        
         console.log("ballhit row "+row+" col "+col)
        
        if (gamestate.balls[row][col].display) {
            arrowball.disappear();
            arrowball=new ArrowBall;
            arrowball.add(colors[Math.floor(Math.random()*colors.length)]);
            return;
        }

        gamestate.balls[row][col].addtomatrix(row,col,arrowball.colour);
 
        cluster = findCluster(row, col, true, true, false);
            
        if (cluster.length >= 3) {
//             console.log(cluster)
            for (var i=0; i<cluster.length; i++) {
                cluster[i].remove();
            }
            if (arrowball) arrowball.remove();
            while(balldiv=document.getElementById("arrowballdiv"))
                gamebox.removeChild(balldiv);
            
        }
        else {
             gamestate.balls[row][col].add(row,col,arrowball.colour);
             arrowball.disappear();
             //console.log(arrowball.colour);
        }
        
        //floatingcluster=findFloatingClusters();
        
        //console.log(floatingcluster);
 
        check_gameover();
        
        arrowball=new ArrowBall;
        arrowball.add(colors[Math.floor(Math.random()*colors.length)]);
}

function check_gameover() {
        for (var i=0; i<gamestate.columns; i++) {
            if(gamestate.balls[(gamestate.rows-3)][i].display) {
                console.log("gameover");
                var gameover=document.createElement('div');
                gameover.setAttribute('id', 'gameover');
                gameover.innerHTML="GAMEOVER"
                document.body.appendChild(gameover);
            }
        }
}

function getNeighbors(row, column) {
//         console.log("row "+row+" col "+column)
        var rowoffset =       [ 0, 0,-1,-1,+1,+1]
        var oddcolumnoffset = [-1,+1,-1, 0,-1, 0]
        var evencolumnoffset= [-1,+1, 0,+1, 0,+1]

        var neighbors = [];
        var nrow=0;
        var ncol=0;

        for (var i=0; i<6; i++) {
            nrow = row + rowoffset[i];
            if (row%2) ncol = column + evencolumnoffset[i];
            else ncol = column + oddcolumnoffset[i];
//             console.log(nrow+" "+ncol)
            // Make sure the tile is valid
            if (ncol >= 0 && ncol < gamestate.columns && nrow >= 0 && nrow < gamestate.rows) {
                if (gamestate.balls[nrow][ncol].display) neighbors.push(gamestate.balls[nrow][ncol]);
                //if (gamestate.balls[nrow][ncol].display) console.log("row "+nrow+"col "+ncol+"    ")
            }
        }
        
        return neighbors;
}


function findCluster(row, col, match, reset, skipremoved) {
    
         if (reset) {
           resetProcessed();
         }
         
         var targettile = gamestate.balls[row][col];
         
         targettile.dis=true;
         
         var toprocess = [targettile];
         targettile.processed = true;
 //         console.log(targettile);
 //         console.log(toprocess)
         var foundcluster = [];
 
         while (toprocess.length > 0) {
             
             var currenttile = toprocess.pop();
//              console.log("ball "+row+" col "+col)
//               console.log(currenttile)
             if (!currenttile.dis || !currenttile.colour) {
                 continue;
             }
             
             if (skipremoved && currenttile.removed) {
               continue;
             }
             
             
             if (!match || currenttile.colour == targettile.colour) {
                 foundcluster.push(currenttile);
//                  console.log("found cluster")
                 var neighbors = getNeighbors(currenttile.row, currenttile.col);
 //                 console.log(neighbors)
                 for (var i=0; i<neighbors.length; i++) {
                     if (!neighbors[i].processed) {
 
                         toprocess.push(neighbors[i]);
                         neighbors[i].processed = true;
                     }
                 }
             }
         }
         
         //targettile.display=false;
         
         return foundcluster;
}
    
    
// function findCluster(tx, ty, matchtype, reset, skipremoved) {
//     // Reset the processed flags
//     if (reset) {
//         resetProcessed();
//     }
//     
//     // Get the target tile. Tile coord must be valid.
//     var targettile = gamestate.balls[tx][ty];
//     
//     // Initialize the toprocess array with the specified tile
//     var toprocess = [targettile];
//     targettile.processed = true;
//     targettile.display=true;
//     var foundcluster = [];
// 
//     while (toprocess.length > 0) {
//         // Pop the last element from the array
//         var currenttile = toprocess.pop();
//         
//         // Skip processed and empty tiles
//         if (!currenttile.display) {
//             continue;
//         }
//         
//         // Skip tiles with the removed flag
//         if (skipremoved && currenttile.removed) {
//             continue;
//         }
//         
//         // Check if current tile has the right type, if matchtype is true
//         if (!matchtype || (currenttile.colour == targettile.colour)) {
//             // Add current tile to the cluster
//             foundcluster.push(currenttile);
//             
//             // Get the neighbors of the current tile
//             var neighbors = getNeighbors(currenttile.row, currenttile.col);
//             
//             // Check the type of each neighbor
//             for (var i=0; i<neighbors.length; i++) {                                                                                                                                                               
//                 if (!neighbors[i].processed) {                                                                                                                                                                     
//                     // Add the neighbor to the toprocess array                                                                                                                                                     
//                     toprocess.push(neighbors[i]);                                                                                                                                                                  
//                     neighbors[i].processed = true;                                                                                                                                                                 
//                 }                                                                                                                                                                                                  
//             }                                                                                                                                                                                                      
//         }                                                                                                                                                                                                          
//     }                                                                                                                                                                                                              
//                                                                                                                                                                                                                    
//     // Return the found cluster                                                                                                                                                                                    
//     return foundcluster;
// }

 // Find floating clusters
function findFloatingClusters() {
    // Reset the processed flags
    resetProcessed();
    
    var foundclusters = [];
    console.log("search floating")
    // Check all tiles
    for (var i=0; i<gamestate.rows; i++) {
        for (var j=0; j<gamestate.columns; j++) {
            var tile = gamestate.balls[i][j];
            if (!tile.processed) {
                // Find all attached tiles
                var foundcluster = findClusterfloat(i, j);
                 console.log("i "+i+" j "+j)
                 console.log(foundcluster)
                // There must be a tile in the cluster
                if (foundcluster.length <= 0) {
                    continue;
                }
                
                // Check if the cluster is floating
                var floating = true;
                for (var k=0; k<foundcluster.length; k++) {
                    if (foundcluster[k].top == 0) {
                        // Tile is attached to the roof
                        floating = false;
                        break;
                    }
                }
                
                if (floating) {
                    // Found a floating cluster
                    foundclusters.push(foundcluster);
                }
            }
        }
    }
    
    return foundcluster;
}


    function findClusterfloat(tx, ty) {

        
        // Get the target tile. Tile coord must be valid.
        var targettile = gamestate.balls[tx][ty];
        
        // Initialize the toprocess array with the specified tile
        var toprocess = [targettile];
        targettile.processed = true;
        var foundcluster = [];

        while (toprocess.length > 0) {
            // Pop the last element from the array
            var currenttile = toprocess.pop();
            
            // Skip processed and empty tiles
            if (!currenttile.colour) {
                continue;
            }
            
            // Skip tiles with the removed flag
            if (currenttile.removed) {
                continue;
            }

                foundcluster.push(currenttile);
                
                // Get the neighbors of the current tile
                var neighbors = getNeighbors(currenttile.row, currenttile.col);
                
                // Check the type of each neighbor
                for (var i=0; i<neighbors.length; i++) {
                    if (!neighbors[i].processed) {
                        // Add the neighbor to the toprocess array
                        toprocess.push(neighbors[i]);
                        neighbors[i].processed = true;
//                         console.log(toprocess)
                    }
                }
            }
            return neighbors
        }

// Reset the processed flags
function resetProcessed() {
    for (var i=0; i<gamestate.rows; i++) {
        for (var j=0; j<gamestate.columns; j++) {
            gamestate.balls[i][j].processed = false;
        }
    }
}

// Reset the removed flags
function resetRemoved() {
    for (var i=0; i<gamestate.rows; i++) {
        for (var j=0; j<gamestate.columns; j++) {
            gamestate.balls[i][j].removed = false;
        }
    }
}

function addball(e) {
    var x = e.clientX-box.left;
    var y = e.clientY-box.top;
    var pos=gridposition(x, y);
    gamestate.balls[pos.row][pos.col].add(pos.row,pos.col,gamestate.add);
    gamestate.add=false;
}
    
    // Get the neighbors of the specified tile
//     function getNeighbors(tile) {
//         var tilerow = (tile.y + rowoffset) % 2; // Even or odd row
//         var neighbors = [];
//         
//         // Get the neighbor offsets for the specified tile
//         var n = neighborsoffsets[tilerow];
//         
//         // Get the neighbors
//         for (var i=0; i<n.length; i++) {
//             // Neighbor coordinate
//             var nx = tile.x + n[i][0];
//             var ny = tile.y + n[i][1];
//             
//             // Make sure the tile is valid
//             if (nx >= 0 && nx < level.columns && ny >= 0 && ny < level.rows) {
//                 neighbors.push(level.tiles[nx][ny]);
//             }
//         }
//         
//         return neighbors;
//     }
