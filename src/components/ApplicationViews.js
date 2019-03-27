import React, {Component} from "react"
import DogManager from "../modules/DogManager"
import { homedir } from "os";
import {Route, Redirect} from "react-router-dom"
import Home from "./home/Home"
import DogEditForm from "./home/DogEditForm"
import NewDogForm from "./home/NewDogForm"
import FoodList from "./foods/FoodList"
import ExerciseList from "./foods/ExerciseList"
import APIManager from "../modules/APIManager"



class ApplicationViews extends Component {
    state = {
        activeUser: 1,
        dogs:[],
        exercises: [],
        foods: [],
        behavior: [],
        foodEntries: [],
        exerciseEntries: [],
        weight: [],
    };

    componentDidMount() {
        const newState = {};
        APIManager.getAllEntriesbyUser("dogs",this.state.activeUser).then(parsedDogs => {
            newState.dogs = parsedDogs;
        }).then(APIManager.getAllEntriesbyUser("foods", this.state.activeUser).then(parsedFoods => {
            newState.foods = parsedFoods
        })).then(APIManager.getAllEntriesbyUser("exercises", this.state.activeUser)).then(parsedExercises => {
            newState.exercises = parsedExercises
            this.setState(newState)
        })
    }


//Handles dog edit/add/delete
addNewDog = (dogObject) => {
    return DogManager.addNewDog(dogObject).then(() => {
        DogManager.getAllDogs(this.state.activeUser).then(dogs => {
            this.setState({dogs:dogs})
        })
    })
}

deleteDog = (id) => {
    return DogManager.deleteDog(id).then(() => DogManager.getAllDogs(this.state.activeUser)).then(dogs => this.setState({dogs: dogs}))

}

editDog = (dogObject) => {
    return DogManager.editDog(dogObject).then(() => DogManager.getAllDogs(this.state.activeUser)).then(dogs => this.setState({dogs: dogs}))
}



addNewEntry = (collection, object, stateCollection) => {
    const newState = {}

    return APIManager.addNewEntry(collection, object).then(() => APIManager.getAllEntriesByUser(collection, this.state.activeUser)).then(response => {
        newState[stateCollection] = response
        this.setState(newState)
     })
}

deleteEntry = (collection, objectId, stateCollection) => {
    const newState = {}

    return APIManager.deleteEntry(collection, objectId).then(() =>
    APIManager.getAllEntriesByUser(collection, this.state.activeUser).then(response => {
        newState[stateCollection] = response
        this.setState(newState)
    })
    )
}

editEntry = (collection, object, stateCollection) => {
    const newState ={}
    return APIManager.editEntry(collection, object).then(() => APIManager.getAllEntriesByUser(collection, this.state.activeUser).then(response => {
        newState[stateCollection] = response
        this.setState(newState)
    })
    )
}




render(){
    return(
        <div className="container-div">

            {/* Routes to home page and dog forms */}
            <Route exact path="/" render={props=> {
                return (
                    <Home deleteDog={this.deleteDog} dogs={this.state.dogs} {...props} />

                )}} />

            <Route exact path="/:dogId(\d+)/edit" render={props => {
                return (
                    <DogEditForm {...props} dogs={this.state.dogs} editDog = {this.editDog} />
                )
            }}/>

            <Route exact path="/dogs/new" render={props => {
                return (
                    <NewDogForm {...props} dogs={this.state.dogs} addNewDog={this.addNewDog}/>
                )
            }}/>

            <Route exact path="/food" render={props => {
                return(
                    <FoodList {...props} foods={this.state.foods}/>
                )
            }}/>

            <Route exact path="/exercise" render={props => {
                return(
                    <ExerciseList {...props} exercises={this.state.exercises}/>
                )
            }} />



        </div>



    )
}
}

export default ApplicationViews