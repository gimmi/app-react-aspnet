import React from 'react';

export class ContextInfoComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: 'initial value' };
    }

    componentDidMount() {
        fetch('/api/context')
            .then(resp => resp.json())
            .then(json => {
                const text = JSON.stringify(json, null, 2)
                this.setState({text: text})
            })
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
    }
    
    render() {
        return <pre>{this.state.text}</pre>
    }
}
