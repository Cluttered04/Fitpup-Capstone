import React, { Component } from "react";
import PropTypes from "prop-types";
import APIManager from "../../modules/APIManager";
import Moment from "react-moment";
import EditEntryModal from "./EditEntryModal";

class DogSummary extends Component {
  state = {
    dogs: "",
    expandedFoodEntries: [],
    expandedExerciseEntries: [],
    showModal: false,
    collectionItem: {},
    weight: "",
    weightHistory: [],
    foodEntriesByDate: [],
    exerciseEntriesByDate: []
  };

  //handles edit entry modal
  handleModal = item => {
    this.setState({
      collectionItem: item,
      showModal: true
    });
  };

  //Saves edit and retrieves expanded entries - sets to state
  editAndRetrieveExpand = (
    collection,
    object,
    stateCollection,
    dogId,
    expand
  ) => {
    const newState = {};
    return APIManager.editEntry(collection, object).then(() => {
      APIManager.getExpandedEntry(collection, dogId, expand).then(response => {
        newState[stateCollection] = response;
        this.setState(newState);
      });
    });
  };

  //Deletes entry and retrieves expanded entries - sets to state
  deleteAndRetrieveExpand = (
    collection,
    objectId,
    stateCollection,
    dogId,
    expand
  ) => {
    const newState = {};

    return APIManager.deleteEntry(collection, objectId)
      .then(() => APIManager.getExpandedEntry(collection, dogId, expand))
      .then(response => {
        newState[stateCollection] = response;
        this.setState(newState);
      });
  };

  postAndRetrieveWeight = (
    collection,
    object,
    searchCollection,
    itemId,
    stateCollection
  ) => {
    const newState = {};
    return APIManager.addNewEntry(collection, object)
      .then(() =>
        APIManager.getSingleEntryById(collection, searchCollection, itemId)
      )
      .then(response => {
        newState[stateCollection] = response;
        this.setState(newState);
      });
  };

  //Gets expanded entries by dog id
  componentDidMount() {
    const newState = {};
    APIManager.getExpandedEntry(
      "foodEntries",
      this.props.match.params.dogId,
      "food"
    )
      .then(food => {
        const sortedFoodEntries = food.sort((a, b) => (b.date > a.date ? 1 : -1))
        const foodEntriesByDate = this.divideEntriesByDate(sortedFoodEntries)
        newState.foodEntriesByDate = foodEntriesByDate
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
        const sortedExerciseEntries = exercise.sort((a, b) => (b.date > a.date ? 1 : -1))
        const exerciseEntriesByDate = this.divideEntriesByDate(sortedExerciseEntries)
        newState.exerciseEntriesByDate = exerciseEntriesByDate
        newState.expandedExerciseEntries = exercise;
      })
      .then(() =>
        APIManager.getSingleEntry("dogs", this.props.match.params.dogId).then(
          dog => {
            newState.dogs = dog;
          }
        )
      )
      .then(() =>
        APIManager.getSingleEntryById(
          "weight",
          "dogId",
          this.props.match.params.dogId
        )
      )
      .then(weight => {
        newState.weightHistory = weight;
        this.setState(newState);
      });
  }

