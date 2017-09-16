import React from 'react';

class App extends React.Component {

    componentDidUpdate(prevProps) {
        
    }

    render() {
        return this.props.children;
    }
}

export default App;