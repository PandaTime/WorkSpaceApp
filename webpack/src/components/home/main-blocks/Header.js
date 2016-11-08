import React from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {addNewSeat} from '../../../actions/seatsActions';
import config from '../initValues';
import NewUserForm from './header-blocks/newUserForm';
import ws from '../../ws/websocket';

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {showDropDown : [false, false, false, false], // search bar DropDown = 0; //
					  showNewUserBox : false,
                      searchByTypes: ['User', 'Seat', 'Floor'],
                      loginForm : false,
                      login: '',
                      loggedUser: '',
                      password: '',
					  searchBy: 'Users'};
		this.addSeat = this.addSeat.bind(this);
        this.toggleLoginFrom = this.toggleLoginFrom.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.loginChange = this.loginChange.bind(this);
        this.signIn = this.signIn.bind(this);
        this.logOut = this.logOut.bind(this);
    }
	componentDidMount() {
        document.body.addEventListener('click', this.onClick.bind(this, -1));
    }
    componentWillUpdate(nextProps){
        if(nextProps.loggedIn != this.state.loggedUser){
            this.toggleLoginFrom();
            this.setState({
                loggedUser: nextProps.loggedIn
            })
        }
    }
    logOut(){
        ws.logout();
    }
    onClick(id) {
		if(this.props.block.modifyUserData || this.props.block.modifySeatData){return;}
        //console.log(id, this.state.showDropDown[id]);
        // клик по тому же элементу = закрытие его(мешает глобал листенер)
		this.setState({showDropDown : this.state.showDropDown.map( this.state.showDropDown[id] ? (()=> false) : ((_, i)=>i===id))});
    }
	searchBySet(type){
		this.setState({searchBy: type});
	}
	addSeat(){
		if(this.props.block.modifyUserData || this.props.block.modifySeatData){return;}
        this.props.addNewSeat(config.newSeatForm);
	}
    toggleUserForm(hideNewUser){ // т.к. дизейбл не исключает возможности нажатия, а я не хочу создавать 2 функции
        if(!hideNewUser && this.state.showNewUserBox){
            this.setState({showNewUserBox: false});
			this.onClick(3);
            return;
        }
        this.setState({showNewUserBox: hideNewUser ? false : true,
            showDropDown: this.state.showDropDown.map(()=>false)});
    }
    toggleLoginFrom(){
        this.setState({loginForm: !this.state.loginForm});
    }
    passwordChange(e){
        this.setState({password: e.target.value});
    }
    loginChange(e){
        this.setState({login: e.target.value});
    }
    signIn(e){
        e.preventDefault();
        this.setState({
            login: '',
            password: ''
        });
        ws.autherization(this.state.login, this.state.password);
    }
    render() {
		var searchList = this.state.searchByTypes.map((v, i)=>{
			return(<li key={i}><a onClick={this.searchBySet.bind(this, v)}>By {v}</a></li>)
		});
        return (
            <nav className="navbar navbar-default">
				<div className={classNames(this.state.showNewUserBox ? '' : 'hidden')}>
					<NewUserForm toggleUserForm={this.toggleUserForm.bind(this)}/>
				</div>
                <div className="container-fluid">
                    <div className="navbar-header"><IndexLink to="/" className="navbar-brand">Yaroslav
                        Stasiuk</IndexLink>
                        <button data-toggle="collapse" data-target=".navbar-collapse" className="navbar-toggle">
                            <span className="sr-only">Toggle Navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div className="navbar-collapse collapse">
                        <div className="nav navbar-nav">
                            <li className={classNames(this.props.loggedIn ? '' : 'hidden', "dropdown nav-elements")}>
                                <a id="projects" onClick={this.onClick.bind(this, 2)}>
                                    <span>Seats</span><span className="caret"></span>
                                </a>
                                <ul className={classNames('dropdown-menu react-toggle', this.state.showDropDown[2] ? '' : 'hidden')}>
                                    <li><a onClick={this.addSeat} className={classNames(this.state.showDropDown ? 'disable' : '')}>Add Seat</a></li>
                                </ul>
                            </li>
                            <li className={classNames(this.props.loggedIn ? '' : 'hidden', "dropdown nav-elements")}>
                                <a id="projects" onClick={this.onClick.bind(this, 3)}>
                                    <span>Users</span><span className="caret"></span>
                                </a>
                                <ul className={classNames('dropdown-menu react-toggle', this.state.showDropDown[3] ? '' : 'hidden')}>
                                    <li className={classNames(this.state.showNewUserBox ? 'disabled' : '')}><a onClick={this.toggleUserForm.bind(this, false)}>Add User</a></li>
                                </ul>
                            </li>
                        </div>
						<div className="nav navbar-nav navbar-right">
                            <li className={classNames(this.props.loggedIn ? 'hidden' : '', 'pointer-cursor')} onClick={this.toggleLoginFrom}>
                                <a><span>Log In</span></a>
                            </li>
                            <li className={classNames(this.props.loggedIn ? '' : 'hidden', 'pointer-cursor')} onClick={this.logOut}>
                                <a><span>Log Out</span></a>
                            </li>
                        </div>
                        <div className={classNames('login-up-form', 'jumbotron', this.state.loginForm ? '' : 'hidden')}>
                            <form onSubmit={this.signIn}>
                                <div>Login</div>
                                <input type="text" value={this.state.login} onChange={this.loginChange}/>
                                <div>Password</div>
                                <input type="password" value={this.state.password} onChange={this.passwordChange}/>
                                <div></div>
                                <input type="submit" value="Login"/>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
};

function mapStateToProps(state, ownProps){
    return {
        seats: state.arrSeatsReducer,
		block: state.changeShownReducer,
        loggedIn: state.authericationReducer
    };
}
export default connect(mapStateToProps, {addNewSeat})(Header);
