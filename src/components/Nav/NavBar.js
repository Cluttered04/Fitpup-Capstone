import React, {Component} from "react"
import { Link, withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import auth0Client from "../authentication/Auth";

class NavBar extends Component {

    signOut = () => {
        auth0Client.signOut();
        sessionStorage.clear()
        this.props.history.replace("/");
      };


    render(){
        return (
        <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
        {!auth0Client.isAuthenticated() ? (
            <button className="btn btn-success" onClick={auth0Client.signIn}>
             Sign In
            </button>
        ) : (
        <React.Fragment>
            <ul className="nav nav-pills nav-fill decNav">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/food">Food</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/exercise">Exercise</Link>
                </li>
                <li className="nav-item">
                </li>
                    <li className=
                        "nav-item">
                        <Link className="nav-link" to="/login" onClick={this.props.handleLogout}>Log Out</Link>
                    </li>
                    </ul>
                    <div>
                    <label className="mr-2 text-blue">
                        {auth0Client.getProfile().name}
                    </label>
                    <button
                        className="btn btn-danger"
                        onClick={() => {
                            this.signOut();
                     }}
                    >
                    Sign Out
                    </button>
            </div>
        </React.Fragment>
        )}
        </nav>
      );
    }
   }



    export default withRouter(NavBar);