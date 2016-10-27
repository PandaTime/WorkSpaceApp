import React from 'react';
import { connect } from 'react-redux';
import {selectSeat, updateSeatLocation} from '../../../actions/seatsActions';
import {drawShapes, selectElement} from '../../common/canvasManipulation';

class Canvas extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            canvas: '',
            context: ''
        };
		this.selectSeat = this.selectSeat.bind(this);
		this.seatLocationUpdate = this.seatLocationUpdate.bind(this);
    }
    componentDidMount(){
        this.setState({canvas : this.refs.canvas, context: this.refs.canvas.getContext('2d')});
    }
	drawShapes() {
		console.log(1);
		drawShapes(this.state, this.props.seats);
	}
	selectSeat(e){
		var el = selectElement(this.state, this.props.seats, e.nativeEvent);
		if(el || this.props.selected.x){
			this.props.selectSeat(el || {});
		}
	}
	seatLocationUpdate(e){
		if(this.props.selected.x && (e.nativeEvent.buttons == 1)){
			var eNative = e.nativeEvent;
			this.props.updateSeatLocation(this.props.selected.id, eNative.clientX, eNative.clientY);
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

