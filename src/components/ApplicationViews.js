import React, { Component } from "react";
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
import DogSummary from "./dogs/DogSummary"
import Callback from "./Authentication/Callback";
import Auth0Client from "./Authentication/Auth.js";
import Info from "./home/Info"
import ImageUploads from "./imageUploads/ImageUploads"

class ApplicationViews extends Component {
  state = {
    activeUser: parseInt(sessionStorage.getItem("credentials")),
    dogs: [],
    exercises: [],
    foods: [],
    behavior: [],
    foodEntries: [],
    exerciseEntries: [],
    weight: []
  };


  mountUponLogin = ()  => {
    const newState = {};
    const userCredentials = parseInt(sessionStorage.getItem("credentials"));
    APIManager.getAllEntriesByUser("dogs", userCredentials)
      .then(parsedDogs => {
        newState.dogs = parsedDogs;
      })
      .then(() => APIManager.getAllEntries("foods", userCredentials))
      .then(parsedFoods => {
        newState.foods = parsedFoods;
      })
      .then(() => APIManager.getAllEntries("exercises", userCredentials))
      .then(parsedExercises => {
        newState.exercises = parsedExercises;
      })
      .then(() => APIManager.getAllEntriesByUser("foodEntries", userCredentials))
      .then((parsedFoodEntries => {
          newState.foodEntries = parsedFoodEntries
      }))
      .then(() => APIManager.getAllEntriesByUser("exerciseEntries", userCredentials))
      .then(parsedExerciseEntries => {
          newState.exerciseEntries = parsedExerciseEntries
          this.setState(newState)
      })

}


  componentDidMount(){
     if (sessionStorage.getItem("credentials") != null) {
      this.mountUponLogin()
    }
  }




  //Universal add/edit/delete functions
  addNewEntry = (collection, object, stateCollection) => {
    const newState = {};
    return APIManager.addNewEntry(collection, object)
      .then(() =>
        APIManager.getAllEntriesByUser(collection, parseInt(sessionStorage.getItem("credentials")))
      )
      .then(response => {
        newState[stateCollection] = response;
        this.setState(newState);
      });
  };

  addNewFoodEntry = (collection, object, stateCollection) => {
    const newState = {};
    return APIManager.addNewEntry(collection, object)
      .then(() => APIManager.getAllEntries(collection, parseInt(sessionStorage.getItem("credentials"))))
      .then(response => {
        newState[stateCollection] = response;
        this.setState(newState);
      });
  };

  deleteEntry = (collection, objectId, stateCollection) => {
    const newState = {};

    return APIManager.deleteEntry(collection, objectId)
      .then(() =>
        APIManager.getAllEntriesByUser(collection, parseInt(sessionStorage.getItem("credentials")))
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
        APIManager.getAllEntries(collection, parseInt(sessionStorage.getItem("credentials")))
      )

      .then(response => {
        newState[stateCollection] = response;
        this.setState(newState);
      });
  };


  editEntry = (collection, object, stateCollection) => {
    const newState = {};
    return APIManager.editEntry(collection, object).then(() =>
      APIManager.getAllEntriesByUser(collection, parseInt(sessionStorage.getItem("credentials")))
      .then(
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
          APIManager.getAllEntries(collection, parseInt(sessionStorage.getItem("credentials"))).then(
              response => {
                newState[stateCollection] = response;
                this.setState(newState);
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
            if (Auth0Client.isAuthenticated()) {
              return (
                <Home
                  dogs={this.state.dogs}
                  deleteEntry={this.deleteEntry}
                  {...props}
                />)
            } else {
              return (
                <Info/>
              );
            }
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
                addNewFoodEntry={this.addNewFoodEntry}
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
                addNewFoodEntry={this.addNewFoodEntry}
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

        <Route exact path="/dogs/:dogId(\d+)/" render={props => {
            return (
                <DogSummary {...props} dogs={this.state.dogs} exerciseEntries={this.state.exerciseEntries} foodEntries={this.state.foodEntries} weight={this.state.weight} behavior={this.state.behavior} addNewEntry={this.addNewEntry} />
            )
        }}/>

        <Route exact path="/dogs/:dogId(\d+)/upload" render={props => {
          return (
            <ImageUploads {...props} dogs={this.state.dogs}/>
          )
        }}/>

        <Route exact path="/callback" render={props => {
          return (
            <Callback {...props} mountUponLogin={this.mountUponLogin}/>
          )}}/>
      </div>
    );
  }
}

export default ApplicationViews;
