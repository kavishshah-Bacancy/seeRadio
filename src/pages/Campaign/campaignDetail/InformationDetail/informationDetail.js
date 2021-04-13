import React from "react";
import { Col, Label, Row, Table } from "reactstrap";

function InformationDetail({ campDetail }) {
  return (
    <>
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
              <td>
                {campDetail.sram !== null ? (
                  <span>
                    {campDetail.sram.firstName} {campDetail.sram.lastName}
                  </span>
                ) : (
                  <span>Not Yet Assigned</span>
                )}
              </td>
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
              <td>
                {campDetail.sos !== null ? (
                  <span>
                    {campDetail.sos.firstName} {campDetail.sos.lastName}
                  </span>
                ) : (
                  <span>Not Yet Assigned</span>
                )}
              </td>
              <td>
                {campDetail.gra !== null ? (
                  <span>
                    {campDetail.gra.firstName} {campDetail.gra.lastName}
                  </span>
                ) : (
                  <span>Not Yet Assigned</span>
                )}
              </td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </>
  );
}

export default InformationDetail;
