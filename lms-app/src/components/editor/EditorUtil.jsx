import React, { Component, useEffect, useState } from "react";
import draftToMarkdown from "draftjs-to-markdown";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const EditorUtil = React.memo(({onEditorStateChange, editorState, form, field}) => {
  const config = {
    blockTypesMapping: {
      /* mappings */
    },
    emptyLineBeforeBlock: true,
  };

  // const rawContentState = convertToRaw(editorState.getCurrentContent());


  // function onSubmit(rawContentState) {
  //   // var isValid = rawContentState.blocks.every(block=>block.text != "")
  //   // console.log(a);
  //   // let formdata = new FormData();
  //   //   formdata.append("Values", JSON.stringify(rawContentState))
  //   //   axios.post('https://localhost:5001/api/Lesson/CreateLesson',formdata, {
  //   //     headers: {
  //   //       "Content-Type": "multipart/form-data"
  //   //      },
  //   //   })
    
  // }

  function uploadImageCallBack(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader(); // eslint-disable-line no-undef
      reader.onload = (e) => resolve({ data: { link: e.target.result } });
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });
  }

  return (
    (
      <>
        <Editor
          editorState={editorState}
          toolbar={{
            blockType:{
              options: ['Normal','Blockquote', 'Code'],
            },
            image: {
              uploadCallback: uploadImageCallBack,
              previewImage: true,
            },
          }}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={(e) => onEditorStateChange(e,form,field)}
        />
      </>
    )
  );
})

export default EditorUtil;