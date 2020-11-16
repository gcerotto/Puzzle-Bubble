/*var box=$("#gamebox");

var boxCenter=[box.offset().left+box.width()/2, box.offset().top+box.height()/2];

var angle = Math.atan2(e.pageX - boxCenter[0], - (e.pageY - boxCenter[1]) )*(180/Math.PI);      

box.css({ "transform": 'rotate(' + angle + 'deg)'});*/
//         <script src="script.js"></script> 
document.getElementById('gamebox').addEventListener('mousemove', function (e) {
    var x = e.clientX;
    var y = e.clientY;
    var coor = "Mouse Coordinates: (" + x + "," + y + ")";
    document.getElementById("demo").innerHTML = coor;
});

alert("ciao");

$(function(){
		boxRollovers();
	});
	
	function boxRollovers()
	{
		$selector = $("img");
		XAngle = 0;
		YAngle = 0;
		Z = 50;
		
		$selector.on("mousemove",function(e){
			var $this = $(this);
			var XRel = e.pageX - $this.offset().left;
			var YRel = e.pageY - $this.offset().top;
			var width = $this.width();
		
			YAngle = -(0.5 - (XRel / width)) * 40; 
			XAngle = (0.5 - (YRel / width)) * 40;
			updateView($this.children(".arrow"));
		});
		
		$selector.on("mouseleave",function(){
			oLayer = $(this).children(".arrow");
			oLayer.css({"transform":"perspective(525px) translateZ(0) rotateX(0deg) rotateY(0deg)","transition":"all 150ms linear 0s","-webkit-transition":"all 150ms linear 0s"});
			oLayer.find("strong").css({"transform":"perspective(525px) translateZ(0) rotateX(0deg) rotateY(0deg)","transition":"all 150ms linear 0s","-webkit-transition":"all 150ms linear 0s"});
		});
	}
	
	function updateView(oLayer)
	{
		oLayer.css({"transform":"perspective(525px) translateZ(" + Z + "px) rotateX(" + XAngle + "deg) rotateY(" + YAngle + "deg)","transition":"none","-webkit-transition":"none"});
		oLayer.find("strong").css({"transform":"perspective(525px) translateZ(" + Z + "px) rotateX(" + (XAngle / 0.66) + "deg) rotateY(" + (YAngle / 0.66) + "deg)","transition":"none","-webkit-transition":"none"});
	}
