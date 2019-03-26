import React, { Component } from "react";
import DogCard from "./DogCard";
import PropTypes from "prop-types";

class Home extends Component {
  render() {
    return (
      <div>
          <div>
          {this.props.dogs.map((dog) => {
              console.log(this.dog)
              return (
                  <DogCard dog={dog} key={dog.id} deleteDog={this.props.deleteDog} {...this.props}/>
              )
          })}
          </div>
          <button></button>
      </div>
    );
  }
}

Home.propTypes = {
    dogs: PropTypes.array.isRequired
}


export default Home;
