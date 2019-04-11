import React, {Component} from "react"
import FitPupLogo from "../images/Logo.png"

class Info extends Component {

    render() {
        return(
            <div>
            <img className="logo" alt="logo" src={FitPupLogo}/>
            <h1>Please Sign in!</h1>
            </div>
        )

    }
}

export default Info