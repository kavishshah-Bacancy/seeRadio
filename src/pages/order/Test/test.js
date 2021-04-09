import React from "react";
import { FaFileAlt, FaMicrophone, FaClone } from "react-icons/fa";
import "./test.css";

import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Card,
  Container,
  Table,
} from "reactstrap";
import { IoIosFastforward, IoMdRewind } from "react-icons/io";
import { BsDownload } from "react-icons/bs";
import Dropzone from "../../../component/FormElements/Dropzone";
import OverlaySpinner from "../../../component/OverlaySpinner/overlaySpinner";

const Test = ({
  prevStep,
  scriptFileSubmitHandler,
  audioFileSubmitHandler,
  advAssetsSubmitHandler,
  scriptFlag,
  audioFlag,
  advAssetFlag,
  uploadFileHandler,
  onsubmitHandler,
  script,
  audio,
  asset,
  test,
  fileSpinnerFlag,
}) => {
  return (
    <Container>
      <Col style={{ marginTop: "50px" }}>
        <p style={{ color: "#09b7ec" }}>
          <b>Test</b>
        </p>
        <Card style={{ padding: "25px" }}>
          <Form>
            <FormGroup row>
              <Col className="m-3 bg-light text-muted">
                <Label className="font-weight-bold">Script File</Label>
                <a
                  role="button"
                  hidden={!scriptFlag}
                  style={{ marginLeft: "3%" }}
                  download="ScriptFile"
                  href={test.scriptFile}
                  rel="noreferrer"
                  target="_blank"
                >
                  <strong>
                    {" "}
                    <BsDownload />
                    &nbsp;Download
                  </strong>
                </a>
              </Col>
            </FormGroup>
            <Row form hidden={scriptFlag}>
              <Col md={6}>
                <Dropzone
                  onsubmit={scriptFileSubmitHandler}
                  label="Script file"
                  maxFiles={1}
                  accept=".pdf,.doc,.docx"
                >
                  <p>
                    <FaFileAlt style={{ fontSize: "50px", color: "#09b7ec" }} />
                    <b> Drag 'n' drop your SCRIPT File here</b>
                  </p>
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
                <label
                  htmlFor="script-file-upload"
                  className="custom-file-upload"
                >
                  Upload
                </label>
                <input
                  id="script-file-upload"
                  type="file"
                  name="scriptFile"
                  onChange={uploadFileHandler}
                  accept=".pdf,.doc,.docx"
                  max={1}
                />
              </Col>
            </Row>

            {/* Div For Showing entered File */}
            <OverlaySpinner isActive={fileSpinnerFlag}>
              <Row form hidden={!scriptFlag}>
                <Col>
                  <Card style={{ padding: "20px", backgroundColor: "#98FB98" }}>
                    <Row>
                      <Col>
                        <FaFileAlt
                          style={{ fontSize: "50px", color: "#09b7ec" }}
                        />
                      </Col>
                      <Col>
                        <p className="text-muted">File Name</p>
                        <strong>{script.fileName}</strong>
                      </Col>
                      <Col>
                        <p className="text-muted">File Uploaded By :</p>
                        <strong>{script.uploadBy}</strong>
                      </Col>
                      <Col>
                        <p className="text-muted">Upload Date :</p>
                        <strong>{script.uploadDate}</strong>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </OverlaySpinner>
            <FormGroup row>
              <Col className="m-3 bg-light text-muted">
                <Label className="font-weight-bold">Voice File</Label>
                <a
                  hidden={!audioFlag}
                  style={{ marginLeft: "3%" }}
                  href={test.audioFile}
                  download
                >
                  <strong>
                    {" "}
                    <BsDownload />
                    &nbsp;Download
                  </strong>
                </a>
              </Col>
            </FormGroup>
            <Row form hidden={audioFlag}>
              <Col md={6}>
                <Dropzone
                  onsubmit={audioFileSubmitHandler}
                  maxFiles={1}
                  accept=".mp3,.mp4"
                >
                  <p>
                    <FaMicrophone
                      style={{ fontSize: "50px", color: "#09b7ec" }}
                    />
                    <b> Drag 'n' drop your AUDIO File here</b>
                  </p>
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
                <label
                  htmlFor="audio-file-upload"
                  className="custom-file-upload"
                >
                  Upload
                </label>
                <input
                  id="audio-file-upload"
                  type="file"
                  name="audioFile"
                  onChange={uploadFileHandler}
                  accept="audio/*"
                  max={1}
                />
              </Col>
            </Row>

            <OverlaySpinner isActive={fileSpinnerFlag}>
              <Row form hidden={!audioFlag}>
                <Col>
                  <Card
                    style={{
                      padding: "20px",
                      backgroundColor: "#98FB98",
                    }}
                  >
                    <Row>
                      <Col>
                        <FaMicrophone
                          style={{ fontSize: "50px", color: "#09b7ec" }}
                        />
                      </Col>
                      <Col>
                        <p className="text-muted">File Name</p>
                        <strong>{audio.fileName}</strong>
                      </Col>
                      <Col>
                        <p className="text-muted">File Uploaded By :</p>
                        <strong>{audio.uploadBy}</strong>
                      </Col>
                      <Col>
                        <p className="text-muted">Upload Date :</p>
                        <strong>{audio.uploadDate}</strong>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </OverlaySpinner>
            <FormGroup row>
              <Col className="m-3 bg-light text-muted">
                <Label className="font-weight-bold">Advertiser Assets</Label>
              </Col>
            </FormGroup>
            <Row form>
              <Col md={6}>
                <Dropzone onsubmit={advAssetsSubmitHandler}>
                  <p>
                    <FaClone style={{ fontSize: "50px", color: "#09b7ec" }} />
                    <b> Drag 'n' drop your File here</b>
                  </p>
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
                <label htmlFor="adv-file-upload" className="custom-file-upload">
                  Upload
                </label>
                <input
                  id="adv-file-upload"
                  type="file"
                  name="advAssetFile"
                  onChange={uploadFileHandler}
                  multiple={true}
                />
              </Col>
            </Row>
            <br></br>
            <Row hidden={asset.length === 0}>
              <Col>
                <Card>
                  <Table striped>
                    <thead>
                      <tr>
                        <th>File Name</th>
                        <th>File Uploaded By</th>
                        <th>File Uploaded Date</th>
                        <th>Download</th>
                      </tr>
                    </thead>
                    <tbody>
                      {asset.map((item) => {
                        return (
                          <tr>
                            <td>{item.fileName}</td>
                            <td>{item.uploadBy}</td>
                            <td>{item.uploadDate}</td>
                            <td>
                              <a href={item.fileName} download>
                                Download
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Card>
              </Col>
            </Row>

            <div style={{ marginTop: "10px" }}>
              <span style={{ float: "left" }}>
                <Button
                  onClick={prevStep}
                  style={{ backgroundColor: "#09b7ec" }}
                >
                  <IoMdRewind /> Back
                </Button>
              </span>
              <span style={{ float: "right" }}>
                <Button style={{ backgroundColor: "white", color: "black" }}>
                  Cancel
                </Button>
                <Button
                  onClick={onsubmitHandler}
                  style={{ backgroundColor: "#09b7ec" }}
                >
                  Done <IoIosFastforward />
                </Button>
              </span>
            </div>
          </Form>
        </Card>
      </Col>
    </Container>
  );
};

export default Test;
