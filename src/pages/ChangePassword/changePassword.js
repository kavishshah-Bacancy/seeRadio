import React, { useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import "../login/login.css";
import InputField from "../../component/FormElements/InputField";
import { Validators } from "../../component/Validator/Validator";
import InputFieldIcon from "../../component/FormElements/InputFieldIcon";
import axios from "axios";
import { changePasswordFun } from "../../Api/api";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

toast.configure();
const ChangePassword = (props) => {
  const history = useHistory();
  const [changePassword, setChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [btnFlag, setBtnFlag] = useState(false);
  const handleChange = (name, value) => {
    setChangePassword({ ...changePassword, [name]: value });
  };

  const handleSubmit = () => {
    console.log(changePassword);
    let item = {
      oldPassword: changePassword.oldPassword,
      newPassword: changePassword.newPassword,
    };
    changePasswordFun(item)
      .then((res) => {
        console.log(res);
        props.onUpdateToken(res.token);
        toast.success(res.message);
        history.push("/");
      })
      .catch((error) => {
        toast.error(error.errorMessage);
      });
    // axios
    //   .post("http://localhost:3000/api/person/changePassword", item)
    //   .then((res) => {
    //     console.log(res.data);
    //     props.onUpdateToken(res.data.data.token);
    //     toast.success(res.data.data.message);
    //     history.push("/");
    //   })
    //   .catch((error) => {
    //     toast.error(error.response.data.errorMessage);
    //   });
  };
  return (
    <div>
      <Container>
        <Row>
          <Col />
          <Col lg="6" style={{ marginTop: "80px" }}>
            <Card
              style={{
                boxShadow: "0px 5px 5px 0px grey",
                borderRadius: "10px",
              }}
            >
              <CardBody>
                <Form>
                  <Row form>
                    <Col md={12}>
                      <Label for="exampleEmail">
                        <b>Current Password*</b>
                      </Label>
                      <InputFieldIcon
                        value={changePassword.oldPassword}
                        type={showOldPassword ? "text" : "password"}
                        placeholder="Enter password"
                        validators={[
                          {
                            check: Validators.required,
                            message: "Please Enter your Old password",
                          },
                        ]}
                        name="oldPassword"
                        onChange={handleChange}
                      >
                        {showOldPassword ? (
                          <BsFillEyeFill
                            onClick={() => setShowOldPassword(!showOldPassword)}
                          />
                        ) : (
                          <BsFillEyeSlashFill
                            onClick={() => setShowOldPassword(!showOldPassword)}
                          />
                        )}
                      </InputFieldIcon>
                    </Col>
                    <Col md={12}>
                      <Label for="exampleEmail">
                        <b>New Password*</b>
                      </Label>
                      <InputFieldIcon
                        value={changePassword.newPassword}
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter password"
                        validators={[
                          {
                            check: Validators.required,
                            message: "Please Enter your New password",
                          },
                          {
                            check: Validators.password,
                            message:
                              "Use 8 or more characters, at least one uppercase letter, one lowercase letter and one number and symbols:",
                          },
                        ]}
                        name="newPassword"
                        onChange={handleChange}
                      >
                        {showNewPassword ? (
                          <BsFillEyeFill
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          />
                        ) : (
                          <BsFillEyeSlashFill
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          />
                        )}
                      </InputFieldIcon>
                    </Col>
                    <Col md={12}>
                      <Label for="exampleEmail">
                        <b>Confirm Password*</b>
                      </Label>
                      <InputFieldIcon
                        value={changePassword.confirmPassword}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Enter confirm password"
                        validators={[
                          {
                            check: Validators.required,
                            message: "Please Enter your confirm password",
                          },
                        ]}
                        newPwd={changePassword.newPassword}
                        name="confirmPassword"
                        onChange={handleChange}
                      >
                        {showConfirmPassword ? (
                          <BsFillEyeFill
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          />
                        ) : (
                          <BsFillEyeSlashFill
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          />
                        )}
                      </InputFieldIcon>
                    </Col>
                  </Row>
                </Form>

                <Button
                  onClick={handleSubmit}
                  style={{ backgroundColor: "#0275d8", width: "100%" }}
                  id="submit"
                  disabled={btnFlag}
                >
                  Change password
                </Button>
              </CardBody>
            </Card>
          </Col>
          <Col />
        </Row>
      </Container>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateToken: (token) => dispatch(actions.changePassword(token)),
  };
};

export default connect(null, mapDispatchToProps)(ChangePassword);
