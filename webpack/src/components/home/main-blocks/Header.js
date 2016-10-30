import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames';
import {addNewSeat} from '../../../actions/seatsActions';
import config from '../initValues';
import NewUserForm from './header-blocks/newUserForm';

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {showDropDown : [false, false, false, false], // search bar DropDown = 0; //
					  showNewUserBox : false,
                      searchByTypes: ['User', 'Seat', 'Floor'],
					  searchBy: 'Users'};
		this.addSeat = this.addSeat.bind(this);
    }
	componentDidMount() {
        document.body.addEventListener('click', this.onClick.bind(this, -1));
    }
    onClick(id) {
        //console.log(id, this.state.showDropDown[id]);
        // клик по тому же элементу = закрытие его(мешает глобал листенер)
		this.setState({showDropDown : this.state.showDropDown.map( this.state.showDropDown[id] ? (()=> false) : ((_, i)=>i===id))});
    }
	searchBySet(type){
		this.setState({searchBy: type});
	}
	addSeat(){
        this.props.addNewSeat(config.newSeatForm);
	}
    toggleUserForm(hideNewUser){ // т.к. дизейбл не исключает возможности нажатия, а я не хочу создавать 2 функции
        if(!hideNewUser && this.state.showNewUserBox){
            this.onClick(3);
            return;
        }
        this.setState({showNewUserBox: hideNewUser ? false : true,
            showDropDown: this.state.showDropDown.map(()=>false)});
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
							<li className="dropdown nav-elements">
                                <a id="projects" onClick={this.onClick.bind(this, 1)}>
                                    <span>Floor</span><span className="caret"></span>
                                </a>

                                <ul className={classNames('dropdown-menu react-toggle', this.state.showDropDown[1] ? '' : 'hidden')}>
                                    <li><Link to="#">Null</Link></li>
                                    <li><Link to="#">Null</Link></li>
                                </ul>
                            </li>
                            <li className="dropdown nav-elements">
                                <a id="projects" onClick={this.onClick.bind(this, 2)}>
                                    <span>Seats</span><span className="caret"></span>
                                </a>
                                <ul className={classNames('dropdown-menu react-toggle', this.state.showDropDown[2] ? '' : 'hidden')}>
                                    <li><a onClick={this.addSeat} className={classNames(this.state.showDropDown ? 'disable' : '')}>Add Seat</a></li>
                                    <li><Link to="/projects">Search Seat</Link></li>
                                </ul>
                            </li>
                            <li className="dropdown nav-elements">
                                <a id="projects" onClick={this.onClick.bind(this, 3)}>
                                    <span>Users</span><span className="caret"></span>
                                </a>
                                <ul className={classNames('dropdown-menu react-toggle', this.state.showDropDown[3] ? '' : 'hidden')}>
                                    <li className={classNames(this.state.showNewUserBox ? 'disabled' : '')}><a onClick={this.toggleUserForm.bind(this, false)}>Add User</a></li>
                                    <li><Link to="/projects">Search User</Link></li>
                                </ul>
                            </li>
                        </div>
						<div className="nav navbar-nav navbar-right">
                            <li>
                                <Link to="/contacts" id="contact"><span>Contact</span></Link>
                            </li>
                        </div>			
						<div className="col-xs-6 navbar-nav navbar-right ">
							<div className="input-group ">
								<input type="text" className="form-control" aria-label="..."/>
								<div className="input-group-btn">
									<button type="button" className="btn btn-default" onClick={this.onClick.bind(this, 0)}>By {this.state.searchBy}<span className="caret"></span></button>
									<ul className={classNames('dropdown-menu react-toggle', this.state.showDropDown[0] ? '' : 'hidden')}>
										{searchList}
										<li role="separator" className="divider"></li>
										<li><a href="#">Lonely Users</a></li>
										<li><a href="#">Empty Seats</a></li>
									</ul>
								</div>
							</div>
						</div>
                    </div>
                </div>
            </nav>
        );
    }
};

function mapStateToProps(state, ownProps){
    return {
        seats: state.seats
    };
}
export default connect(mapStateToProps, {addNewSeat})(Header);
