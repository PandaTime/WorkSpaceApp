var lastdrag = { x: 0, y: 0 };

export function windowToCanvas(canvas, e) {
   var x = e.x || e.clientX,
       y = e.y || e.clientY,
       bbox = canvas.getBoundingClientRect();

   return { x: x - bbox.left * (canvas.width  / bbox.width),
            y: y - bbox.top  * (canvas.height / bbox.height)
          };
};

export function selectElement(state, shapes, e){
	var shapeBeingDragged = undefined;
	var location = windowToCanvas(state.canvas, e);
	shapes.forEach((shape)=>{
		if (shape.isPointInPath(state.context, location.x, location.y)) {
			shapeBeingDragged = shape;
			lastdrag.x = location.x;
			lastdrag.y = location.y;
		}
	});
	return shapeBeingDragged;
}

export function elementMove(){
   var location,
       dragVector;
   if (shapeBeingDragged !== undefined) {
      location = windowToCanvas(e);
      dragVector = { x: location.x - lastdrag.x,
                     y: location.y - lastdrag.y
                   };
      shapeBeingDragged.move(dragVector.x, dragVector.y);
	  
      lastdrag.x = location.x;
      lastdrag.y = location.y;

      context.clearRect(0,0,canvas.width,canvas.height);
      drawShapes();
      //detectCollisions();
   }	
	
}

export function drawShapes(state, seats) {
	seats.forEach((seat)=>{
		seat.stroke(state.context);
		seat.fill(state.context);
	});
}