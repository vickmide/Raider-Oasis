$(function() {
	function callback(name)
	{
		//document.getElementById("result").innerHTML = "Result: " + name;
		gest.clear();
		alert(name);
	}
	
	var gest = new gestures({
		debug: true,
		draw: true,
		drawColor: "#000000",
		drawWidth: 5,
		autoTrack: true,
		allowRotation: true,
		inverseShape: true,
		points: 33
	});
	
	gest.addGesture("Line", [
		{x: 0, y: 0},
		{x: 0, y: 100}
	], callback);
	
	gest.addGesture("Square", [
		{x: 0, y: 0},
		{x: 200, y: 0},
		{x: 200, y: 200},
		{x: 0, y: 200},
		{x: 0, y: 0}
	], callback);
	
	gest.addGesture("Rectangle", [
		{x: 0, y: 0},
		{x: 210, y: 0},
		{x: 210, y: 100},
		{x: 0, y: 100},
		{x: 0, y: 0}
	], callback);
	
	gest.addGesture("ZigZag", [
		{x: 0, y: 0},
		{x: 50, y: 87},
		{x: 100, y: 0},
		{x: 150, y: 87}
	], callback);
	
	gest.addGesture("Triangle", [
		{x: 0, y: 0},
		{x: 100, y: 100},
		{x: 0, y: 100},
		{x: 0, y: 0}
	], callback);
	
	gest.addGesture("Equilateral Triangle", [
		{x: 0, y: 0},
		{x: 50, y: 87},
		{x: 100, y: 0},
		{x: 0, y: 0}
	], callback);
	
	gest.addGesture("Check", [
		{x: 0, y: 0},
		{x: 50, y: 50},
		{x: 100, y: 0},
	], callback);
	
	var x = 0;
	var y = -100;
	var circle = [];
	var totalPoints = 72;
	var step = (Math.PI*2)/totalPoints;
	
	for(var angle = 1; angle < totalPoints; angle++)
	{
		var newX = x*Math.cos(angle*step)-y*Math.sin(angle*step);
		var newY = y*Math.cos(angle*step)+x*Math.sin(angle*step);
		var point = {x: newX, y: newY};
		circle.push(point);
	}
	
	gest.addGesture("Circle", circle, callback)
});
