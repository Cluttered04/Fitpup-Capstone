import React, { Component } from "react";
import PropTypes from "prop-types";
import APIManager from "../../modules/APIManager";
import Moment from "react-moment";
import EditEntryModal from "./EditEntryModal";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, BarChart, Bar } from 'recharts';
import calculator from "../calculator/Calculator"

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
    exerciseEntriesByDate: [],
    behavior: "",
    behaviorHistory: [],
    behaviorMessage: false
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

  postAndRetrieveByDog = (
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
          "behavior",
          "dogId",
          this.props.match.params.dogId
        )
      )
      .then(behaviorEntry => {
        newState.behaviorHistory = behaviorEntry
      })
      .then(() =>
        APIManager.getSingleEntryById(
          "weight",
          "dogId",
          this.props.match.params.dogId
        )
      )
      .then(weightEntry => {
        newState.weightHistory = weightEntry;
        this.setState(newState);
      });
  }

  // Handles weight input changes
  handleFieldChange = evt => {
    evt.preventDefault();
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  // Adds new weight entry
  addWeightEntry = evt => {
    evt.preventDefault();
    if (Number.isInteger(parseInt(this.state.weight))) {
      let today = new Date().toISOString();
      const weightEntry = {
        dogId: this.props.match.params.dogId,
        weight: parseInt(this.state.weight),
        date: today
      };
      this.postAndRetrieveByDog(
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

  //AddBehaviorEntry
  addBehaviorEntry = evt => {
    evt.preventDefault()
    let today = new Date().toISOString();
    const behaviorEntry = {
      dogId: this.props.match.params.dogId,
      date: today.slice(0, 10),
      behavior: parseInt(this.state.behavior)
    }
    this.postAndRetrieveByDog(
      "behavior",
      behaviorEntry,
      "dogId",
      this.props.match.params.dogId,
      "behaviorHistory"
    )
    this.setState({
      behaviorMessage: true
    })
  }




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

      //Sorts foods/exercises by date, then groups them into smaller arrays by dates
      const sortedFoodEntries = this.state.expandedFoodEntries.sort((a, b) => (b.date > a.date ? 1 : -1))
      const foodEntriesByDate = this.divideEntriesByDate(sortedFoodEntries).length > 0 ? this.divideEntriesByDate(sortedFoodEntries) : []
      const sortedExerciseEntries = this.state.expandedExerciseEntries.sort((a, b) => (b.date > a.date ? 1 : -1))
      const exerciseEntriesByDate = this.divideEntriesByDate(sortedExerciseEntries).length > 0 ? this.divideEntriesByDate(sortedExerciseEntries) : []

      //Array that calculates calories by date for graph
      const calorieArray = []
      const caloriesByDate = foodEntriesByDate.map( date => {
        const newFoodObject = {
          date: date[0].date,
          calories: date.reduce((a, b) => a + (b.food.calories * b.serving), 0 )
        }
        calorieArray.push(newFoodObject)
        return calorieArray.sort((a, b) => b.date > a.date ? -1 : 1)
      })

      //Slices dates on weight objects for better graph labelling
      const weightArray = []
      const weightOverTimer = this.state.weightHistory.sort((a, b) => (b.date > a.date ? -1 : 1)).map(weight => {
        const weightObject = {
          date: weight.date.slice(0, 10),
          weight: weight.weight
        }
        weightArray.push(weightObject)
        return weightArray
      })

      //Array that calculates exercise time by date for graph
      const activityArray = []
      const activityOverTime = exerciseEntriesByDate.map(date => {
        const newExerciseObject = {
          date: date[0].date,
          activity: date.reduce((a, b) =>   a + b.time, 0 )
        }
        activityArray.push(newExerciseObject)
        return activityArray.sort((a, b) => b.date > a.date ? -1 : 1)
      })

      //Makes a new array combining matching total activity time and behavior entry for matching dates
      const behaviorActivityArray = []
      const behaviorActivityCorrelation = exerciseEntriesByDate.map(date => {
        this.state.behaviorHistory.map(behavior => {
          if(behavior.date === date[0].date) {
            const behaviorObject = {
            date: date[0].date,
            behavior: behavior.behavior,
            activity: date.reduce((a, b) =>   a + b.time, 0)
          }
          behaviorActivityArray.push(behaviorObject)
          return behaviorActivityArray.sort((a, b) => b.date > a.date ? -1 : 1)
        }
        })
      })



      //Sorts weight history array with most recent weigh in first
      const sortedWeightHistory = this.state.weightHistory
      .sort((a, b) => (b.date > a.date ? 1 : -1))


    return (
      // Dog info and weight input/button
      <div>
        <h1 className="dog-header">{dog.name}</h1>
        <img className="summary-image"
          src={dog.image ? dog.image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2qjTV1Vh1YMdM3hIkSB85WPbxlli89K7HUrvmLufKlatZLKr3"}
          alt="dog"
        />
        <br />

        {/* Calculates necessary resting calorie intake per day */}
        <div className="calorie-estimate">
          <h6>{sortedWeightHistory.length > 0 ? `Estimated Calorie Needs per Day for Maintenance: ${Math.round(calculator.expandedRERCalculator(calculator.basicRERCalculator(sortedWeightHistory[0].weight), this.state.dogs.active, this.state.dogs.neutered, this.state.dogs.age))}` : "" }</h6>
        </div>

      <div className="weight-and-behavior">
      <div className="weight">
        {/* Weight input field */}
        <input
          type="text"
          id="weight"
          ref="weight"
          placeholder="Weight in pounds"
          onChange={this.handleFieldChange}
        />
        <button onClick={this.addWeightEntry} value="weight">
          Weigh In
        </button>
        <h5 className="green">Recent Weigh Ins</h5>
        {/* Sorts weight history by date and displays three most recent weigh ins */}
        {sortedWeightHistory
          .slice(0, 3)
          .map(weight => {
            return (
              <div>
                <p>
                  {weight.date.slice(0, 10)} - {weight.weight} lbs.
                </p>
              </div>
            );
          })}
          </div>



        <div className="behavior">
        <h5 className="green">Behavior Today!</h5>
            <select onChange={this.handleFieldChange} id="behavior">
                <option>Energy Levels</option>
                <option value="5">Very energetic/Unruly</option>
                <option value="4">Energetic</option>
                <option value="3">Normal</option>
                <option value="2">Slightly below normal</option>
                <option value="1">Lazy</option>
            </select>
            <button onClick={this.addBehaviorEntry}>Submit</button>
            {this.state.behaviorMessage ? <p>Behavior Entry Submitted</p> : ""}
            <p>How has your pet been feeling?</p>
        </div>
        </div>

        <div className="analysis">
        {/* Weight over time graph */}
        <div>
        <h5 className="graph-header">Weight Over Time</h5>
        <Label>Weight Over Time</Label>
        <LineChart width={400} height={300} data={weightArray}>
          <Line type="monotone" dataKey="weight" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
        <Legend />
        </LineChart>
        </div>

        {/* Calories over time graph */}
        <div>
        <h5 className="graph-header">Calories Over Time</h5>
        <Label>Calories Over Time</Label>
        <LineChart width={400} height={300} data={calorieArray}>
          <Line type="monotone" dataKey="calories" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
        <Legend />
        </LineChart>
        </div>

        {/* Exercise over time graph */}
        <div>
        <h5 className="graph-header">Activity Over Time</h5>
        <LineChart width={400} height={300} data={activityArray}>
          <Line type="monotone" dataKey="activity" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
        <Legend />
        </LineChart>
        </div>

       {/* Bar graph comparing activity levels to behavior */}
       <div>
       <h5 className="graph-header">Behavior versus Activity</h5>
        <BarChart
        width={500}
        height={300}
        data={behaviorActivityArray}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="behavior" fill="#8884d8" />
        <Bar yAxisId="right" dataKey="activity" fill="#82ca9d" />
      </BarChart>
      </div>
      </div>

        {/* Food and exercise entry section */}
        <section id="entries">
        <div className="summary-headers">
        <div className="food-header">
        <h3>Recent Food Intake</h3>
        <button onClick={() => this.props.history.push("/foods")}>
          Add Food Entry
        </button>
        </div>
        <div className="exercise-header">
        <h3>Recent Activity</h3>
        <button onClick={() => this.props.history.push("/exercises")}>
          Add Exercise Entry
        </button>
        </div>
        </div>

          {/* Food and exercise entries */}
          <div className="summary-entries">
          <div className={this.state.expandedFoodEntries.length > 0 ? "food-entries" : ""}>
          {/* Loops over dates, prints headers/groups food entries together */}
          {foodEntriesByDate.map(date => {
            return (
            <div className="entry-padding entry-border"><h4>
            <Moment format="MM/DD/YYYY" className="green">{date[0].date}</Moment>
          </h4>
          <h5 className="orange">Total Calories: {date.reduce((a, b) => a + (b.food.calories * b.serving), 0 )}</h5>

          {/* Prints out individual entry information */}
           {date.map(entry => {
            return (
              <div className="entry-padding" key={entry.id}>
                <h6>{entry.food.name}</h6>
                <h6>{entry.food.brand}</h6>
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
          )})}
          </div>)
          })}
          </div>


        <div className={this.state.expandedExerciseEntries.length > 0 ? "exercise-entries" : ""}>
          {/* Separates exercise entries by date, prints headers and total time */}
          {exerciseEntriesByDate.map(date => {
            return (
            <div className="entry-padding entry-border" ><h4>
            <Moment format="MM/DD/YYYY" className="green">{date[0].date}</Moment>
          </h4>
          <h6 className="orange">Total time: {date.reduce((a, b) =>   a + b.time, 0 )} Minutes</h6>

            {/* Prints individual exercise entry information */}
           {date.map(entry => {
            return (
              <div key={entry.id} className="entry-padding">
                <h6>{entry.exercise.name}</h6>
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
          </div>
          </div>
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
    )
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
