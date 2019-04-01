import React, { Component } from "react";
import PropTypes from "prop-types";
import FoodExerciseCard from "./FoodExerciseCard";
import AddEntryModal from "./AddEntryModal";

class ExerciseList extends Component {
  state = {
    showModal: false,
    exerciseItem: {}
  };

  handleModal = exercise => {
    this.setState({
      showModal: true,
      exerciseItem: exercise
    });
  };

  render() {
    //Function to close modal
    let modalClose = () => this.setState({ showModal: false });
    return (
      <div>
        <h1>My Exercises</h1>
        {this.props.exercises.map(exercise => {
          return (
            <div>
              <FoodExerciseCard
                collection={exercise}
                handleModal={this.handleModal}
                {...this.props}
                deleteAndRetrieveAll={this.props.deleteAndRetrieveAll}
                key={exercise.id}
              />
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
