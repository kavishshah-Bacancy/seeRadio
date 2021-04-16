import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaAudioDescription,
  FaTint,
  FaUserAlt,
  FaLock,
  FaExclamationCircle,
  FaSignOutAlt,
  FaUserCircle,
  FaPlus,
} from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button,
} from "reactstrap";
import logo from "../../assets/logo.png";
import "./navBar.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

const NavBar = (props) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const personInfo = JSON.parse(localStorage.getItem("personalInfo"));
  return (
    <div>
      <Navbar style={{ backgroundColor: "white" }} light expand="md">
        <img src={logo} className="seeRadiologo" alt="logo" />
        {/* <NavbarToggler onClick={toggle} /> */}
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto accountIcon" navbar>
            <UncontrolledDropdown nav navbar>
              <DropdownToggle nav caret>
                <span>
                  <button className="profileIcon">
                    {/* {props.user.firstName[0]}
                    {props.user.lastName[0]} */}
                    {personInfo.firstName[0]}
                    {personInfo.lastName[0]}
                  </button>
                </span>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link className="nav-link">
                    <FaUserAlt style={{ color: "#09b7ec" }} />
                    &nbsp;Profile
                  </Link>
                </DropdownItem>
                <DropdownItem>
                  <Link className="nav-link" to="/changePassword">
                    <FaLock style={{ color: "#09b7ec" }} />
                    &nbsp;Change password
                  </Link>
                </DropdownItem>
                <DropdownItem>
                  <Link className="nav-link">
                    <FaExclamationCircle style={{ color: "#09b7ec" }} />
                    &nbsp;Company Detail
                  </Link>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <Link
                    className="nav-link"
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("id");
                      localStorage.removeItem("personalInfo");
                      history.push("/");
                      props.onLogout();
                    }}
                  >
                    <FaSignOutAlt style={{ color: "rgb(228, 36, 68)" }} />
                    &nbsp;Signout
                  </Link>
                </DropdownItem>
              </DropdownMenu>
              <div className="userInfo">
                ComputerCity <br></br>
                {/* {props.user.role} <br></br>
                {props.user.email} */}
                {personInfo.role} <br></br>
                {personInfo.email}
              </div>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>

      <Navbar style={{ backgroundColor: "#09b7ec" }} light expand="md">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link className="nav-link" to="/dashboard">
                <FaTachometerAlt />
                &nbsp; Dashboard
              </Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <FaTint />
                &nbsp;Campaign
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link className="nav-link" to="/videosInProduction">
                    Videos in Production
                  </Link>
                </DropdownItem>
                <DropdownItem>
                  <Link className="nav-link"> Campaigns in Market</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link className="nav-link"> Completed Campaigns</Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <Link className="nav-link" to="">
                <FaAudioDescription />
                &nbsp;Advertiser
              </Link>
            </NavItem>
          </Nav>
          <NavbarText style={{ padding: "0px" }}>
            <Link className="nav-link" to="/rootform">
              <FaPlus />
              &nbsp;Order
            </Link>
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.activeUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
