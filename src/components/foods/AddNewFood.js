import React, {Component} from "react"
import {Form, Button } from "react-bootstrap"


class AddNewFood extends Component {
    state = {
        userId: 2,
        brand: "",
        name: "",
        serving: "",
        calories: ""
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    addNewFood = evt => {
        evt.preventDefault()
        const newFood = {
            userId: this.state.userId,
            brand: this.state.brand,
            name: this.state.name,
            serving: this.state.serving,
            calories: parseInt(this.state.calories)
        }
        this.props.addNewFoodEntry("foods", newFood, "foods")
        this.props.history.push("/food")
    }


    render(){
        return(
        <div>
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Food Name</Form.Label>
                <Form.Control type="text" placeholder="Food Name" onChange={this.handleFieldChange} id="name"/>
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label></Form.Label>
                <Form.Control type="text" onChange={this.handleFieldChange} placeholder="Brand" id="brand"/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Serving Size</Form.Label>
                <Form.Control type="text" placeholder="Serving" onChange={this.handleFieldChange} id="serving"/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Calories per serving</Form.Label>
                <Form.Control type="text" placeholder="Calories" onChange={this.handleFieldChange} id="calories"/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={this.addNewFood}>
                Add Food
            </Button>
        </Form>
        </div>
        )
    }
}

export default AddNewFood