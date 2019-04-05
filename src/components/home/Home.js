import React, { Component } from "react";
import DogCard from "./DogCard";
import PropTypes from "prop-types";

class Home extends Component {
  render() {
    return (
      <div>
        <div className="home-buttons">
          <button onClick={() => this.props.history.push("/foods")}>My Foods</button><button onClick={() => this.props.history.push("/exercises")}>My exercises</button></div>
        <h1>My Dogs</h1>
          <div className="home">
          {this.props.dogs.map((dog) => {
              return (
                  <DogCard dog={dog} key={dog.id} deleteEntry={this.props.deleteEntry}{...this.props}/>
              )
          })}
          </div>
          <button className="new-dog" onClick={() => this.props.history.push("/dogs/new")}>Add Another Dog</button>
      </div>
    );
  }
}

Home.propTypes = {
    dogs: PropTypes.array.isRequired
}


export default Home;
