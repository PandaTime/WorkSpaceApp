import React from 'react';
import { connect } from 'react-redux';
import {selectSeat, updateSeatLocation} from '../../../actions/seatsActions';
import {drawShapes, selectElement, windowToCanvas} from '../../canvasManipulation/canvasManipulation';

class Canvas extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            canvas: '',
            context: '',
			lastdrag: {}
        };
		this.selectSeat = this.selectSeat.bind(this);
		this.seatLocationUpdate = this.seatLocationUpdate.bind(this);
    }
    componentDidMount(){
        this.setState({canvas : this.refs.canvas, context: this.refs.canvas.getContext('2d')});
    }
	drawShapes() {
		drawShapes(this.state, this.props.seats);
	}
	selectSeat(e){
		var {shapeBeingDragged, lastdrag} = selectElement(this.state, this.props.seats, e.nativeEvent);
		if(shapeBeingDragged || this.props.selected.x){
			this.props.selectSeat(shapeBeingDragged || {});
			this.state.lastdrag = lastdrag;
		}
	}
	seatLocationUpdate(e){
		if(this.props.selected.x && (e.nativeEvent.buttons == 1)){
			var location = windowToCanvas(this.state.canvas, e.nativeEvent);
			var x = this.props.selected.x + (location.x - this.state.lastdrag.x),
				y = this.props.selected.y + (location.y - this.state.lastdrag.y);
			this.props.updateSeatLocation(this.props.selected.id, x, y);
		}
	}
    render() {
        var canvas = this.state.canvas,
            context = this.state.context;
        if(canvas){
			context.clearRect(0,0,canvas.width,canvas.height);
			this.drawShapes();
        }
        return (
            <canvas id="canvas" width="800" height="500" ref="canvas"
				onMouseDown = {this.selectSeat} onMouseMove = {this.seatLocationUpdate}>
				Canvas not supported
			</canvas>
		);
    }
}

function mapStateToProps(state, ownProps){
    return {
		seats: state.arrSeatsReducer,
		selected: state.selectSeatReducer
    };
}
export default connect(mapStateToProps, {selectSeat, updateSeatLocation})(Canvas);

