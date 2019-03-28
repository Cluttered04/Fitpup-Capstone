import React, {Component} from "react"
import {Form, Button} from "react-bootstrap"

class AddNewExercise extends Component {
    state = {
        userId: 2,
        name: ""
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = [evt.target.value]
        this.setState(stateToChange)
    }

    addNewFoodEntry = evt => {
        evt.preventDefault()
        const exercise = {
            userId: this.state.userId,
            name: this.state.name
        }
        this.props.addNewFoodEntry("exercises", exercise, "exercises")
        this.props.history.push("/exercise")
    }

    render(){
        return(
            <div>
        <h1>Add New Exercise</h1>
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Exercise</Form.Label>
                <Form.Control type="text" placeholder="Exercise Type" onChange={this.handleFieldChange} id="name"/>
                <Form.Text className="text-muted">
                </Form.Text>
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