
import Seat from './shapes';
var image = new Image,
	loaded = false;

image.src = '/images/floor18.svg';
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
	var lastdrag = {x: 0, y: 0};
	var location = windowToCanvas(state.canvas, e);
	shapes.forEach((shape)=> {
		if (shape.isPointInPath(state.context, location.x, location.y)) {
			shapeBeingDragged = shape;
			lastdrag.x = location.x;
			lastdrag.y = location.y;
		}
	});
	return {shapeBeingDragged, lastdrag};

}
// да, такая себе оптимизация ибо очищаю весь канвас
export function drawShapes(state, seats, selected) {
	seats.forEach((seat)=> {
		if (seat.id == selected.id) {
			var obj = copyShape(seat);
			obj.fillStyle = 'rgba(244, 209, 66, 0.8)';
			var el = new Seat(obj);
			el.stroke(state.context);
			el.fill(state.context);
		} else {
			seat.stroke(state.context);
			seat.fill(state.context);
		}
	});
}
export function copyShape(el){
	var seat = {};
	Object.keys(el).forEach((v)=>{
		seat[v] = el[v];
	});
	return seat;
}

function drawImage(context){
	context.drawImage(image, 0, 0,
		image.width, image.height, 0, 0,
		context.canvas.width, context.canvas.height);
}

