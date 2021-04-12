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
import Spinner from "../../../component/Spinner/spinner";
import DisplayFileData from "./DisplayFileData/displayFileData";
import DisplayTable from "./DisplayFileData/displayTable";

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
  advFileSpinnerFlag,
  audioFileSpinnerFlag,
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
                <Button
                  hidden={!scriptFlag}
                  style={{
                    marginLeft: "3%",
                    border: "none",
                    backgroundColor: "whitesmoke",
                    color: "blue",
                  }}
                  onClick={() => window.open(test.scriptFile)}
                >
                  <strong>
                    {" "}
                    <BsDownload />
                    &nbsp;Download
                  </strong>
                </Button>
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
                  <DisplayFileData asset={script} file="script" />
                </Col>
              </Row>
            </OverlaySpinner>
            <FormGroup row>
              <Col className="m-3 bg-light text-muted">
                <Label className="font-weight-bold">Voice File</Label>
                <Button
                  hidden={!audioFlag}
                  style={{
                    marginLeft: "3%",
                    border: "none",
                    backgroundColor: "whitesmoke",
                    color: "blue",
                  }}
                  onClick={() => window.open(test.audioFile)}
                >
                  <strong>
                    {" "}
                    <BsDownload />
                    &nbsp;Download
                  </strong>
                </Button>
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

            <OverlaySpinner isActive={audioFileSpinnerFlag}>
              <Row form hidden={!audioFlag}>
                <Col>
                  <DisplayFileData asset={audio} file="audio" />
                </Col>
              </Row>
            </OverlaySpinner>
            <FormGroup row>
              <Col className="m-3 bg-light text-muted">
                <Label className="font-weight-bold">Advertiser Assets</Label>
              </Col>
            </FormGroup>

            <OverlaySpinner isActive={advFileSpinnerFlag}>
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
                  <label
                    htmlFor="adv-file-upload"
                    className="custom-file-upload"
                  >
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
            </OverlaySpinner>
            <br></br>
            <Row hidden={asset.length === 0}>
              <Col>
                <DisplayTable asset={asset} />
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
