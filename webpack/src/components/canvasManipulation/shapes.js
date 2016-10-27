
class Shape {
	constructor(){
	   this.x = undefined;
	   this.y = undefined;
	   this.strokeStyle = 'rgba(255, 253, 208, 0.9)';
	   this.fillStyle = 'rgba(147, 197, 114, 0.8)';
	}
	collidesWith(shape){
		var axes = this.getAxes().concat(shape.getAxes());
		return !this.separationOnAxes(axes, shape);
	}
	separationOnAxes(axes, shape){
      for (var i=0; i < axes.length; ++i) {
         axis = axes[i];
         projection1 = shape.project(axis);
         projection2 = this.project(axis);

         if (! projection1.overlaps(projection2)) {
            return true;
         }
      }
      return false;
   }
	protomove(dx, dy) {
		throw 'move(dx, dy) not implemented';
	}
	protocreatePath(context) {
		throw 'createPath(context) not implemented';
	}
	getAxes() {
		throw 'getAxes() not implemented';
	}
	project(axis) {
		throw 'project(axis) not implemented';
	}
	fill(context) {
		context.save();
		context.fillStyle = this.fillStyle;
		this.createPath(context);
		context.fill();
		context.restore();
	}
	stroke(context) {
		context.save();
		context.strokeStyle = this.strokeStyle;
		this.createPath(context);
		context.stroke();
		context.restore();
	}
	isPointInPath(context, x, y) {
		this.createPath(context);
		return context.isPointInPath(x, y);
	}
}

class Seat extends Shape{
	constructor(seat){
		super();
		this.id = seat.newId ? seat.id() : seat.id; // that's the function for random generator!
		this.x = seat.x;
		this.y = seat.y;
		this.radius = seat.radius;
		this.strokeStyle = 'rgba(255, 253, 208, 0.9)';
		this.fillStyle = 'rgba(147, 197, 114, 0.8)';
	}
	collidesWith(shape) {
		var point, length, min=10000, v1, v2,
			edge, perpendicular, normal,
			axes = shape.getAxes(), distance;

		if (axes === undefined) {  // circle
			distance = Math.sqrt(Math.pow(shape.x - this.x, 2) +
						Math.pow(shape.y - this.y, 2));
			return distance < Math.abs(this.radius + shape.radius);
		}else{  // polygon
			return polygonCollidesWithCircle(shape, this);
		}
	}
	getAxes() {
		return undefined; // there are an infinite number of axes for circles
	}
	project(axis) {
	   var scalars = [],
		   point = new Point(this.x, this.y);
		   dotProduct = new Vector(point).dotProduct(axis);

	   scalars.push(dotProduct);
	   scalars.push(dotProduct + this.radius);
	   scalars.push(dotProduct - this.radius);

	   return new Projection(Math.min.apply(Math, scalars),
							 Math.max.apply(Math, scalars));
	}
	move(dx, dy) {
	   this.x += dx;
	   this.y += dy;
	}
	createPath(context) {
	   context.beginPath();
	   context.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
	}
}

export default Seat;