  // Handles weight input changes
  handleWeighIn = evt => {
    evt.preventDefault();
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  // Adds new weight entry
  addWeightEntry = evt => {
    evt.preventDefault();
    if (Number.isInteger(parseInt(this.state.weight))) {
      let today = new Date().toISOString().slice(0, 10);
      const weightEntry = {
        dogId: this.props.match.params.dogId,
        weight: this.state.weight,
        date: today
      };
      this.postAndRetrieveWeight(
        "weight",
        weightEntry,
        "dogId",
        this.props.match.params.dogId,
        "weightHistory"
      );
      this.state.weight = "";
      this.refs.weight.value = "";
    } else {
      alert("Weight : Please enter a number");
    }
  };




  //Separates entries into separate arrays and pushes them into one big array - adaptation of stackoverflow answer on splitting an array into contiguous dates

  //Checks for difference between date
  divideEntriesByDate = (entries) => {
    function getDiffInDays(d1, d2){
      if(d1 && d2){
        var milliSecInDay = 24 * 60 * 60 * 1000;
        return parseInt((+d2 - +d1)/milliSecInDay);
      }
    }
    //Defines empty container array and lastDate
    let result = []
    let lastDate = null

    //Sorts entries by date

    entries.reduce(function(p, c, i, a){
      let date = new Date(c.date)
      //If same date, push into small array (p)
      if(!(lastDate === null || getDiffInDays(lastDate, date) === 0)){
        result.push(p)
        p=[]
      }p.push(c)
      //Pushes small array into container array
      if(i === a.length - 1 && p.length > 0){
        result.push(p)
      } //Sets last date to current date in the array
      lastDate = date
      return p
    }, [])
    return result
    // console.log(result)
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
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2qjTV1Vh1YMdM3hIkSB85WPbxlli89K7HUrvmLufKlatZLKr3"
          alt="dog"
        />
        <br />
        <input
          type="text"
          id="weight"
          ref="weight"
          placeholder="Weight in pounds"
          onChange={this.handleWeighIn}
        />
        <button onClick={this.addWeightEntry} value="weight">
          Weigh In
        </button>
        <h3>Recent Weigh Ins</h3>
        {/* Sorts weight history by date and displays three most recent weigh ins */}
        {this.state.weightHistory
          .sort((a, b) => (b.date > a.date ? 1 : -1))
          .slice(0, 3)
          .map(weight => {
            return (
              <div>
                <p>
                  {weight.date} <br /> {weight.weight} lbs.
                </p>
              </div>
            );
          })}
        <button onClick={() => this.props.history.push("/foods")}>
          Add Food Entry
        </button>
        <button onClick={() => this.props.history.push("/exercises")}>
          Add Exercise Entry
        </button>
        <section id="entries">

          {/* Loops over dates, prints headers/groups food entries together */}
          {this.state.foodEntriesByDate.map(date => {
            return (
            <div><h3>
            <Moment format="MM/DD/YYYY">{date[0].date}</Moment>
          </h3>
          <h4>Total Calories: {date.reduce((a, b) => a + (b.food.calories * b.serving), 0 )}</h4>

          {/* Prints out individual entry information */}
           {date.map(entry => {
            return (
              <div key={entry.id}>
                <h4>{entry.food.name}</h4>
                <h5>{entry.food.brand}</h5>
                <p>
                  Calories per serving: {entry.food.calories} <br />Servings:{" "}
                  {entry.serving} <br />
                  Calories: {entry.serving * entry.food.calories}
                </p>
                <button onClick={() => this.handleModal(entry)}>
                  Edit Entry
                </button>
                <button
                  onClick={() =>
                    this.deleteAndRetrieveExpand(
                      "foodEntries",
                      entry.id,
                      "expandedFoodEntries",
                      entry.dogId,
                      "food"
                    )
                  }
                >
                  Delete Entry
                </button>
            </div>
          )})};
          </div>)
          })})

          {/* Separates exercise entries by date, prints headers and total time */}
          {this.state.exerciseEntriesByDate.map(date => {
            return (
            <div><h3>
            <Moment format="MM/DD/YYYY">{date[0].date}</Moment>
          </h3>
          <h4>Total time: {date.reduce((a, b) =>   a + b.time, 0 )} </h4>

            {/* Prints individual exercise entry information */}
           {date.map(entry => {
            return (
              <div key={entry.id}>
                <h4>{entry.exercise.name}</h4>
                <p>Time: {entry.time} Minutes</p>
                <button onClick={() => this.handleModal(entry)}>
                  Edit Entry
                </button>
                <button
                  onClick={() =>
                    this.deleteAndRetrieveExpand(
                      "exerciseEntries",
                      entry.id,
                      "expandedExerciseEntries",
                      entry.dogId,
                      "exercise"
                    )
                  }
                >
                  Delete Entry
                </button>
              </div>
            );
          })}</div>)})}
        </section>
        <section id="entries" />
        {/* Conditionally displays edit modal */}
        {this.state.showModal === true ? (
          <EditEntryModal
            dogs={this.props.dogs}
            show={this.state.showModal}
            onHide={modalClose}
            addNewFoodEntry={this.props.addNewFoodEntry}
            {...this.props}
            collectionItem={this.state.collectionItem}
            editAndRetrieveExpand={this.editAndRetrieveExpand}
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
