import React, { Component, useEffect, useState } from 'react';
import draftToMarkdown from 'draftjs-to-markdown';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const EditorUtil = () => {

  const config = {
    blockTypesMapping : {/* mappings */},
    emptyLineBeforeBlock : true
  }

  const [editorState, setEditorState] = useState(EditorState.createEmpty());


    const onEditorStateChange = (editorState) =>{
        setEditorState(editorState)
    }

    function onSubmit(rawContentState){
      // let formdata = new FormData();
      //   formdata.append("Values", JSON.stringify(rawContentState))

      //   // console.log(rawContentState);
      //   axios.post('https://localhost:5001/api/Lesson/CreateLesson',formdata, {
      //     headers: { 
      //       "Content-Type": "multipart/form-data"
      //      },
      //   })
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
      
      const[data,setData] = useState(null);
      // useEffect(()=>{
      //   axios.get(process.env.REACT_APP_FILES_API+'944d2068-4806-42b4-a171-61a027eb66e6.txt')
      //     .then(res=>setEditorState(EditorState.createWithContent(convertFromRaw(res.data))))
      // },[])

      const html = (draftToHtml(rawContentState));

    return (
      console.log(data),
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
        <button onClick={()=>onSubmit(rawContentState)} style={{backgroundColor:'green'}}>
          Submit
        </button>
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