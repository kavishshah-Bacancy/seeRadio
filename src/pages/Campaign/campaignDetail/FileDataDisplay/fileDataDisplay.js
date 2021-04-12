import React from "react";
import { Button, Card, Col, FormGroup, Label, Row } from "reactstrap";
import { FaFileAlt, FaMicrophone, FaClone } from "react-icons/fa";
import { BsDownload } from "react-icons/bs";
function FileDataDisplay({ fileType, asset }) {
  return (
    <>
      <Row>
        <Col>
          <FormGroup row>
            <Col className="m-3 bg-light text-muted">
              <Label className="font-weight-bold">{fileType} File</Label>
              <Button
                style={{
                  marginLeft: "3%",
                  border: "none",
                  backgroundColor: "whitesmoke",
                  color: "blue",
                }}
                onClick={() => window.open(asset.assetUrl)}
              >
                <strong>
                  {" "}
                  <BsDownload />
                  &nbsp;Download
                </strong>
              </Button>
            </Col>
          </FormGroup>
          <Card style={{ padding: "20px", backgroundColor: "#98FB98" }}>
            <Row>
              <Col>
                {fileType === "SCRIPT" ? (
                  <FaFileAlt style={{ fontSize: "70px", color: "#09b7ec" }} />
                ) : (
                  <FaMicrophone
                    style={{ fontSize: "70px", color: "#09b7ec" }}
                  />
                )}
              </Col>
              <Col>
                <p className="text-muted">File Name</p>
                <strong>{asset.assetOrignalName}</strong>
              </Col>
              <Col>
                <p className="text-muted">File Uploaded By :</p>
                <strong>
                  {asset.uploadedByPerson.firstName}{" "}
                  {asset.uploadedByPerson.lastName}
                </strong>
              </Col>
              <Col>
                <p className="text-muted">Upload Date :</p>
                <strong>{asset.createdAt}</strong>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default FileDataDisplay;
