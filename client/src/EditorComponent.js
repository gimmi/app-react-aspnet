import React from 'react';

import ace from 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';

export default class EditorComponent extends React.Component {
    constructor(props) {
        super(props);
        this.divRef = React.createRef();
    }

    componentDidMount() {
        const divEl = this.divRef.current;
        this.aceEditor = ace.edit(divEl, {
            mode: 'ace/mode/json',
            theme: 'ace/theme/monokai',
            showPrintMargin: false,
            useWorker: false,
            maxLines: 50,
            minLines: 50
        });
    }

    componentWillUnmount() {
        this.aceEditor.destroy();
    }

    render() {
        return (
            <>
                <h1>This is the Editor page</h1>
                <div ref={this.divRef} />
            </>
        )
    }
}
