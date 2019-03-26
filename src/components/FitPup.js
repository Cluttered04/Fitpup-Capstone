import React, {Component} from "react";
import ApplicationViews from "./ApplicationViews"
import "./FitPup.css";
import NavBar from "./Nav/NavBar"

class FitPup extends Component {
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