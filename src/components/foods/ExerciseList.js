import React, { Component } from "react";
import PropTypes from "prop-types";
import FoodExerciseCard from "./FoodExerciseCard";
import AddEntryModal from "./AddEntryModal";

class ExerciseList extends Component {
  state = {
    showModal: false,
    exerciseItem: {},
    search: ""
  };

  //Handles modal visibility and sets specific entry to state for editing
  handleModal = exercise => {
    this.setState({
      showModal: true,
      exerciseItem: exercise
    });
  };

//Handles search bar field change
  handleFieldChange = evt => {
    evt.preventDefault();
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };


  render() {
    //Function to close modal
    let modalClose = () => this.setState({ showModal: false });
    let filteredExercises = this.props.exercises.filter(exercise => {
        return (
          exercise.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
            -1
        );
      });

    return (
      <div>
        <h1>My Exercises</h1>
        <input
          id="search"
          value={this.state.search}
          placeholder="Search Exercises"
          onChange={this.handleFieldChange}
        />
        {filteredExercises.map(exercise => {
          return (
            <div>
                {/* Maps through exercise list and returns cards */}
              <FoodExerciseCard
                collection={exercise}
                handleModal={this.handleModal}
                {...this.props}
                deleteAndRetrieveAll={this.props.deleteAndRetrieveAll}
                key={exercise.id}
              />
              {/* Conditionally renders modal on button click */}
              {this.state.showModal === true ? (
                <AddEntryModal
                  dogs={this.props.dogs}
                  show={this.state.showModal}
                  onHide={modalClose}
                  addNewFoodEntry={this.props.addNewFoodEntry}
                  {...this.props}
                  collectionItem={this.state.exerciseItem}
                />
              ) : (
                ""
              )}
            </div>
          );
        })}
        <button onClick={() => this.props.history.push("/exercises/new")}>
          Add New Exercise
        </button>
      </div>
    );
  }
}

ExerciseList.propTypes = {
  exercises: PropTypes.array.isRequired
};

export default ExerciseList;
