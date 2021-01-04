import React, { Component } from 'react';
import { EditorState, convertToRaw,ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';


 export default class RichText extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  }
  //获取富文本
  getRichText=() => {
    const {editorState} = this.state
    return draftToHtml(convertToRaw(editorState.getCurrentContent()))
  }
  //设置富文本
  setRichText=(html) => {
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({
        editorState,
      });
    }
  }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          editorStyle={{minHeight:'200px',border:'1px solid rgb(0,0,0,0.1)'}}
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}