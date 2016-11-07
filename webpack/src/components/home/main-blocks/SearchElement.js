import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {selectSeat, deleteSeat, addNewSeat} from '../../../actions/seatsActions';
import {selectUser} from '../../../actions/usersActions';
import SelectElement from './body-blocks/selectElement';
import AssignUser from './body-blocks/assignUser';
import {changeShown} from '../../../actions/showActions';
import ConfirmCheck from './body-blocks/confirmCheck';
import dataHandler from '../../../reducers/dataHandler';

class Search extends React.Component {
    constructor(props){
        super(props);
		this.state = {
			optShow : false,
			showUsed : false,
			selectBy: 'users',
			temp_seat_id: 'TEMP_SEAT',
			showAssignUserForm: false,
			showSelectSeatForm: false,
			hoverSeatID: '',
			swapToInfo: {searchElement: false, infoElement: true},
			searchText: '',
			deleteCheck: false,
			confirmText: '',
			deleteID: ''
		};
		this.toggleSeatOptions = this.toggleSeatOptions.bind(this);
		this.toggleUserAssign = this.toggleUserAssign.bind(this);
		this.toggleSeatSelect = this.toggleSeatSelect.bind(this);
		this.handleSearchInput = this.handleSearchInput.bind(this);
		this.acceptDelete = this.acceptDelete.bind(this);
		this.rejectDelete = this.rejectDelete.bind(this);
    }
	showUsedSeatsFn(selectBy, ifAll){
		this.setState({showUsed : ifAll, selectBy, optShow : false});
	}
	toggleSeatOptions(){
		this.setState({optShow:!this.state.optShow})
	}
	toggleUserAssign(){
        this.setState({showAssignUserForm : !this.state.showAssignUserForm});
    }
	toggleSeatSelect(){
		this.setState({showSelectSeatForm : !this.state.showSelectSeatForm});
	}
	hoverSeat(x, y, id){
		if(this.state.showAssignUserForm) return;
		var seat = {
			x, y,
			id: this.state.temp_seat_id + id,
			fillStyle: 'rgba(255, 0, 0, 1)'
		};
		this.setState({hoverSeatID: id});
		this.props.addNewSeat(seat);
	}

