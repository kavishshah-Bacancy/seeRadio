import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  Container,
} from "reactstrap";
import { IoIosFastforward, IoMdRewind } from "react-icons/io";
import InputField from "../../../component/FormElements/InputField";
import SelectOrder from "../../../component/FormElements/OrderSelect";
import { Validators } from "../../../component/Validator/Validator";
import "./addNewOrder.css";
import { getAllclient, getAllMarkets } from "../../../Api/api";
import OverlaySpinner from "../../../component/OverlaySpinner/overlaySpinner";

const AddnewOrder = ({
  nextStep,
  prevStep,
  newOrder,
  handleNewOrderChange,
  spinner,
}) => {
  const [advertiser, setAdvertiser] = useState([]);
  const [targetMarket, setTargetMarket] = useState([]);
  useEffect(() => {
    getAllclient().then((res) => {
      setAdvertiser(res);
    });

    getAllMarkets().then((res) => {
      setTargetMarket(res);
    });
  }, []);

  return (
    <Container>
      <Col style={{ marginTop: "50px" }}>
        <p style={{ color: "#09b7ec" }}>
          <b>Add New Orders</b>
        </p>
        <OverlaySpinner isActive={spinner}>
          <Card style={{ padding: "25px" }}>
            <Form>
              <FormGroup row>
                <Col className="m-3 bg-light text-muted">
                  <Label className="font-weight-bold">Order</Label>
                </Col>
              </FormGroup>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleSelect">
                      <b>
                        Advertiser<span className="reqField">*</span>
                      </b>
                    </Label>
                    <SelectOrder
                      value={newOrder.advertiser}
                      data={advertiser}
                      placeholder="Select Advertiser"
                      onChange={handleNewOrderChange}
                      name="advertiser"
                      selectedCondition={newOrder.clientCompanyID}
                      disabled={true}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Title">
                      <b>
                        Title<span className="reqField">*</span>
                      </b>
                    </Label>
                    <InputField
                      value={newOrder.title}
                      type="text"
                      placeholder="Title"
                      validators={[
                        {
                          check: Validators.required,
                          message: "Please Enter Title",
                        },
                      ]}
                      name="title"
                      onChange={handleNewOrderChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">
                      <b>
                        Preferred Landing Page URL
                        <span className="reqField">*</span>
                      </b>
                    </Label>
                    <InputField
                      value={newOrder.landingpageURL}
                      type="text"
                      placeholder="www.testBacancy.com"
                      validators={[
                        {
                          check: Validators.required,
                          message: "Please Enter Website Address",
                        },
                        {
                          check: Validators.website,
                          message: "Please Enter Valid Website Address",
                        },
                      ]}
                      name="landingpageURL"
                      onChange={handleNewOrderChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">
                      <b>
                        Price<span className="reqField">*</span>
                      </b>
                    </Label>
                    <InputField
                      value={newOrder.price}
                      type="number"
                      placeholder="Price"
                      validators={[
                        {
                          check: Validators.required,
                          message: "Please Enter Price",
                        },
                      ]}
                      name="price"
                      onChange={handleNewOrderChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">
                      <b>
                        Description<span className="reqField">*</span>
                      </b>
                    </Label>
                    <InputField
                      value={newOrder.description}
                      type="textarea"
                      placeholder="Enter Description"
                      validators={[
                        {
                          check: Validators.required,
                          message: "Please Enter Description",
                        },
                      ]}
                      name="description"
                      onChange={handleNewOrderChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}></Col>
              </Row>

              <FormGroup row>
                <Col className="m-3 bg-light text-muted">
                  <Label className="font-weight-bold">Distribution</Label>
                </Col>
              </FormGroup>

              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleSelect">
                      <b>
                        Target Market<span className="reqField">*</span>
                      </b>
                    </Label>
                    <SelectOrder
                      value={newOrder.targetMarket}
                      data={targetMarket}
                      placeholder="Select Target Market"
                      onChange={handleNewOrderChange}
                      name="targetMarket"
                      cityName="London"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="examplePassword">
                      <b>
                        Budget<span className="reqField">*</span>
                      </b>
                    </Label>

                    <InputField
                      value={newOrder.budget}
                      type="number"
                      placeholder="$50"
                      validators={[
                        {
                          check: Validators.required,
                          message: "Please Enter your Budget",
                        },
                      ]}
                      name="budget"
                      onChange={handleNewOrderChange}
                    />
                  </FormGroup>
                </Col>
              </Row>

              <div>
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
                    onClick={nextStep}
                    style={{ backgroundColor: "#09b7ec" }}
                  >
                    Create Order <IoIosFastforward />
                  </Button>
                </span>
              </div>
            </Form>
          </Card>
        </OverlaySpinner>
      </Col>
    </Container>
  );
};

export default AddnewOrder;
