import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';

export default class EditorComponent extends React.Component {
    render() {
        return <AceEditor mode="json" theme="monokai" setOptions={{useWorker: false}} />
    }
}
