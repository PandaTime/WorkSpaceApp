import React from 'react';
import classNames from 'classnames';

class ConfirmCheck extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="confirm-check">
                <div className="confirm-text">{this.props.text}</div>
                <div className="row"></div>
                <div className="confirm-accept col-xs-6" onClick={this.props.accept}>OK</div>
                <div className="confirm-reject col-xs-6" onClick={this.props.reject}>Cancel</div>
            </div>
        );
    }
}

export default ConfirmCheck;