	unhoverSeat(id){
		if(this.state.showAssignUserForm) return;
		this.setState({hoverSeatID: ''});
		this.props.deleteSeat(this.state.temp_seat_id + id);
	}
	assignUser(assign, seat_id){
		var seat = this.props.seats.filter((v)=>v.id===seat_id)[0];
		if(!seat) return;
		this.props.selectSeat(seat);
		if(assign)
            this.toggleUserAssign();
	}
	toggleDeleteCheck(id){
		this.setState({
			deleteCheck: !this.state.deleteCheck,
			deleteID: id,
			confirmText: 'Are you sure you want to delete Seat ' + id + '?'
		});
	}
	acceptDelete(){
		dataHandler.deleteSeat(this.state.deleteID);
		this.setState({deleteCheck: !this.state.deleteCheck, deleteID: '', confirmText: ''});
	}
	rejectDelete(){
		this.setState({deleteCheck: !this.state.deleteCheck, deleteID: '', confirmText: ''});
	}
	selectSeat(assign, user_id){
		var user = this.props.users.filter((v)=>v.id===user_id)[0];
		if(!user) return;
		this.props.selectUser(user);
		if(assign)
			this.toggleSeatSelect();
		else
			console.log('delete');			
	}
	seatInfo(_, seat){
		console.log(seat, this.props.seats);
		if(seat){
			this.props.selectSeat(seat);
			this.props.selectUser({});
			this.props.changeShown(this.state.swapToInfo); // selecting "Info" tab
		}
	}
	userInfo(_, user){
		if(user){
			this.props.selectSeat({});
			this.props.selectUser(user);
			this.props.changeShown(this.state.swapToInfo); // selecting "Info" tab
		}
	}
	handleSearchInput(e){
		this.setState({searchText: e.target.value});
	}
    render() {
		var showUsed = this.state.showUsed,
			temp_seat_id = this.state.temp_seat_id;
		var list = [], text;
		if(this.state.selectBy == 'users'){
			list = this.props.users.map((v, i)=>{
				if((showUsed || !v.seat.id) && ((v.firstName.indexOf(this.state.searchText) > -1) || (v.surName.indexOf(this.state.searchText) > -1)))
					return (
						<li key={i} className={classNames("list-group-item", ((v.seat.id && v.seat.id == this.props.selectedSeat.id) || v.id == this.props.selectedUser.id) ? 'list-group-item-warning' : '')}>
							{v.firstName + ' ' + v.surName} - <span className="add-info">{v.seat.id ? v.seat.name : 'Don\'t have a seat'} </span>
							<div className="element-setup-panel">
								<div className={classNames(this.props.loggedIn ? '' : 'hidden', "col-xs-1")}>
									<span className="glyphicon glyphicon-map-marker pointer-cursor" aria-hidden="true" onClick={this.selectSeat.bind(this, true, v.id)}></span>
								</div>
								<div className="col-xs-1">
									<span className="glyphicon glyphicon-wrench pointer-cursor" aria-hidden="true" onClick={this.userInfo.bind(this, true, v)}></span>
								</div>
							</div>
						</li>);
				});
		}else if(this.state.selectBy == 'seats'){
			list = this.props.seats.map((v, i)=>{
				if(v.id.startsWith(temp_seat_id)) return;
				if((showUsed || !v.assignedTo.id)  && (v.name.indexOf(this.state.searchText) > -1)){
					text = v.name + ' - ' +  (v.assignedTo.id ? ('taken by ' + v.assignedTo.firstName + ' ' + v.assignedTo.surName) : 'free');
					return (<li key={i} className={classNames("list-group-item", (v.id == this.props.selectedSeat.id || (this.props.selectUser.seat && v.id == this.props.selectUser.seat.id)) ? 'list-group-item-warning' : '')}
								 onMouseEnter={this.hoverSeat.bind(this, v.x, v.y, v.id)}
								 onMouseLeave={this.unhoverSeat.bind(this, v.id)}>
								 {text}
								<div className="element-setup-panel">
									<div className={classNames(this.props.loggedIn ? '' : 'hidden', "col-xs-1")}>
										<span className="glyphicon glyphicon-remove pointer-cursor" aria-hidden="true" onClick={this.toggleDeleteCheck.bind(this, v.id)}></span>
									</div>
									<div className={classNames(this.props.loggedIn ? '' : 'hidden', "col-xs-1")}>
										<span className="glyphicon glyphicon-map-marker pointer-cursor" aria-hidden="true" onClick={this.assignUser.bind(this, true, v.id)}></span>
									</div>
									<div className="col-xs-1">
										<span className="glyphicon glyphicon-wrench pointer-cursor" aria-hidden="true" onClick={this.seatInfo.bind(this, true, v)}></span>
									</div>
								</div>
							 </li>);
				}
			});
		}
		// filtering null values;
		list = list.filter((v)=>!!v);
		return (
            <div className="search-box">
				<div className={classNames(this.state.deleteCheck ? '' : 'hidden')}>
					<ConfirmCheck text={this.state.confirmText} accept={this.acceptDelete} reject={this.rejectDelete}/>
				</div>
				<div>
					<div className="input-group">
						<input type="text" className="form-control" aria-label="..." value={this.state.searchText} onChange={this.handleSearchInput} />
						<div className="input-group-btn">
							<button type="button" className="btn btn-default search-element-input" onClick={this.toggleSeatOptions}>
								{this.state.selectBy == 'users' ? (this.state.showUsed ? 'All Users' : 'Free Users') : (this.state.showUsed ? 'All Seats' : 'Free Seats')}
							<span className="caret"></span></button>
						</div>
						<div className={classNames(this.state.showAssignUserForm ? '' : 'hidden')}>
							<AssignUser toggleFormShow={this.toggleUserAssign}/>
						</div>
						<div className={classNames(this.state.showSelectSeatForm ? '' : 'hidden')}>
							<SelectElement toggleSeatFormShow={this.toggleSeatSelect}/>
						</div>
						<ul className={classNames('dropdown-menu search-box-search react-toggle', this.state.optShow ? '' : 'hidden')}>
							<li><a onClick={this.showUsedSeatsFn.bind(this, 'seats', false)}>Free Seats</a></li>
							<li><a onClick={this.showUsedSeatsFn.bind(this, 'users', false)}>Non-assigned Users</a></li>
							<li><a onClick={this.showUsedSeatsFn.bind(this, 'seats', true)}>All Seats</a></li>
							<li><a onClick={this.showUsedSeatsFn.bind(this, 'users', true)}>All Users</a></li>
						</ul>
					</div>
					<ul className="list-group">
						{list[0] ? list : 'No seats are available'}
					</ul>
				</div>
			</div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
		users: state.arrUsersReducer,
		selectedUser: state.selectUserReducer,
		seats: state.arrSeatsReducer,
		selectedSeat: state.selectSeatReducer,
		loggedIn: state.authericationReducer
    };
}
//export default Search;
export default connect(mapStateToProps, {selectUser, selectSeat, deleteSeat, addNewSeat, changeShown})(Search);

