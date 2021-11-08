import React, { Component, useState } from 'react';
import draftToMarkdown from 'draftjs-to-markdown';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import classes from './main.module.scss'
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const EditorUtil = () => {

  const config = {
    blockTypesMapping : {/* mappings */},
    emptyLineBeforeBlock : true
  }

  const [editorState, setEditorState] = useState(EditorState.createEmpty());


    const onEditorStateChange = (editorState) =>{
        setEditorState(editorState)
    }

    function uploadImageCallBack(file) {
        return new Promise(
          (resolve, reject) => {
            const reader = new FileReader(); // eslint-disable-line no-undef
            reader.onload = e => resolve({ data: { link: e.target.result } });
            reader.onerror = e => reject(e);
            reader.readAsDataURL(file);
          });
      }

      const rawContentState = convertToRaw(editorState.getCurrentContent());
      const html = (draftToHtml(rawContentState));

    return (
      console.log(editorState),
      
        <>
            <Editor
            editorState={editorState}
            toolbar={{
                image: {
                  uploadCallback: uploadImageCallBack,
                  previewImage: true,
                },
              }}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={onEditorStateChange}
            />

        <div className={classes.renderedHtml} dangerouslySetInnerHTML={{__html: html}}></div>
        </>
    );
}

export default EditorUtil;



// class EditorConvertToHTML extends Component {
//   state = {
//     editorState: EditorState.createEmpty(),
//   }

//   onEditorStateChange = (editorState) => {
//     this.setState({
//       editorState,
//     });
//   };

//   render() {
//     const { editorState } = this.state;
//     return (
//       <div>
//         <Editor
//           editorState={editorState}
//           wrapperClassName="demo-wrapper"
//           editorClassName="demo-editor"
//           onEditorStateChange={this.onEditorStateChange}
//         />
//         <textarea
//           disabled
//           value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
//         />
//       </div>
//     );
//   }
// }