import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { EditorState } from "draft-js";
import { stateFromHTML } from "draft-js-import-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import useUtilsFunction from "@hooks/useUtilsFunction";

const createEditorState = (text) => {
  const contentState = stateFromHTML(text);
  return EditorState.createWithContent(contentState);
};

const CMSkeleton = ({
  html,
  count,
  height,
  color,
  loading,
  error,
  data,
  highlightColor,
}) => {
  const { showingTranslateValue } = useUtilsFunction();

  const Editor = dynamic(
    () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
    { ssr: false }
  );

  return (
    <>
      {loading ? (
        <Skeleton
          count={count || 6}
          height={height || 25}
          // className="bg-gray-200"
          baseColor={color || "#f1f5f9"}
          highlightColor={highlightColor || "#cbd5e1"}
        />
      ) : error ? (
        <span className="text-center mx-auto text-red-500">{error}</span>
      ) : data ? (
        html ? (
          <Editor
            editorState={createEditorState(showingTranslateValue(data))}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            editorStyle={{
              // border: "1px solid #F1F1F1",
              padding: "0 15px",
              // width: "300px",
              // height: "200px",
              // overflow: "auto",
            }}
            toolbarHidden
          />
        ) : (
          showingTranslateValue(data)
        )
      ) : null}
    </>
  );
};

export default CMSkeleton;
