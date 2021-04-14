import React from "react";
import { useHistory } from "react-router";
import { Button, Card } from "reactstrap";
import logo from "../../assets/logo.png";

function NotFoundPage() {
  const history = useHistory();
  console.log(history);
  return (
    <>
      <Card
        className="container"
        style={{ padding: "40px", width: "50%", marginTop: "10%" }}
      >
        <img
          src={logo}
          alt="seeRadio"
          style={{
            height: "25%",
            width: "35%",
            padding: "10px",
            marginLeft: "30%",
          }}
        />
        <h3 style={{ alignSelf: "center", marginTop: "5%", color: "#09b7ec" }}>
          404 : Page Not Found
        </h3>
        <Button
          size="sm"
          color="primary"
          style={{ width: "50%", alignSelf: "center", marginTop: "5%" }}
          onClick={() => history.goBack()}
        >
          Back
        </Button>
      </Card>
    </>
  );
}

export default NotFoundPage;
