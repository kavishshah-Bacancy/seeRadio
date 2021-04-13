import React, { useEffect, useState } from "react";
import { BsArrowRepeat, BsDownload } from "react-icons/bs";
import { Col, Row, Button, Label, Card, Container, Table } from "reactstrap";
import "./campaignDetail.css";
import icon from "../../../assets/logo.png";
import { useParams } from "react-router-dom";
import { getAllcampaignByID, uploadFile } from "../../../Api/api";
import Spinner from "../../../component/Spinner/spinner";
import FileDataDisplay from "./FileDataDisplay/fileDataDisplay";

import FileDataDisplayInTab from "./FileDataDisplay/fileDataDisplayInTab";
import FileUpload from "../../../component/uploadFile/fileUpload";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import OverlaySpinner from "../../../component/OverlaySpinner/overlaySpinner";
import DisplayFileData from "../../order/Test/DisplayFileData/displayFileData";
import OrderDetails from "./OrderDetails/orderDetails";
import InformationDetail from "./InformationDetail/informationDetail";
import CampaignHeader from "./CampaignHeader/campaignHeader";

toast.configure();
const CampaignDetail = (props) => {
  const [campDetail, setCampDetail] = useState([]);
  const [scriptFile, setScriptFile] = useState([]);
  const [voiceFile, setVoiceFile] = useState([]);
  const [advFile, setAdvFile] = useState([]);

  const [test, setTest] = useState({
    scriptFile: "",
    audioFile: "",
    advAssetFile: [],
  });
  let date = new Date(Date.now());
  const formattedDate = date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const [script, setScript] = useState({
    fileName: "",
    uploadDate: formattedDate.split(" ").join("-"),
    uploadBy: props.user.firstName + " " + props.user.lastName,
  });
  const [audio, setAudio] = useState({
    fileName: "",
    uploadDate: formattedDate.split(" ").join("-"),
    uploadBy: props.user.firstName + " " + props.user.lastName,
  });

  const [scriptFlag, setScriptFlag] = useState();
  const [audioFlag, setAudioFlag] = useState();
  const [advAssetFlag, setAdvAssetFlag] = useState();
  const [fileSpinnerFlag, setFileSpinnerFlag] = useState(false);
  const [audioFileSpinnerFlag, setAudioFileSpinnerFlag] = useState(false);
  const [advFileSpinnerFlag, setAdvFileSpinnerFlag] = useState(false);

  const params = useParams();
  useEffect(() => {
    console.log(params);
    getAllcampaignByID(params.orderId)
      .then((res) => {
        console.log(res);
        setCampDetail(res);
        if (res.CampaignAssets.length !== 0) {
          let advarr = [];
          for (let key in res.CampaignAssets) {
            if (res.CampaignAssets[key].type === "SCRIPT") {
              setScriptFile(res.CampaignAssets[key]);
            } else if (res.CampaignAssets[key].type === "AUDIO") {
              setVoiceFile(res.CampaignAssets[key]);
            } else {
              advarr.push(res.CampaignAssets[key]);
            }
          }
          setAdvFile(advarr);
          console.log(advFile);
        }
      })
      .catch((error) => {
        console.log(error.errorMessage);
      });
  }, []);

  function generateFormData(file, type) {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("campaignID", params.orderId);
    formData.append("type", type);
    formData.append("uploadedBy", localStorage.getItem("id"));
    if (type === "OTHER") {
      //formData.append("clientID", newOrder.statusWithPersonID);
    }
    return formData;
  }
  const scriptFileSubmitHandler = (file) => {
    if (file.length !== 0) {
      setScriptFlag(true);
      setFileSpinnerFlag(true);
      let formData = generateFormData(file[0], "SCRIPT");
      uploadFile(formData)
        .then((res) => {
          console.log(res);
          setFileSpinnerFlag(false);
          toast.success("Script File Uploaded");
          setTest({ ...test, scriptFile: res.data[0].assetUrl });
        })
        .catch((error) => {
          setFileSpinnerFlag(false);
          toast.error(error.errorMessage);
        });
      setScript({
        ...script,
        fileName: file[0].name,
      });
    } else {
      toast.error("Choose Only one File with format Pdf/Doc/Docx");
    }
  };

  const audioFileSubmitHandler = (file) => {
    if (file.length !== 0) {
      setTest({ ...test, audioFile: file[0].name });
      setAudioFlag(true);
      setAudioFileSpinnerFlag(true);
      let formData = generateFormData(file[0], "AUDIO");
      uploadFile(formData)
        .then((res) => {
          console.log(res);
          setAudioFileSpinnerFlag(false);
          toast.success("Audio File Uploaded");
          setTest({ ...test, audioFile: res.data[0].assetUrl });
        })
        .catch((error) => {
          toast.error(error.errorMessage);
        });
      setAudio({
        ...audio,
        fileName: file[0].name,
      });
    } else {
      toast.error("Choose Only one File with format .mp3/.mp4");
    }
  };

  const uploadFileHandler = (e) => {
    if (e.target.name === "scriptFile") {
      setScriptFlag(true);
      setScript({
        ...script,
        fileName: e.target.files[0].name,
      });
      let formData = generateFormData(e.target.files[0], "SCRIPT");
      setFileSpinnerFlag(true);
      uploadFile(formData)
        .then((res) => {
          setFileSpinnerFlag(false);
          toast.success("Script File Uploaded");
          setTest({ ...test, scriptFile: res.data[0].assetUrl });
          console.log(res.data[0].assetUrl);
        })
        .catch((error) => {
          toast.error(error.errorMessage);
        });
    } else if (e.target.name === "audioFile") {
      setAudioFlag(true);
      setAudioFileSpinnerFlag(true);
      let formData = generateFormData(e.target.files[0], "AUDIO");
      uploadFile(formData)
        .then((res) => {
          setAudioFileSpinnerFlag(false);
          toast.success("Audio File Uploaded");
          console.log(res);
          setTest({ ...test, audioFile: res.data[0].assetUrl });
        })
        .catch((error) => {
          toast.error(error.errorMessage);
        });
      setAudio({
        ...audio,
        fileName: e.target.files[0].name,
      });
    } else {
      // let files = document.getElementById("adv-file-upload").files;
      // let arr = [];
      // for (let i = 0; i < files.length; i++) {
      //   let formData = generateFormData(files[i], "OTHER");
      //   let url = null;
      //   setAdvFileSpinnerFlag(true);
      //   uploadFile(formData)
      //     .then((res) => {
      //       console.log(res);
      //       url = res.data[0].assetUrl;
      //       setAdvFileSpinnerFlag(false);
      //     })
      //     .catch((error) => {
      //       console.log(error.errorMessage);
      //     });
      //   let filesArr = {
      //     fileName: files[i].name,
      //     uploadDate: formattedDate.split(" ").join("-"),
      //     uploadBy: props.user.firstName + " " + props.user.lastName,
      //     assetURL: url,
      //   };
      //   arr.push(filesArr);
      // }
      // let refreshData = [...asset];
      // for (let key in arr) {
      //   refreshData.push(arr[key]);
      // }
      // setAsset(refreshData);
    }
  };

  return (
    <Container>
      {campDetail.length === 0 ? (
        <Spinner />
      ) : (
        <Col style={{ marginTop: "20px" }}>
          {/* Main Header Shown */}
          <CampaignHeader campDetail={campDetail} />

          <Card style={{ padding: "20px 40px" }}>
            <Row>
              <Col>
                <p className="text-muted">Status</p>
                <strong>Advertiser Assests Required</strong>
              </Col>
              <Col>
                <p className="text-muted">Action required by</p>
                <strong>Test Bacancy</strong>
              </Col>
              <Col>
                <p className="text-muted">Next Action due by</p>
                <strong>01-July-2021</strong>
              </Col>
              <Col>
                <p></p>
                <BsArrowRepeat style={{ fontSize: "40px", float: "right" }} />
              </Col>
            </Row>
          </Card>
          <Card style={{ padding: "20px 40px" }}>
            <Row>
              <Col className="text-muted">
                <Label className="font-weight-bold">Information</Label>
                <hr></hr>
              </Col>
            </Row>

            {/* Information Tab Shown */}
            <InformationDetail campDetail={campDetail} />

            <Row>
              <Col className="text-muted">
                <Label className="font-weight-bold">Production Progress</Label>
                <hr></hr>
              </Col>
            </Row>
            <Row style={{ padding: "0px 0px 30px" }}>
              <Col>
                <p>Advertiser Assests Required</p>
              </Col>
            </Row>

            {scriptFile.length !== 0 ? (
              <FileDataDisplay fileType="SCRIPT" asset={scriptFile} />
            ) : scriptFlag ? (
              <OverlaySpinner isActive={fileSpinnerFlag}>
                <Row form hidden={!scriptFlag}>
                  <Col>
                    <DisplayFileData asset={script} file="script" />
                  </Col>
                </Row>
              </OverlaySpinner>
            ) : (
              <Row form hidden={scriptFlag}>
                <FileUpload
                  name="scriptFile"
                  label="Script File"
                  FileSubmitHandler={scriptFileSubmitHandler}
                  uploadFileHandler={uploadFileHandler}
                  acceptFile=".pdf,.doc,.docx"
                />
              </Row>
            )}
            <br></br>
            {voiceFile.length !== 0 ? (
              <FileDataDisplay fileType="AUDIO" asset={voiceFile} />
            ) : audioFlag ? (
              <OverlaySpinner isActive={audioFileSpinnerFlag}>
                <Row form hidden={!audioFlag}>
                  <Col>
                    <DisplayFileData asset={audio} file="audio" />
                  </Col>
                </Row>
              </OverlaySpinner>
            ) : (
              <Row form hidden={audioFlag}>
                <FileUpload
                  name="audioFile"
                  label="Voice File"
                  FileSubmitHandler={audioFileSubmitHandler}
                  uploadFileHandler={uploadFileHandler}
                  acceptFile="audio/*"
                />
              </Row>
            )}
            <br></br>

            <Row>
              <Col className="text-muted">
                <Label className="font-weight-bold">
                  Advertiser Assests List
                </Label>
                <hr></hr>
              </Col>
            </Row>

            {/* Asset Display */}
            {advFile.length !== 0 ? (
              <FileDataDisplayInTab fileData={advFile} />
            ) : null}

            {/* Order Details */}
            <OrderDetails campDetail={campDetail} />
          </Card>

          <div style={{ marginTop: "10px" }}>
            <span style={{ float: "left" }}>
              <Button style={{ backgroundColor: "#09b7ec", border: "none" }}>
                <BsDownload /> Download All Assests
              </Button>
            </span>
            <span style={{ float: "right" }}>
              <Button style={{ backgroundColor: "#09b7ec" }}>Edit</Button>
              <Button style={{ backgroundColor: "white", color: "black" }}>
                Cancel
              </Button>
            </span>
          </div>
        </Col>
      )}
    </Container>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.authReducer.activeUser,
  };
};
export default connect(mapStateToProps)(CampaignDetail);
