import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {newUser, selectUser} from '../../../../actions/usersActions';

//http://bootsnipp.com/snippets/featured/login-form-layered
class NewUserForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {firstName: '',
            surName : ''};
        this.addUser = this.addUser.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleSurNameChange = this.handleSurNameChange.bind(this);
    }
    handleFirstNameChange(e){
        this.setState({firstName: e.target.value});
    }
    handleSurNameChange(e){
        this.setState({surName: e.target.value});
    }
    addUser(e){
        e.preventDefault();
        this.props.toggleUserForm(true);
        var newUser = {firstName : this.state.firstName, surName: this.state.surName};
        this.props.newUser(newUser);
        this.props.selectUser(newUser);
        this.setState({firstName: '',
                        surName : ''});
    }
    render() {
        return (
            <div className="container">
				<div className="new-user-container">
                    <div className="new-user-close-btn pointer-cursor">X</div>
					<div className="avatar"></div>
					<div className="form-box">
						<form>
							<input name="firstname" type="text" placeholder="First Name" className="top" value={this.state.firstName} onChange={this.handleFirstNameChange}/>
							<input name="surname" type="text" placeholder="Surname" className="bottom" value={this.state.surName} onChange={this.handleSurNameChange}/>
							<button className="btn btn-info btn-block create" type="submit" onClick={this.addUser}>Create</button>
						</form>
					</div>
				</div>
			</div>
        );
    }
};

function mapStateToProps(state, ownProps){
    return {
        users: state.arrUsersReducer,
        selectedUser: state.selectUserReducer
    };
}
export default connect(mapStateToProps, {newUser, selectUser})(NewUserForm);