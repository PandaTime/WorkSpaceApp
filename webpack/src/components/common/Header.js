import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import classNames from 'classnames';
class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {showDropDown : false};
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        console.log(this.state.showDropDown);
        this.setState({ showDropDown: !this.state.showDropDown });
    }
    render() {
        return (
            <nav className="navbar navbar-default">
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
                            <li><Link to="/" id="home" className="nav-elements"><span>Home</span></Link></li>
                            <li className="dropdown nav-elements">
                                <div id="projects" className="dropdown-toggle" onClick={this.onClick}>
                                    <span>Projects</span><span className="caret"></span>
                                </div>
                                <ul className={classNames('dropdown-menu', this.state.showDropDown ? '' : 'hidden')}>
                                    <li><Link to="/projects">All Projects</Link></li>
                                    <li><Link to="/projects">Kaggle(Data Science)</Link></li>
                                    <li><Link to="/xna">C#(Unity/XNA)</Link></li>
                                    <li><Link to="/WebGL">WebGL</Link></li>
                                </ul>
                            </li>
                            <li><Link to="/cv" id="cv" className="nav-elements"><span>CV</span></Link></li>
                        </div>
                        <div className="nav navbar-nav navbar-right">
                            <li>
                                <Link to="/contacts" id="contact"><span>Contact</span></Link>
                            </li>
                        </div>
                    </div>
                </div>
            </nav>

        );
    }
};

export default Header;
