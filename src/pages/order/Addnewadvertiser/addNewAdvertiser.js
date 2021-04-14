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
import { IoIosFastforward } from "react-icons/io";
import InputField from "../../../component/FormElements/InputField";
import Dropdown from "../../../component/FormElements/DropDown";
import { Validators } from "../../../component/Validator/Validator";
import "./addNewAdvertiser.css";
import axios from "axios";
import { getCountry, getIndustry } from "../../../Api/api";
import Spinner from "../../../component/Spinner/spinner";
import OverlaySpinner from "../../../component/OverlaySpinner/overlaySpinner";

const AddnewAdvertiser = ({
  newAdvertiser,
  handleChange,
  handleCheckbox,
  secContactFlag,
  billingAddressFlag,
  nextStep,
  countryValFlag,
  states,
  secStates,
  secCountryValFlag,
  spinner,
}) => {
  const [indusCat, setIndusCat] = useState();
  const [country, setCountrynew] = useState();
  useEffect(() => {
    getIndustry().then((res) => {
      setIndusCat(res);
    });

    getCountry().then((res) => {
      let arr = [];
      for (let key in res) {
        arr.push({
          id: res[key].code,
          name: res[key].name,
        });
      }
      console.log(arr);
      setCountrynew(arr);
    });
  }, []);

  return (
    <Container>
      <Col style={{ marginTop: "50px" }}>
        <p style={{ color: "#09b7ec" }}>
          <b>Add New Advertiser</b>
        </p>
        <OverlaySpinner isActive={spinner}>
          <Card style={{ padding: "25px" }}>
            <Form>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">
                      <b>
                        Company Name
                        <span className="reqField">
                          <span className="reqField">*</span>
                        </span>
                      </b>
                    </Label>
                    <InputField
                      value={newAdvertiser.companyName}
                      type="text"
                      placeholder="Comapny Name"
                      validators={[
                        {
                          check: Validators.required,
                          message: "Please Enter Company Name",
                        },
                      ]}
                      name="companyName"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="examplePassword">
                      <b>
                        Company Website Address
                        <span className="reqField">*</span>
                      </b>
                    </Label>
                    <InputField
                      value={newAdvertiser.website}
                      type="text"
                      placeholder="eg. www.abc.com "
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
                      name="website"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleSelect">
                      <b>
                        Industry Category<span className="reqField">*</span>
                      </b>
                    </Label>
                    {indusCat ? (
                      <Dropdown
                        value={newAdvertiser.industryCategory}
                        data={indusCat}
                        placeholder="Select Industry Category"
                        onChange={handleChange}
                        name="industryCategory"
                      />
                    ) : null}
                  </FormGroup>
                </Col>
                <Col md={6}></Col>
              </Row>
              <FormGroup row>
                <Col className="m-3 bg-light text-muted">
                  <Label className="font-weight-bold">Primary Contact</Label>
                </Col>
              </FormGroup>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">
                      <b>
                        First Name<span className="reqField">*</span>
                      </b>
                    </Label>
                    <InputField
                      value={newAdvertiser.firstName}
                      type="text"
                      placeholder="First Name"
                      validators={[
                        {
                          check: Validators.required,
                          message: "Please Enter your First Name",
                        },
                      ]}
                      name="firstName"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">
                      <b>
                        Last Name<span className="reqField">*</span>
                      </b>
                    </Label>
                    <InputField
                      value={newAdvertiser.lastName}
                      type="text"
                      placeholder="Last Name"
                      validators={[
                        {
                          check: Validators.required,
                          message: "Please Enter your Last Name",
                        },
                      ]}
                      name="lastName"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">
                      <b>
                        Email<span className="reqField">*</span>
                      </b>
                    </Label>
                    <InputField
                      value={newAdvertiser.email}
                      type="text"
                      placeholder="Enter Email"
                      validators={[
                        {
                          check: Validators.required,
                          message: "Please Enter your First Name",
                        },
                        {
                          check: Validators.email,
                          message: "Please Enter valid email",
                        },
                      ]}
                      name="email"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="examplePassword">
                      <b>
                        Phone<span className="reqField">*</span>
                      </b>
                    </Label>
                    <InputField
                      value={newAdvertiser.phone}
                      type="text"
                      placeholder="Enter Phone"
                      validators={[
                        {
                          check: Validators.required,
                          message: "Please Enter your Phone",
                        },
                        {
                          check: Validators.phoneNumber,
                          message: "Please Enter valid phone",
                        },
                      ]}
                      name="phone"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup row>
                <Col className="m-3 bg-light text-muted">
                  <Label className="col-9 font-weight-bold">
                    <Input
                      type="checkbox"
                      name="secContactFlag"
                      onChange={handleCheckbox}
                      className="m"
                    />
                    Secondary Contact (Billing . optional)
                  </Label>
                </Col>
              </FormGroup>
              <Row form hidden={!secContactFlag}>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">
                      <b>
                        First Name<span className="reqField">*</span>
                      </b>
                    </Label>
                    <InputField
                      value={newAdvertiser.secondaryContact.secFirstName}
                      type="text"
                      placeholder="First Name"
                      validators={[
                        {
                          check: Validators.required,
                          message: "Please Enter your First Name",
                        },
                      ]}
                      name="secFirstName"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">
                      <b>
                        Last Name<span className="reqField">*</span>
                      </b>
                    </Label>
                    <InputField
                      value={newAdvertiser.secondaryContact.secLastName}
                      type="text"
                      placeholder="Last Name"
                      validators={[
                        {
                          check: Validators.required,
                          message: "Please Enter your Last Name",
                        },
                      ]}
                      name="secLastName"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form hidden={!secContactFlag}>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">
                      <b>
                        Email<span className="reqField">*</span>
                      </b>
                    </Label>
                    <InputField
                      value={newAdvertiser.secondaryContact.secEmail}
                      type="text"
                      placeholder="Enter Email"
                      validators={[
                        {
                          check: Validators.required,
                          message: "Please Enter your First Name",
                        },
                        {
                          check: Validators.email,
                          message: "Please Enter valid email",
                        },
                      ]}
                      name="secEmail"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="examplePassword">
                      <b>
                        Phone<span className="reqField">*</span>
                      </b>
                    </Label>
                    <InputField
                      value={newAdvertiser.secondaryContact.secPhone}
                      type="text"
                      placeholder="Enter Phone"
                      validators={[
                        {
                          check: Validators.required,
                          message: "Please Enter your Phone",
                        },
                        {
                          check: Validators.phoneNumber,
                          message: "Please Enter valid phone",
                        },
                      ]}
                      name="secPhone"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup row>
                <Col className="m-3 bg-light text-muted">
                  <Label className="font-weight-bold">Business Address</Label>
                </Col>
              </FormGroup>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">
                      <b>
                        Address<span className="reqField">*</span>
                      </b>
                    </Label>
                    <InputField
                      value={newAdvertiser.address}
                      type="text"
                      placeholder="Enter Address"
                      validators={[
                        {
                          check: Validators.required,
                          message: "Please Enter your Address",
                        },
                      ]}
                      name="address"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">
                      <b>
                        Address Line 2<span className="reqField">*</span>
                      </b>
                    </Label>
                    <InputField
                      value={newAdvertiser.addressLine2}
                      type="text"
                      placeholder="Enter Address"
                      validators={[
                        {
                          check: Validators.required,
                          message: "Please Enter your Address",
                        },
                      ]}
                      name="addressLine2"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">
                      <b>
                        City<span className="reqField">*</span>
                      </b>
                    </Label>
                    <InputField
                      value={newAdvertiser.city}
                      type="text"
                      placeholder="Enter City"
                      validators={[
                        {
                          check: Validators.required,
                          message: "Please Enter your City",
                        },
                      ]}
                      name="city"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleSelect">
                      <b>
                        Select Country<span className="reqField">*</span>
                      </b>
                    </Label>
                    {country ? (
                      <Dropdown
                        value={newAdvertiser.country}
                        data={country}
                        placeholder="Select Country"
                        onChange={handleChange}
                        name="country"
                      />
                    ) : null}
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleSelect">
                      <b>
                        State/Province<span className="reqField">*</span>
                      </b>
                    </Label>
                    <Dropdown
                      value={newAdvertiser.state}
                      data={states}
                      placeholder="Select State/Province"
                      onChange={handleChange}
                      name="state"
                      disabled={countryValFlag}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">
                      <b>
                        Postal<span className="reqField">*</span>
                      </b>
                    </Label>
                    <InputField
                      value={newAdvertiser.postal}
                      type="text"
                      placeholder="Postal"
                      validators={[
                        {
                          check: Validators.required,
                          message: "Please Enter Postal",
                        },
                        {
                          check:
                            newAdvertiser.country === "US"
                              ? Validators.checkUsPostal
                              : Validators.checkCanadaPostal,
                          message: `Please Enter valid ${newAdvertiser.country} Postal`,
                        },
                      ]}
                      name="postal"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup row>
                <Col className="m-3 bg-light text-muted">
                  <Label className="col-9 font-weight-bold">
                    <Input
                      type="checkbox"
                      name="billingAddressFlag"
                      onChange={handleCheckbox}
                      className="m"
                    />
                    Billing Address (Optional)
                  </Label>
                </Col>
              </FormGroup>
              <Row form hidden={!billingAddressFlag}>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">
                      <b>
                        Address<span className="reqField">*</span>
                      </b>
                    </Label>
                    <InputField
                      value={newAdvertiser.secondaryAddress.secAddress}
                      type="text"
                      placeholder="Enter Address"
                      validators={[
                        {
                          check: Validators.required,
                          message: "Please Enter your Address",
                        },
                      ]}
                      name="secAddress"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">
                      <b>
                        Address Line 2<span className="reqField">*</span>
                      </b>
                    </Label>
                    <InputField
                      value={newAdvertiser.secondaryAddress.secAddressLine2}
                      type="text"
                      placeholder="Enter Address"
                      validators={[
                        {
                          check: Validators.required,
                          message: "Please Enter your Address",
                        },
                      ]}
                      name="secAddressLine2"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form hidden={!billingAddressFlag}>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">
                      <b>
                        City<span className="reqField">*</span>
                      </b>
                    </Label>
                    <InputField
                      value={newAdvertiser.secondaryAddress.secCity}
                      type="text"
                      placeholder="Enter City"
                      validators={[
                        {
                          check: Validators.required,
                          message: "Please Enter your City",
                        },
                      ]}
                      name="secCity"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleSelect">
                      <b>
                        Select Country<span className="reqField">*</span>
                      </b>
                    </Label>
                    {country ? (
                      <Dropdown
                        value={newAdvertiser.secondaryAddress.secCountry}
                        data={country}
                        placeholder="Select Country"
                        onChange={handleChange}
                        name="secCountry"
                      />
                    ) : null}
                  </FormGroup>
                </Col>
              </Row>
              <Row form hidden={!billingAddressFlag}>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleSelect">
                      <b>
                        State/Province<span className="reqField">*</span>
                      </b>
                    </Label>
                    <Dropdown
                      value={newAdvertiser.secondaryAddress.secState}
                      data={secStates}
                      placeholder="Select State/Province"
                      onChange={handleChange}
                      name="secState"
                      disabled={secCountryValFlag}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">
                      <b>
                        Postal<span className="reqField">*</span>
                      </b>
                    </Label>
                    <InputField
                      value={newAdvertiser.secondaryAddress.secPostal}
                      type="text"
                      placeholder="Postal"
                      validators={[
                        {
                          check: Validators.required,
                          message: "Please Enter Postal",
                        },
                        {
                          check:
                            newAdvertiser.secondaryAddress.secCountry === "US"
                              ? Validators.checkUsPostal
                              : Validators.checkCanadaPostal,
                          message: `Please Enter valid ${newAdvertiser.secondaryAddress.secCountry} Postal`,
                        },
                      ]}
                      name="secPostal"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <div style={{ float: "right" }}>
                <Button style={{ backgroundColor: "white", color: "black" }}>
                  Cancel
                </Button>
                <Button
                  onClick={nextStep}
                  style={{ backgroundColor: "#09b7ec" }}
                >
                  Create Advertiser <IoIosFastforward />
                </Button>
              </div>
            </Form>
          </Card>
        </OverlaySpinner>
      </Col>
    </Container>
  );
};

export default AddnewAdvertiser;
