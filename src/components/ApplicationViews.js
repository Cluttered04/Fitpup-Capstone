import React, {Component} from "react"
import DogManager from "../modules/DogManager"
import { homedir } from "os";
import {Route, Redirect} from "react-router-dom"
import Home from "./home/Home"
import DogEditForm from "./home/DogEditForm"
import NewDogForm from "./home/NewDogForm"


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
        DogManager.getAllDogs(this.state.activeUser).then(parsedDogs => {
            newState.dogs = parsedDogs;
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



render(){
    return(
        <div className="container-div">

            {/* Routes to home page and dog forms */}
            <Route exact path="/" render={props=> {
                return (
                    <Home deleteDog={this.deleteDog} dogs={this.state.dogs} {...props}/>

                )}} />

            <Route exact path="/:dogId(\d+)/edit" render={props => {
                return (
                    <DogEditForm {...props} dogs={this.state.dogs} EditDog = {this.editDog} />
                )
            }}/>

            <Route exact path="/dogs/new" render={props => {
                return (
                    <NewDogForm {...props} dogs={this.state.dogs} addNewDog={this.addNewDog}/>
                )
            }}/>



        </div>



    )
}
}

export default ApplicationViews