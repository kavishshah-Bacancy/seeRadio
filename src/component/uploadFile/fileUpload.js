import React from "react";
import { Col } from "reactstrap";
import Dropzone from "../FormElements/Dropzone";
import { FaFileAlt, FaMicrophone, FaClone } from "react-icons/fa";
import "./fileUpload.css";

function FileUpload({
  FileSubmitHandler,
  uploadFileHandler,
  acceptFile,
  name,
  label,
}) {
  return (
    <>
      <Col md={6}>
        <Dropzone
          onsubmit={FileSubmitHandler}
          label={label}
          maxFiles={1}
          accept={acceptFile}
        >
          {name === "scriptFile" ? (
            <p>
              <FaFileAlt style={{ fontSize: "50px", color: "#09b7ec" }} />
              <b> Drag 'n' drop your SCRIPT File here</b>
            </p>
          ) : (
            <p>
              <FaMicrophone style={{ fontSize: "50px", color: "#09b7ec" }} />
              <b> Drag 'n' drop your Voice File here</b>
            </p>
          )}
        </Dropzone>
      </Col>
      <p
        style={{
          fontSize: "15px",
          padding: "20px",
          fontWeight: "bold",
        }}
      >
        OR
      </p>
      <Col md={4}>
        <label htmlFor="script-file-upload" className="custom-file-upload">
          Upload
        </label>
        <input
          id="script-file-upload"
          type="file"
          name={name}
          onChange={uploadFileHandler}
          accept={acceptFile}
          max={1}
        />
      </Col>
    </>
  );
}

export default FileUpload;
