import React from 'react';
import { connect } from 'react-redux';
import {updateSeatInfo} from '../../../actions/seatsActions';

class Information extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        var selectedSeat = this.props.selected;
        return (
            <div className="info-box">
                <div>Info</div>
                <div>{selectedSeat.id}</div>
                <div>{selectedSeat.x}</div>
                <div>{selectedSeat.y}</div>
                <div>{selectedSeat.floor}</div>
                <div>{selectedSeat.assignedTo || 'Empty Seat'}</div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        seats: state.arrSeatsReducer,
        selected: state.selectSeatReducer
    };
}
//export default Information;
export default connect(mapStateToProps, {updateSeatInfo})(Information);

