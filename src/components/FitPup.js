import React, {Component} from "react";
import ApplicationViews from "./ApplicationViews"
import "./FitPup.css";
import NavBar from "./Nav/NavBar"
import auth0Client from "./authentication/Auth"

class FitPup extends Component {

    async componentDidMount() {
        if (this.props.location.pathname === '/callback') return;
        try {
          await auth0Client.silentAuth();
          this.forceUpdate();
        } catch (err) {
          if (err.error !== 'login_required') console.log(err.error);
        }
      }

    render() {
        return (
            <React.Fragment>
                <NavBar />
                <ApplicationViews />
            </React.Fragment>
        )
    }
}

export default FitPup