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
import logo from "../../assets/logo.png";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import "./login.css";
import InputField from "../../component/FormElements/InputField";
import { Validators } from "../../component/Validator/Validator";
import InputFieldIcon from "../../component/FormElements/InputFieldIcon";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { useHistory } from "react-router";

const Login = (props) => {
  const history = useHistory();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (name, value) => {
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = () => {
    props.onLogin(loginData.email, loginData.password);
  };

  if (props.isAuthenticated) {
    history.push("/dashboard");
  }
  return (
    <div>
      <Container>
        <Row>
          <Col />
          <Col lg="6" style={{ marginTop: "80px" }}>
            <img src={logo} alt="icon" className="logo" />
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
                      <FormGroup>
                        <Label for="exampleEmail">
                          <b>Email</b>
                        </Label>
                        <InputField
                          value={loginData.email}
                          type="text"
                          placeholder="Email"
                          validators={[
                            {
                              check: Validators.required,
                              message: "Please Enter your Email",
                            },
                            {
                              check: Validators.email,
                              message: "Please Enter valid Email",
                            },
                          ]}
                          name="email"
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <Label for="exampleEmail">
                        <b>Password</b>
                      </Label>
                      <InputFieldIcon
                        value={loginData.password}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        validators={[
                          {
                            check: Validators.required,
                            message: "Please Enter your password",
                          },
                        ]}
                        name="password"
                        onChange={handleChange}
                      >
                        {showPassword ? (
                          <BsFillEyeFill
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        ) : (
                          <BsFillEyeSlashFill
                            onClick={() => setShowPassword(!showPassword)}
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
                >
                  Login
                </Button>
                <div style={{ textAlign: "center", padding: "1rem" }}>
                  <a href="/">Forget Password ?</a>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col />
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.token !== null,
    error: state.authReducer.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (email, password) => dispatch(actions.login(email, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
