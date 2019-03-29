import React, { Component } from "react";
import DogManager from "../modules/DogManager";
import { Route, Redirect } from "react-router-dom";
import Home from "./home/Home";
import DogEditForm from "./home/DogEditForm";
import NewDogForm from "./home/NewDogForm";
import FoodList from "./foods/FoodList";
import ExerciseList from "./foods/ExerciseList";
import APIManager from "../modules/APIManager";
import AddNewFood from "./foods/AddNewFood";
import AddNewExercise from "./foods/AddNewExercise";
import EditFoodForm from "./foods/EditFoodForm";
import EditExerciseForm from "./foods/EditExerciseForm";

class ApplicationViews extends Component {
  state = {
    activeUser: 2,
    dogs: [],
    exercises: [],
    foods: [],
    behavior: [],
    foodEntries: [],
    exerciseEntries: [],
    weight: []
  };

  componentDidMount() {
    const newState = {};
    APIManager.getAllEntriesByUser("dogs", this.state.activeUser)
      .then(parsedDogs => {
        newState.dogs = parsedDogs;
      })
      .then(() => APIManager.getAllEntries("foods", this.state.activeUser))
      .then(parsedFoods => {
        newState.foods = parsedFoods;
      })
      .then(() => APIManager.getAllEntries("exercises", this.state.activeUser))
      .then(parsedExercises => {
        newState.exercises = parsedExercises;
        this.setState(newState);
      });
  }

  //Handles dog edit/add/delete
  addNewDog = dogObject => {
    return DogManager.addNewDog(dogObject).then(() => {
      DogManager.getAllDogs(this.state.activeUser).then(dogs => {
        this.setState({ dogs: dogs });
      });
    });
  };

  deleteDog = id => {
    return DogManager.deleteDog(id)
      .then(() => DogManager.getAllDogs(this.state.activeUser))
      .then(dogs => this.setState({ dogs: dogs }));
  };

  editDog = dogObject => {
    return DogManager.editDog(dogObject)
      .then(() => DogManager.getAllDogs(this.state.activeUser))
      .then(dogs => this.setState({ dogs: dogs }));
  };

  //Universal add/edit/delete functions
  addNewEntry = (collection, object, stateCollection) => {
    const newState = {};
    return APIManager.addNewEntry(collection, object)
      .then(() =>
        APIManager.getAllEntriesByUser(collection, this.state.activeUser)
      )
      .then(response => {
        newState[stateCollection] = response;
        this.setState(newState);
      });
  };

  addNewFoodEntry = (collection, object, stateCollection) => {
    const newState = {};
    return APIManager.addNewEntry(collection, object)
      .then(() => APIManager.getAllEntries(collection, this.state.activeUser))
      .then(response => {
        newState[stateCollection] = response;
        this.setState(newState);
      });
  };

  deleteEntry = (collection, objectId, stateCollection) => {
    const newState = {};

    return APIManager.deleteEntry(collection, objectId)
      .then(() =>
        APIManager.getAllEntriesByUser(collection, this.state.activeUser)
      )

      .then(response => {
        newState[stateCollection] = response;
        this.setState(newState);
      });
  };

  deleteAndRetrieveAll = (collection, objectId, stateCollection) => {
    const newState = {};

    return APIManager.deleteEntry(collection, objectId)
      .then(() =>
        APIManager.getAllEntries(collection, this.state.activeUser)
      )

      .then(response => {
        newState[stateCollection] = response;
        this.setState(newState);
      });
  };


  editEntry = (collection, object, stateCollection) => {
    const newState = {};
    return APIManager.editEntry(collection, object).then(() =>
      APIManager.getAllEntriesByUser(collection, this.state.activeUser).then(
        response => {
          newState[stateCollection] = response;
          this.setState(newState);
        }
      )
    );
  };

  editAndRetrieveAll = (collection, object, stateCollection) => {
      const newState={}
      return APIManager.editEntry(collection, object).then(() => {
          APIManager.getAllEntries(collection, this.state.activeUser).then(
              response => {
                  newState[stateCollection] = response;
                  this.setState(newState)
              }
          )
      })
  }

  render() {
    return (
      <div className="container-div">
        {/* Routes to home page and dog forms */}
        <Route
          exact
          path="/"
          render={props => {
            return (
              <Home
                deleteDog={this.deleteDog}
                dogs={this.state.dogs}
                deleteEntry={this.deleteEntry}
                {...props}
              />
            );
          }}
        />

        <Route
          exact
          path="/:dogId(\d+)/edit"
          render={props => {
            return (
              <DogEditForm
                {...props}
                dogs={this.state.dogs}
                editEntry={this.editEntry}
              />
            );
          }}
        />

        <Route
          exact
          path="/dogs/new"
          render={props => {
            return (
              <NewDogForm
                {...props}
                dogs={this.state.dogs}
                addNewDog={this.addNewDog}
                addNewEntry={this.addNewEntry}
              />
            );
          }}
        />

        {/* Routes to food and exercise pages */}
        <Route
          exact
          path="/foods"
          render={props => {
            return (
              <FoodList
                {...props}
                foods={this.state.foods}
                dogs={this.state.dogs}
                deleteAndRetrieveAll={this.deleteAndRetrieveAll}
              />
            );
          }}
        />

        <Route
          exact
          path="/foods/new"
          render={props => {
            return (
              <AddNewFood {...props} addNewFoodEntry={this.addNewFoodEntry} />
            );
          }}
        />

        <Route
          exact
          path="/foods/:foodId(\d+)/edit"
          render={props => {
            return (
              <EditFoodForm
                {...props}
                editAndRetrieveAll={this.editAndRetrieveAll}
                foods={this.state.foods}
              />
            );
          }}
        />

        <Route
          exact
          path="/exercises"
          render={props => {
            return (
              <ExerciseList
                {...props}
                exercises={this.state.exercises}
                deleteDog={this.deleteDog}
                dogs={this.state.dogs}
                deleteAndRetrieveAll={this.deleteAndRetrieveAll}
              />
            );
          }}
        />

        <Route
          exact
          path="/exercises/new"
          render={props => {
            return (
              <AddNewExercise
                {...props}
                addNewFoodEntry={this.addNewFoodEntry}
              />
            );
          }}
        />

        <Route
          exact
          path="/exercises/:exerciseId(\d+)/edit"
          render={props => {
            return (
              <EditExerciseForm
                {...props}
                exercises={this.state.exercises}
                editAndRetrieveAll={this.editAndRetrieveAll}
              />
            );
          }}
        />
      </div>
    );
  }
}

export default ApplicationViews;
