import React from "react";
import { BsArrowRepeat, BsDownload } from "react-icons/bs";
import { Col, Row, Button, Label, Card, Container, Table } from "reactstrap";
import "./campaignDetail.css";
import icon from "../../../assets/logo.png";
// import { IoIosFastforward, IoMdRewind } from "react-icons/io";
// import Dropzone from "../../../component/FormElements/Dropzone";

const CampaignDetail = ({ prevStep, dropzoneSubmitHandler }) => {
  return (
    <Container>
      <Col style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <p className="text-muted">Advertiser</p>
            <strong>Test Bacancy</strong>
          </Col>
          <Col>
            <p className="text-muted">Order Name</p>
            <strong>Test</strong>
          </Col>
          <Col>
            <p className="text-muted">Order Number</p>
            <strong>00001-00003-00001</strong>
          </Col>
          <Col>
            <p className="text-muted">Sales Organization</p>
            <strong>Computer city</strong>
          </Col>
        </Row>
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
          <Row style={{ padding: "0px 0px 30px" }}>
            <Table borderless style={{ width: "60%" }}>
              <thead>
                <tr className="text-muted">
                  <th>
                    <Label className="bg-light font-weight-bold">
                      <strong>Account Manager Assigned</strong>
                    </Label>
                  </th>
                  <th>
                    <Label className="bg-light font-weight-bold">
                      <strong>Distribution Partner company Assigned</strong>
                    </Label>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Kavish shah</td>
                  <td>Kavish shah</td>
                </tr>
              </tbody>
              <thead>
                <tr className="text-muted">
                  <th>
                    <Label className="bg-light font-weight-bold">
                      <strong>Sales Person Assigned</strong>
                    </Label>
                  </th>
                  <th>
                    <Label className="bg-light font-weight-bold">
                      <strong>Graphic Designer Assigned</strong>
                    </Label>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Kavish shah</td>
                  <td>Not Yet Assigned</td>
                </tr>
              </tbody>
            </Table>
          </Row>
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
          <Row>
            <Col className="text-muted">
              <Label className="font-weight-bold">
                Advertiser Assests List
              </Label>
              <hr></hr>
            </Col>
          </Row>
          {/* <Row style={{ padding: "0px 0px 30px" }}> */}
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
              <tr>
                <td>abc.jpg</td>
                <td>Kavish shah</td>
                <td>23-July-2021</td>
                <td>
                  <a href={icon} download>
                    Download
                  </a>
                </td>
              </tr>
              <tr>
                <td>banner.jpg</td>
                <td>Kavish shah</td>
                <td>23-July-2021</td>
                <td>
                  <a href={icon} download>
                    Download
                  </a>
                </td>
              </tr>
            </tbody>
          </Table>
          {/* </Row> */}

          <Row>
            <Col className="text-muted">
              <Label className="font-weight-bold">Order</Label>
              <hr></hr>
            </Col>
          </Row>
          <Row>
            <Col className="text-muted">
              <Label className="font-weight-bold">Description</Label>
              <p>Test</p>
            </Col>
          </Row>
          <Row>
            <Col className="text-muted">
              <Label className="font-weight-bold">
                Preferred Landing Website URL
              </Label>
              <p>
                <a href="/">www.google.com</a>
              </p>
            </Col>
            <Col className="text-muted">
              <Label className="font-weight-bold">Distribution Budget</Label>
              <p>$50</p>
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col className="text-muted">
              <Label className="font-weight-bold">Target Market</Label>
              <p>Calgary</p>
            </Col>
            <Col className="text-muted">
              <Label className="font-weight-bold">Industry Category</Label>
              <p>Arts 'n' Entertainment</p>
            </Col>
            <Col className="text-muted">
              <Label className="font-weight-bold">Order Date</Label>
              <p>02-Jan-2021</p>
            </Col>
          </Row>
        </Card>
        <div style={{ marginTop: "10px" }}>
          <span style={{ float: "left" }}>
            <Button
              onClick={prevStep}
              style={{ backgroundColor: "#09b7ec", border: "none" }}
            >
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
    </Container>
  );
};

export default CampaignDetail;
