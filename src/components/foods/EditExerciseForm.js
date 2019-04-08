import React, {Component} from "react"
import {Form, Button} from "react-bootstrap"
import PropTypes from "prop-types"
import APIManager from "../../modules/APIManager";

class EditExerciseForm extends Component {
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

    //PUT request to edit exercise and redirect back to exercise list
    editExercise = evt => {
        evt.preventDefault()
        const updatedExercise = {
            id: this.props.match.params.exerciseId,
            userId: this.state.userId,
            name: this.state.name
        }

        this.props.editAndRetrieveAll("exercises", updatedExercise, "exercises")
        this.props.history.push("/exercises")
    }

    //Retrieves exercise info to populate form fields and sets to state
    componentDidMount() {
        APIManager.getSingleEntry("exercises", this.props.match.params.exerciseId)
            .then(exercise => {
                this.setState({
                    id: exercise.id,
                    name: exercise.name,
                    userId: parseInt(exercise.userId)
                })
            })



    }

    render() {
        return(
            <div>
            <h1>Edit Exercise Details</h1>
            <Form className="food-form">
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Exercise</Form.Label>
                <Form.Control type="text" value={this.state.name} placeholder="Exercise Type" onChange={this.handleFieldChange} id="name"/>
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={this.editExercise}>
                Add Exercise
            </Button>
        </Form>
        </div>
        )
    }
}

EditExerciseForm.propTypes = {
    exercise: PropTypes.shape({
        userId: PropTypes.number,
        name: PropTypes.string
    })
}

export default EditExerciseForm
