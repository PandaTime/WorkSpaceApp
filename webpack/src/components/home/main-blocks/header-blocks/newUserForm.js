import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

//http://bootsnipp.com/snippets/featured/login-form-layered
class NewUserForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {showDropDown : [false, false, false, false], // search bar DropDown = 0;
            searchByTypes: ['User', 'Seat', 'Floor'],
            searchBy: 'Users'}
        this.addUser = this.addUser.bind(this);
    }
    addUser(){
        console.log('new User');
    }
    render() {
        return (
            <div className="container">
				<div className="new-user-container">
					<div id="output"></div>
					<div className="avatar"></div>
					<div className="form-box">
						<form>
							<input name="firstname" type="text" placeholder="First Name" className="top"/>
							<input name="surname" type="text" placeholder="Surname" className="bottom"/>
							<button className="btn btn-info btn-block create" type="submit">Create</button>
						</form>
					</div>
				</div>
			</div>
        );
    }
};

function mapStateToProps(state, ownProps){
    return {
        seats: state.seats
    };
}
//export default connect(mapStateToProps, {})(newUserForm);
export default NewUserForm;