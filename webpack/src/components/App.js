// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import Header from './common/Header';

class App extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <Header
                    loading={this.props}
                />
                {this.props.children}
            </div>
        );
    }
}

export default App;
