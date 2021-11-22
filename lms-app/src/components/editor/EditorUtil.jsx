import React, {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import draftToMarkdown from "draftjs-to-markdown";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const EditorUtil = React.memo(
  ({
    onEditorStateChange,
    form,
    field,
    handleEditorError,
    firstTouch,
    setFirstTouch,
    rawContent,
  }) => {
    const [editorState, setEditorState] = useState(
      rawContent
        ? EditorState.createWithContent(convertFromRaw(rawContent))
        : EditorState.createEmpty()
    );

    useEffect(() => {
      if (rawContent) {
        setEditorState(
          EditorState.createWithContent(convertFromRaw(rawContent))
        );
        onEditorStateChange(rawContent, form, field);
      }
    }, [rawContent]);

    const [isFocused, setIsFocused] = useState(false);

    const config = {
      blockTypesMapping: {
        /* mappings */
      },
      emptyLineBeforeBlock: true,
    };

    const onEditorStateChangeDraft = (editorState) => {
      setEditorState(editorState);
      onEditorStateChange(
        convertToRaw(editorState.getCurrentContent()),
        form,
        field
      );
    };

    function uploadImageCallBack(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve({ data: { link: e.target.result } });
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(file);
      });
    }

    const focusedClickCallBack = useCallback(() => {
      setIsFocused(false);
      form.setTouched(Object.assign(form.touched, { content: true }));
    }, [isFocused]);

    const setTouchedCallBack = useCallback(() => {
      setIsFocused(true);
    }, [isFocused]);

    useEffect(() => {
      if (form.errors.content && form.touched.content && firstTouch) {
        handleEditorError(undefined);
        setFirstTouch(false);
      }
    }, [isFocused]);

    useEffect(() => {
      if (form.errors.content && form.touched.content && !firstTouch) {
        handleEditorError(form.errors.content.blocks);
      } else {
        handleEditorError(undefined);
      }
    }, [form.errors.content, firstTouch]);

    return (
      <Editor
        editorState={editorState}
        toolbar={{
          blockType: {
            options: ["Normal", "Blockquote", "Code"],
          },
          image: {
            uploadCallback: uploadImageCallBack,
            previewImage: true,
          },
        }}
        onBlur={focusedClickCallBack}
        onFocus={setTouchedCallBack}
        wrapperClassName="demo-wrapper"
        editorClassName={
          isFocused
            ? "demo-editor focused"
            : form.errors.content && form.touched.content
            ? "demo-editor invalid"
            : "demo-editor"
        }
        onEditorStateChange={onEditorStateChangeDraft}
      />
    );
  }
);

export default EditorUtil;
