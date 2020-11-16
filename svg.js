function blue() {
              var svgElem = document.createElementNS (xmlns, "svg");
//             svgElem.setAttributeNS ("60", "width", boxWidth);
//             svgElem.setAttributeNS ("60", "height", boxHeight);
                svgElem.setAttributeNS(null,"id","mycircle");
    svgElem.setAttributeNS(null,"cx",30);
    svgElem.setAttributeNS(null,"cy",30);
    svgElem.setAttributeNS(null,"r",30);
    svgElem.setAttributeNS(null,"fill","url(gradient)");

            var g = document.createElementNS (xmlns, "g");
            svgElem.appendChild (g);
            g.setAttributeNS (null, 'transform', 'matrix(1,0,0,-1,0,300)');


            var defs = document.createElementNS (xmlns, "defs");
            var grad = document.createElementNS (xmlns, "radialGradient");
            grad.setAttributeNS (null, "id", "gradient");
            grad.setAttributeNS (null, "cx", "32");
            grad.setAttributeNS (null, "cy", "32");
            grad.setAttributeNS (null, "r", "30");
            grad.setAttributeNS (null, "fx", "17");
            grad.setAttributeNS (null, "fy", "17");
            grad.setAttributeNS (null, "gradientTransform", "translate(-2,-2)"
            var stopTop = document.createElementNS (xmlns, "stop");
            stopTop.setAttributeNS (null, "offset", "0%");
            stopTop.setAttributeNS (null, "stop-color", "#ffffff");
            grad.appendChild (stopTop);
            var stopBottom = document.createElementNS (xmlns, "stop");
            stopBottom.setAttributeNS (null, "offset", "50%");
            stopBottom.setAttributeNS (null, "stop-color", "#00c0ff");
            var stop3 = document.createElementNS (xmlns, "stop");
            stop3.setAttributeNS (null, "offset", "75%");
            stop3.setAttributeNS (null, "stop-color", "#0080ff");
            var stop4 = document.createElementNS (xmlns, "stop");
            stop4.setAttributeNS (null, "offset", "10%");
            stopBottom.setAttributeNS (null, "stop-color", "#000000");
            grad.appendChild (stopBottom);
            defs.appendChild (grad);
            g.appendChild (defs);
            document.body.appendChild(svgElem)
            
            
            

    myCircle.setAttributeNS(null,"id","mycircle");
    myCircle.setAttributeNS(null,"cx",30);
    myCircle.setAttributeNS(null,"cy",30);
    myCircle.setAttributeNS(null,"r",30);
    myCircle.setAttributeNS(null,"fill","url(gradient)");
    
} 



                // lineargradient 
                var myLinearGradient = document.createElementNS("http://www.w3.org/2000/svg", "lineargradient");
                myLinearGradient.setAttribute("id", "myLGID");
                myLinearGradient.setAttribute("x1", "0%");
                myLinearGradient.setAttribute("x2", "0%");
                myLinearGradient.setAttribute("y1", "0%");
                myLinearGradient.setAttribute("y2", "100%");

                document.getElementById("mydefs").appendChild(myLinearGradient);

                //stops
                var stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
                stop1.setAttribute("id", "myStop1");
                stop1.setAttribute("offset", "70%");
                //stop1.setAttribute("style", "stop-color: White; stop-opacity: 1");
                stop1.setAttribute("stop-color", "White");
                document.getElementById("mydefs").appendChild(stop1);

                var stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
                stop2.setAttribute("id", "myStop2");
                stop2.setAttribute("offset", "80%");
                //stop2.setAttribute("style", "stop-color: #99cd9f; stop-opacity: 1");
                stop2.setAttribute("stop-color", "#99cd9f");
                document.getElementById("mydefs").appendChild(stop2);

                // Circle
                var myCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                myCircle.setAttribute("id", "idCircle");
                myCircle.setAttribute("cx", "50px");
                myCircle.setAttribute("cy", "50px");
                myCircle.setAttribute("r", "50px");

                myCircle.setAttribute("fill", "url(#myLGID)");

                document.getElementById("Svg1").appendChild(myCircle);





