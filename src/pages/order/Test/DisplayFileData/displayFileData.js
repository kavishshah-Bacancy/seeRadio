import React from "react";
import { Card, Col, Row } from "reactstrap";
import { FaFileAlt, FaMicrophone, FaClone } from "react-icons/fa";
function DisplayFileData({ asset, file }) {
  return (
    <Card style={{ padding: "20px", backgroundColor: "#98FB98" }}>
      <Row>
        <Col>
          {file === "script" ? (
            <FaFileAlt style={{ fontSize: "50px", color: "#09b7ec" }} />
          ) : (
            <FaMicrophone style={{ fontSize: "50px", color: "#09b7ec" }} />
          )}
        </Col>
        <Col>
          <p className="text-muted">File Name</p>
          <strong>{asset.fileName}</strong>
        </Col>
        <Col>
          <p className="text-muted">File Uploaded By :</p>
          <strong>{asset.uploadBy}</strong>
        </Col>
        <Col>
          <p className="text-muted">Upload Date :</p>
          <strong>{asset.uploadDate}</strong>
        </Col>
      </Row>
    </Card>
  );
}

export default DisplayFileData;
