// This component handles the App template used on every page.
import React from 'react';
import Header from './home/main-blocks/Header';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 90
        };
    }
    handleData(data) {
        var result = JSON.parse(data);
        console.log(result);
    }
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
