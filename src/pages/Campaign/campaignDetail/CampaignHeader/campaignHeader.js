import React from "react";
import { Col, Label, Row } from "reactstrap";
import Moment from "react-moment";

function CampaignHeader({ campDetail }) {
  return (
    <>
      <Row>
        <Col>
          <p className="text-muted">Advertiser</p>
          <strong>{campDetail.clientCompany.companyName}</strong>
        </Col>
        <Col>
          <p className="text-muted">Order Name</p>
          <strong>{campDetail.title}</strong>
        </Col>
        <Col>
          <p className="text-muted">Order Number</p>
          <strong>{campDetail.clientCampaignNumber}</strong>
        </Col>
        <Col>
          <p className="text-muted">Sales Organization</p>
          <strong>{campDetail.SalesOrgCompany.companyName}</strong>
        </Col>
      </Row>
    </>
  );
}

export default CampaignHeader;
