import React, { Component } from "react";
import PropTypes from "prop-types";
import APIManager from "../../modules/APIManager";

class DogSummary extends Component {
  state = {
    dogs: "",
    expandedFoodEntries: [],
    expandedExerciseEntries: []
  };

  componentDidMount() {
    const newState = {};
    APIManager.getExpandedEntry(
      "foodEntries",
      this.props.match.params.dogId,
      "food"
    )
      .then(food => {
        newState.expandedFoodEntries = food;
      })
      .then(() =>
        APIManager.getExpandedEntry(
          "exerciseEntries",
          this.props.match.params.dogId,
          "exercises"
        )
      )
      .then(exercise => {
        newState.expandedExerciseEntries = exercise;
        this.setState(newState);
      })
      .then(() =>
        APIManager.getSingleEntry("dogs", this.props.match.params.dogId)
      );
  }

  render() {
    const dog =
      this.props.dogs.find(
        dog => dog.id === parseInt(this.props.match.params.dogId)
      ) || {};
      console.log(this.state.expandedFoodEntries)
    return (
      <div>
        <h1>{dog.name}</h1>
        <img src="../../../public/images/DogSummaryImage.png" alt="dog" />
        <button>Weigh In</button>
        <button onClick={() => this.props.history.push("/foods")}>
          Add Food Entry
        </button>
        <button onClick={() => this.props.history.push("/exercises")}>
          Add Exercise Entry
        </button>
        <section id="entries">
          {this.state.expandedFoodEntries.map(entry => {
            console.log(entry.servings * entry.food.calories);
            return (
              <div>
                <h4>{entry.food.name}</h4>
                <h5>{entry.food.brand}</h5>
                <p>Servings: {entry.serving}</p>
                <p>
                  Calories:{" "}
                  {entry.servings * entry.food.calories}
                </p>
              </div>
            );
          })}
        </section>
        <section id="entries" />
      </div>
    );
  }
}

DogSummary.propTypes = {
  dog: PropTypes.shape({
    userID: PropTypes.number,
    name: PropTypes.string,
    neutered: PropTypes.bool,
    active: PropTypes.bool,
    age: PropTypes.number,
    breed: PropTypes.string
  })
};
export default DogSummary;
