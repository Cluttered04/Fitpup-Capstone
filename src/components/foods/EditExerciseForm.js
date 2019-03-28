import React, {Component} from "react"
import {Form, Button} from "react-bootstrap"
import PropTypes from "prop-types"

class EditExerciseForm extends Component {


    render() {
        return(
            <div>
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

EditExerciseForm.propTypes = {
    exercise: PropTypes.shape({
        userId: PropTypes.number,
        name: PropTypes.string
    })
}

export default EditExerciseForm
