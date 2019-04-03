import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import auth0Client from "./Auth";

class Callback extends Component {
  async componentDidMount() {
    await auth0Client.handleAuthentication();

    // Checks to see if user exists in db
    fetch(`http://localhost:5002/users?aud=${auth0Client.getProfile().sub}`)
      .then(matchingUser => matchingUser.json())
      .then(matchingUser => {

        if (matchingUser.length === 0) {

          // Create a new user object to post to the db
          const newUser = {
            aud: auth0Client.getProfile().sub,
            name: auth0Client.getProfile().nickname
          };

          // Posts new user to db
          fetch(`http://localhost:5002/users`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
          })
            .then(newlyCreatedUser => newlyCreatedUser.json())
            .then(parsedUser => {

              //Sets new user info in session storage

              sessionStorage.setItem("credentials", parsedUser.id);
            });
        } else {

          //Logs user in if user exists in database - sets user info to state

          sessionStorage.setItem("credentials", matchingUser[0].id);
          this.props.mountUponLogin()
        }
      });
    this.props.history.replace("/");
  }

  render() {
    return <p>Loading profile...</p>;
  }
}

export default withRouter(Callback);