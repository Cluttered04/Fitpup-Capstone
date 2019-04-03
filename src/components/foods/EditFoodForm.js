import React, {Component} from "react"
import {Form, Button} from "react-bootstrap"
import PropTypes from "prop-types"
import APIManager from "../../modules/APIManager";

class EditFoodForm extends Component {
    state = {
        userId: parseInt(sessionStorage.getItem("credentials")),
        name: "",
        brand: "",
        serving:"",
        calories: ""
        }

        //Handles input changes
        handleFieldChange = evt => {
            const stateToChange = {}
            stateToChange[evt.target.id] = evt.target.value
            this.setState(stateToChange)
        }

        //"PUT" request to submit edited food and redirects back to food list
        editFood = evt => {
            evt.preventDefault()
            const updatedFood = {
                userId: this.state.userId,
                name: this.state.name,
                brand: this.state.brand,
                serving: this.state.serving,
                calories: parseInt(this.state.calories),
                id: this.props.match.params.foodId
            }

            this.props.editAndRetrieveAll("foods", updatedFood, "foods")
            this.props.history.push("/foods")
        }

        //Retrieves food info to populate form fields and sets to state
        componentDidMount() {
            APIManager.getSingleEntry("foods", this.props.match.params.foodId)
            .then(food => {
                this.setState({
                    userId: parseInt(food.userId),
                    brand: food.brand,
                    name: food.name,
                    serving: food.serving,
                    calories: parseInt(food.calories),
                    foodId: food.id
                })
            })
        }

        //Renders Food Edit Form
    render() {
        return(
            <div>
            <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Food Name</Form.Label>
                <Form.Control type="text" value={this.state.name} onChange={this.handleFieldChange} placeholder="Food Name" id="name"/>
                <Form.Text className="text-muted">{this.state.name}
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Brand</Form.Label>
                <Form.Control type="text" onChange={this.handleFieldChange} placeholder="Brand" value={this.state.brand} id="brand"/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Serving Size</Form.Label>
                <Form.Control type="text" placeholder="Serving" value={this.state.serving} onChange={this.handleFieldChange} id="serving"/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Calories per serving</Form.Label>
                <Form.Control type="text" placeholder="Calories" value={this.state.calories} onChange={this.handleFieldChange} id="calories"/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={this.editFood}>
                Submit
            </Button>
        </Form>
        </div>
        )
    }
}


EditFoodForm.propTypes = {
    food: PropTypes.shape ({
        userId: PropTypes.number,
        name: PropTypes.string,
        brand: PropTypes.string,
        serving: PropTypes.string,
        calories: PropTypes.number
    })
}



export default EditFoodForm