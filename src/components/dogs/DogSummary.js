import React, { Component } from "react";
import PropTypes from "prop-types";
import APIManager from "../../modules/APIManager";
import Moment from "react-moment";
import EditEntryModal from "./EditEntryModal"

class DogSummary extends Component {
  state = {
    dogs: "",
    expandedFoodEntries: [],
    expandedExerciseEntries: [],
    showModal: false,
    collectionItem: {},
    weight: ""
  };

  //handles edit entry modal
  handleModal = item => {
      this.setState({
        collectionItem: item,
        showModal: true
      })
  }

  //Gets expanded entries by dog id
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
          "exercise"
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

    // Handles weight input changes
    handleWeighIn = evt => {
        evt.preventDefault()
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    // Adds new weight entry
    addWeightEntry = evt => {
        evt.preventDefault()
        if(Number.isInteger(parseInt(this.state.weight))) {
            let today = new Date().toISOString().slice(0, 10)
        const weightEntry = {
            dogId: this.props.match.params.dogId,
            weight: this.state.weight,
            date: today
        }
        this.props.addNewEntry("weight", weightEntry, "weight")
        this.state.weight = ""
        this.refs.weight.value = ""
        } else {
            alert("Weight : Please enter a number")
        }
    }

  render() {
    let modalClose = () => this.setState({ showModal: false });
    const dog =
      this.props.dogs.find(
        dog => dog.id === parseInt(this.props.match.params.dogId)
      ) || {};
    return (
        // Dog info and weight input/button
      <div>
        <h1>{dog.name}</h1>
        <img src="../../../public/images/DogSummaryImage.png" alt="dog" />
        <input type="text" id="weight" ref="weight" placeholder="Weight in pounds" onChange={this.handleWeighIn}></input>
        <button onClick={this.addWeightEntry} value="weight">Weigh In</button>
        <button onClick={() => this.props.history.push("/foods")}>
          Add Food Entry
        </button>
        <button onClick={() => this.props.history.push("/exercises")}>
          Add Exercise Entry
        </button>
        <section id="entries">
        {/* Lists foods sorted by date*/}
          {this.state.expandedFoodEntries.sort((a,b) => a.date > b.date ? -1 : 1).map(entry => {
            return (
              <div key={entry.id}>
                <h4>
                  <Moment format="MM/DD/YYYY">{entry.date}</Moment>
                </h4>
                <h4>{entry.food.name}</h4>
                <h5>{entry.food.brand}</h5>
                <p>Calories per serving: {entry.food.calories} <br></br>Servings: {entry.serving} <br/>Calories: {entry.serving * entry.food.calories}</p>
                <button onClick={() => this.handleModal(entry)}>Edit Entry</button>
                <button onClick={() => this.props.deleteEntry("foodEntries", entry.id, "foodEntries")}>Delete Entry</button>
              </div>
            );
          })}
          {/* List exercises sorted by date */}
          {this.state.expandedExerciseEntries.sort((a, b) => a.date > b.date ? -1 : 1).map(entry => {
            return (
              <div key={entry.id}>
                <h4>
                  <Moment format="MM/DD/YYYY">{entry.date}</Moment>
                </h4>
                <h4>{entry.exercise.name}</h4>
                <p>Time: {entry.time} Minutes</p>
                <button onClick={() => this.handleModal(entry)}>Edit Entry</button>
                <button onClick={() => this.props.deleteEntry("exerciseEntries", entry.id, "exerciseEntries")}>Delete Entry</button>
              </div>
            );
          })}
        </section>
        <section id="entries" />
        {/* Conditionally displays edit modal */}
        {this.state.showModal === true ? (
          <EditEntryModal
            dogs={this.props.dogs}
            show={this.state.showModal}
            onHide={modalClose}
            addNewFoodEntry={this.props.addNewFoodEntry}
            {...this.props} collectionItem={this.state.collectionItem}
          />
        ) : (
          ""
        )}
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
