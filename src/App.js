import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Rootform from "./pages/order/rootForm";
import NavBar from "./component/Layout/navBar";
import Login from "./pages/login/login";
import CampaignDetail from "./pages/Campaign/campaignDetail/campaignDetail";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/dashboard";
import ChangePassword from "./pages/ChangePassword/changePassword";
import VideosInProduction from "./pages/Campaign/VideosInProduction/videosInProduction";
import { connect } from "react-redux";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
function App(props) {
  let routes = <Login />;
  if (props.isAuthenticated) {
    routes = (
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/rootform" component={Rootform} />
          <Route path="/CampaignDetail" component={CampaignDetail} />
          <Route path="/changePassword" component={ChangePassword} />
          <Route path="/videosInProduction" component={VideosInProduction} />
        </Switch>
      </Router>
    );
  }

  return (
    <div>
      {routes}
      {/* <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/rootform" component={Rootform} />
          <Route path="/CampaignDetail" component={CampaignDetail} />
          <Route path="/changePassword" component={ChangePassword} />
          <Route path="/videosInProduction" component={VideosInProduction} />
        </Switch>
      </Router> */}

      {/* <NavBar />
      <Rootform />
      <CampaignDetail />  */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.token !== null,
    error: state.authReducer.error,
  };
};

export default connect(mapStateToProps)(App);
