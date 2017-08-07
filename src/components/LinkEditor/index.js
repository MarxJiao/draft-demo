/**
 * @file Editor with link
 * @author Marx
 */

import './index.css';
import React, {Component} from 'react';
import { Modal, Button, Input } from 'antd';
import {
    convertToRaw,
    CompositeDecorator,
    ContentState,
    Editor,
    EditorState,
    RichUtils
} from 'draft-js';

export default class extends Component {
    constructor(props) {
        super(props);

        const decorator = new CompositeDecorator([
            {
                strategy: findLinkEntities,
                component: Link,
            },
        ]);

        this.state = {
            editorState: EditorState.createEmpty(decorator),
            showModal: false,
            url: ''
        };
        this.onChange = editorState => {
            this.setState({editorState});
        };
        this.addLink = this.addLink.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.urlChange = this.urlChange.bind(this);
    }

    /**
     * 添加链接
     */
    addLink() {
        this.setState({
            showModal: false,
        });
        const {editorState, url} = this.state;
        // 获取contentState
        const contentState = editorState.getCurrentContent();
        // 在contentState上新建entity
        const contentStateWithEntity = contentState.createEntity(
            'LINK',
            'Segmented',
            {url}
        );
        // 获取到刚才新建的entity
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        // 把带有entity的contentState设置到editorState上
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
        // 把entity和选中的内容对应
        this.setState({
            editorState: RichUtils.toggleLink(
                newEditorState,
                newEditorState.getSelection(),
                entityKey
            ),
            showModal: false,
            url: '',
            }, () => {
            setTimeout(() => this.refs.editor.focus(), 0);
        });
    }

    /**
     * 展示弹窗
     */
    showModal() {
        this.setState({
            showModal: true
        })
    }

    /**
     * 取消动作
     */
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            showModal: false,
        });
    }

    /**
     * 链接改变
     *
     * @param {Object} event 事件
     */
    urlChange(event) {
        const target = event.target;
        this.setState({
            url: target.value
        });
    }

    render() {
        return (
            <div>
                链接编辑器
                <div className="tools">
                    <Button className="addlink" onClick={this.showModal}>link</Button>
                </div>
                <div className="editor">
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        ref="editor"/>
                </div>
                <Modal title="Title"
                    visible={this.state.showModal}
                    onOk={this.addLink}
                    onCancel={this.handleCancel}
                    >
                    <Input value={this.state.url} onChange={this.urlChange}></Input>
                </Modal>
            </div>
        )
    }
}

function findLinkEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'LINK'
            );
        },
        function () {
            console.log(arguments);
            callback(...arguments);
        }
        
    );
}
const Link = (props) => {
    const {url} = props.contentState.getEntity(props.entityKey).getData();
    return (
        <a href={url}>
            {props.children}
        </a>
    );
};