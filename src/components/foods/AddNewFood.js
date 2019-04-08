import React, {Component} from "react"
import {Form, Button } from "react-bootstrap"


class AddNewFood extends Component {
    state = {
        userId: parseInt(sessionStorage.getItem("credentials")),
        brand: "",
        name: "",
        serving: "",
        calories: "",
        errorMessage: false
    }

    //Handles input changes
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    //Submits new food and returns to foods list
    addNewFood = evt => {
        evt.preventDefault()
        if(!isNaN(parseInt(this.state.calories))){
        const newFood = {
            userId: this.state.userId,
            brand: this.state.brand,
            name: this.state.name,
            serving: this.state.serving,
            calories: parseInt(this.state.calories)
        }
        this.props.addNewFoodEntry("foods", newFood, "foods")
        this.props.history.push("/foods")
    } else {
        this.setState({errorMessage: true})
    }
}

    //Renders new food form
    render(){
        return(
        <div>
        <h1>Add New Food</h1>
        <Form className="food-form">
            <Form.Group>
                <Form.Label>Food Name</Form.Label>
                <Form.Control type="text" placeholder="Food Name" onChange={this.handleFieldChange} id="name"/>
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label>Brand</Form.Label>
                <Form.Control type="text" onChange={this.handleFieldChange} placeholder="Brand" id="brand"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Serving Size</Form.Label>
                <Form.Control type="text" placeholder="Serving" onChange={this.handleFieldChange} id="serving"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Calories per serving</Form.Label>
                <Form.Control type="text" placeholder="Calories" onChange={this.handleFieldChange} id="calories"/>
                {this.state.errorMessage ? <p>Please enter a number</p> : ""}
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