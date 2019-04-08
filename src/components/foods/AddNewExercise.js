import React, {Component} from "react"
import {Form, Button} from "react-bootstrap"

class AddNewExercise extends Component {
    state = {
        userId: parseInt(sessionStorage.getItem("credentials")),
        name: ""
    }

    //Handles input changes
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }


    // Submits new food entry and returns to exercise list
    addNewFoodEntry = evt => {
        evt.preventDefault()
        const exercise = {
            userId: this.state.userId,
            name: this.state.name
        }
        this.props.addNewFoodEntry("exercises", exercise, "exercises")
        this.props.history.push("/exercises")
    }

    // Exercise form
    render(){
        return(
        <div>
        <h1>Add New Exercise</h1>
        <Form className="food-form">
                <Form.Group controlId="formBasicPassword">
                <Form.Label>Exercise</Form.Label>
                <Form.Control type="text" placeholder="i.e. Fetch" onChange={this.handleFieldChange} id="name"/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={this.addNewFoodEntry}>
                Add Exercise
            </Button>
        </Form>
        </div>
        )
    }
}

export default AddNewExercise