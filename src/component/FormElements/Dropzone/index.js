/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const style = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "solid",
  backgroundColor: "white",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const Dropzone = (props) => {
  const onDrop = useCallback((acceptedFile) => {
    console.log(acceptedFile);
    props.onsubmit(acceptedFile);
  });

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: props.accept,
    maxFiles: props.maxFiles,
  });

  return (
    <section>
      <div {...getRootProps({ style, className: "dropzone" })}>
        <input {...getInputProps()} />
        {props.children}
      </div>
    </section>
  );
};

export default Dropzone;
