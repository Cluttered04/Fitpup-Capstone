import React, { Component } from "react";
import DogCard from "./DogCard";
import PropTypes from "prop-types";

class Home extends Component {
  render() {
    return (
      <div>
        <div className="home-buttons">
          <button className="exercises-btn" onClick={() => this.props.history.push("/foods")}>My Foods</button><button className="exercises-btn" onClick={() => this.props.history.push("/exercises")}>My exercises</button></div>
        <h1>My Dogs</h1>
          <div className="home">
          {this.props.dogs.map((dog) => {
              return (
                  <DogCard dog={dog} key={dog.id} deleteEntry={this.props.deleteEntry}{...this.props}/>
              )
          })}
          </div>
          <div className="new-dog" >
          <button className="new-dog-btn"  onClick={() => this.props.history.push("/dogs/new")}>Add Another Dog</button>
          </div>

      </div>
    );
  }
}

Home.propTypes = {
    dogs: PropTypes.array.isRequired
}


export default Home;
