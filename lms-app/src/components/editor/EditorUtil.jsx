import React, { Component, useCallback, useEffect, useMemo, useState } from "react";
import draftToMarkdown from "draftjs-to-markdown";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const EditorUtil = React.memo(({onEditorStateChange, form, field, handleEditorError}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isFocused,setIsFocused] = useState(false);
  const [firstTouch, setFirstTouch] = useState(true)
  const config = {
    blockTypesMapping: {
      /* mappings */
    },
    emptyLineBeforeBlock: true,
  };

  const onEditorStateChangeDraft = (editorState) =>{
    setEditorState(editorState)
    onEditorStateChange(convertToRaw(editorState.getCurrentContent()), form, field)
}

  function uploadImageCallBack(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader(); // eslint-disable-line no-undef
      reader.onload = (e) => resolve({ data: { link: e.target.result } });
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });
  }

  useEffect(()=>{
    console.log('s');
  },[editorState])

  const focusedClickCallBack = useCallback(()=>{
    setIsFocused(false)
  },[isFocused])

  const setTouchedCallBack = useCallback(()=>{
    setIsFocused(true)
    form.setTouched({...form.touched,[field.name]: true })
  },[isFocused])

  useEffect(()=>{
    if(form.errors.content&&form.touched.content&&firstTouch){
      handleEditorError(undefined)
      setFirstTouch(false)
    }
  },[isFocused])

  useEffect(() => {
    if(form.errors.content&&form.touched.content&&!firstTouch){
      handleEditorError(form.errors.content.blocks)
    }
    else{
      handleEditorError(undefined)
    }
  },[form.errors.content, firstTouch]);

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
          onBlur={focusedClickCallBack}
          onFocus={setTouchedCallBack}
          wrapperClassName="demo-wrapper"
          editorClassName={ isFocused ? "demo-editor focused" : ((form.errors.content&&form.touched.content) ? ("demo-editor invalid"):"demo-editor")}
          onEditorStateChange={()=>onEditorStateChangeDraft}
        />
      </>
    )
  );
})

export default EditorUtil;