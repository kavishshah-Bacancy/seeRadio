import React, { useEffect } from "react";
import { Col, Row, Button, Label, Card, Container, Table } from "reactstrap";
import { getAllclient } from "../../Api/api";
import CampaignReports from "./CampaignReports/campaignReports";
import Todo from "./Todo/todo";
import VideoStatus from "./VideosStatus/videoStatus";

function Dashboard() {
  return (
    <>
      <Col>
        <Row>
          <Col style={{ marginTop: "20px" }}>
            <p>Todos</p>
            <Card style={{ padding: "10px" }}>
              <Todo />
            </Card>
          </Col>
        </Row>
      </Col>
      <Col>
        <Row>
          <Col md={6} style={{ marginTop: "20px" }}>
            <Card style={{ padding: "10px" }}>
              <p>Video Status</p>
              <VideoStatus />
            </Card>
          </Col>
          <Col md={6} style={{ marginTop: "20px" }}>
            <Card style={{ padding: "10px" }}>
              <p>Campaign Reports</p>
              <CampaignReports />
            </Card>
          </Col>
        </Row>
      </Col>
    </>
  );
}

export default Dashboard;
