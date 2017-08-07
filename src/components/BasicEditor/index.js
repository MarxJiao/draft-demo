/**
 * @file Editer main file
 * @author Marx
 */

import './index.css';
import React, {Component} from 'react';
import {Editor, EditorState} from 'draft-js';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        };
        this.onChange = editorState => {
            this.setState({editorState});
        };
        
    }
    render() {
        return (
            <div className="basic">
                基础编辑器
                <div className="editor">
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}/>
                </div>
            </div>
        )
    }
}