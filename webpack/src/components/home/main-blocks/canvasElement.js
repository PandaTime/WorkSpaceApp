import React from 'react';
import { connect } from 'react-redux';
import {selectSeat, updateSeatInfo} from '../../../actions/seatsActions';
import {drawShapes, selectElement, windowToCanvas} from '../../canvasManipulation/canvasManipulation';
import {selectUser} from '../../../actions/usersActions';
import {dataChangeSource} from '../../../actions/adminActions';

import initValues from '../initValues';

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
		drawShapes(this.state, this.props.seats, this.props.selectedSeat);
	}
	selectSeat(e){
		// not allowing to change in case we have modify window opened
		if(this.props.block.modifyUserData || this.props.block.modifySeatData){
			console.log('canvas select seat', this.props.block.modifyUserData, this.props.block.modifySeatData)
			return;
		}
		
		var {shapeBeingDragged, lastdrag} = selectElement(this.state, this.props.seats, e.nativeEvent);
		if(shapeBeingDragged || this.props.selectedSeat.x){
			this.props.selectSeat(shapeBeingDragged || {});
			this.props.selectUser({});
			this.state.lastdrag = lastdrag;
		}
	}
	seatLocationUpdate(e){
		if(this.props.block.modifyUserData || this.props.block.modifySeatData || !this.props.loggedIn){return;}
		if(this.props.selectedSeat.x && (e.nativeEvent.buttons == 1)){
			this.props.dataChangeSource(initValues.changeSource.user);
			var location = windowToCanvas(this.state.canvas, e.nativeEvent);
			var x = this.props.selectedSeat.x + (location.x - this.state.lastdrag.x),
				y = this.props.selectedSeat.y + (location.y - this.state.lastdrag.y);
			this.props.updateSeatInfo({id : this.props.selectedSeat.id, x, y});
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
            <canvas id="canvas" ref="canvas" height="500" width="900"
				onMouseDown = {this.selectSeat} onMouseMove = {this.seatLocationUpdate}>
				Canvas not supported
			</canvas>
		);
    }
}

function mapStateToProps(state, ownProps){
    return {
		seats: state.arrSeatsReducer,
		selectedSeat: state.selectSeatReducer,
		selectedUser: state.selectUserReducer,
		block: state.changeShownReducer,
		loggedIn: state.authericationReducer
    };
}
export default connect(mapStateToProps, {selectSeat, updateSeatInfo, selectUser, dataChangeSource})(Canvas);

