var canvas = document.getElementById('obscure');
var ctx = canvas.getContext('2d');

function clearRect(r){
	//ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.clearRect(r.x, r.y, r.w, r.h);
	drawRect({
		x: 0,
		y: 0,
		width: canvas.width,
		height: canvas.height,
	}, 'transparent');
}

function drawRect(r, fill){
	ctx.beginPath();
	ctx.rect(r.x, r.y, r.w, r.h);
	//ctx.stroke();
	if(fill){
		ctx.fillStyle = fill;
		ctx.fill();
	}
	ctx.closePath();
}

var px = 16;
var py = 8;
var dx = canvas.width / px;
var dy = canvas.height / py;
for(var x = 0; x < px; x++){
	for(var y = 0; y < py; y++){
		var b = Math.floor(50 * Math.random());
		var black = 'rgb(' + [b, b, b].join(',') + ')';
		drawRect({x: x * dx, y: y * dy, w: dx, h: dy}, black);
	}
}

function reduceObscurity(){
	var clears = 8;
	for(var i = 0; i < clears; i++){
		var cx = Math.floor(px * Math.random());
		var cy = Math.floor(py * Math.random());
		clearRect({x: cx * dx, y: cy * dy, w: dx, h: dy});
	}
}

function clearCanvas(){
	clearRect({x: 0, y: 0, w: canvas.width, h: canvas.height});
}