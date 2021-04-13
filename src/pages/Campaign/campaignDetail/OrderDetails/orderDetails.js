import React from "react";
import { Col, Label, Row } from "reactstrap";
import Moment from "react-moment";

function OrderDetails({ campDetail }) {
  return (
    <>
      <Row>
        <Col className="text-muted">
          <Label className="font-weight-bold">Order</Label>
          <hr></hr>
        </Col>
      </Row>
      <Row>
        <Col className="text-muted">
          <Label className="font-weight-bold">Description</Label>
          <p>{campDetail.description}</p>
        </Col>
      </Row>
      <Row>
        <Col className="text-muted">
          <Label className="font-weight-bold">
            Preferred Landing Website URL
          </Label>
          <p>
            <a href="/">{campDetail.landingpageURL}</a>
          </p>
        </Col>
        <Col className="text-muted">
          <Label className="font-weight-bold">Distribution Budget</Label>
          <p>${campDetail.distributionBudget}</p>
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col className="text-muted">
          <Label className="font-weight-bold">Target Market</Label>
          <p>{campDetail.targetMarket}</p>
        </Col>
        <Col className="text-muted">
          <Label className="font-weight-bold">Industry Category</Label>
          <p>{campDetail.clientCompany.Industry.name}</p>
        </Col>
        <Col className="text-muted">
          <Label className="font-weight-bold">Order Date</Label>
          <p>
            <Moment format="DD-MMM-YYYY">{campDetail.createdAt}</Moment>
          </p>
        </Col>
      </Row>
    </>
  );
}

export default OrderDetails;
