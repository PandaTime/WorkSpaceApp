import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

class newUserForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {showDropDown : [false, false, false, false], // search bar DropDown = 0;
            searchByTypes: ['User', 'Seat', 'Floor'],
            searchBy: 'Users'}
        this.addUser = this.addUser.bind(this);
    }
    addUser(){
        console.log('new User');
        this.setState({searchBy: 'lol'});
    }
    render() {
        console.log('awd');
        return (
            <div onClick={this.addUser}>Meh, you must be kidding</div>
        );
    }
};

function mapStateToProps(state, ownProps){
    return {
        seats: state.seats
    };
}
//export default connect(mapStateToProps, {})(newUserForm);
export default newUserForm;