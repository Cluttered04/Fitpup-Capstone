import React, { Component } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import APIManager from "../../modules/APIManager"
import PropTypes from "prop-types"

class DogEditForm extends Component {
  state = {
    name: "",
    breed: "",
    age: "",
    active: "",
    neutered: "",
    userId: parseInt(sessionStorage.getItem("credentials"))
  };

  //Handles text input changes
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  //Handles age radio changes
  handleOptionChange = evt => {
    this.setState({
      age: evt.target.value
    });
  };

  //Handles Neuter/Intact radio changes
  handleNeuterChange = evt => {
    this.setState({
      neutered: evt.target.value
    });
  };

  //Handles activity level radio changes

  handleActiveChange = evt => {
    this.setState({
      active: evt.target.value
    });
  };



  componentDidMount(){
    APIManager.getSingleEntry("dogs", this.props.match.params.dogId)
    .then(dog =>
        this.setState({
            userId: parseInt(dog.userId),
            name: dog.name,
            breed: dog.breed,
            active: dog.active,
            neutered: dog.neutered,
            age: dog.age
        }))
  }

  updateDog = evt => {
      evt.preventDefault()
      const updatedDog = {
          id: this.props.match.params.dogId,
          userId: this.state.userId,
          name: this.state.name,
          breed: this.state.breed,
          age: this.state.age,
          active: this.state.active,
          neutered: this.state.neutered
      }
      console.log(updatedDog)
      this.props.editEntry("dogs", updatedDog, "dogs")
      this.props.history.push("/")

  }


  render() {
    return (
      <Form>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Dog Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Dog Name"
              onChange={this.handleFieldChange}
              id="name"
              value={this.state.name}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Breed
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Dog Breed"
              onChange={this.handleFieldChange}
              id="breed"
              value={this.state.breed}
            />
          </Col>
        </Form.Group>
        {/* Age radio button */}
        <fieldset>
          <Form.Group as={Row}>
            <Form.Label as="legend" column sm={2}>
              Age
            </Form.Label>
            <Row sm={10}>
              <Form.Check
                type="radio"
                label="0-4 Months"
                name="age"
                id="age"
                value={1}
                onClick={this.handleOptionChange}
                checked={this.state.age ==="1" ? "checked" : ""}

              />
              <Form.Check
                type="radio"
                label="4 Months - Adult"
                name="age"
                id="age"
                value={2}
                onClick={this.handleOptionChange}
                checked={this.state.age === "2" ? "checked" : ""}
              />
              <Form.Check
                type="radio"
                label="Adult"
                name="age"
                id="age"
                value={3}
                onClick={this.handleOptionChange}
                checked={this.state.age === "3" ? "checked" : ""}
              />
            </Row>
          </Form.Group>
        </fieldset>
        {/* Neutered/Intact radio buttons */}
        <fieldset>
          <Form.Group as={Row} controlId="formHorizontalCheck">
            <Form.Label as="legend" column sm={2}>
              Neutered/Spay
            </Form.Label>
            <Form.Check
              type="radio"
              label="Neutered/Spayed"
              name="neutered"
              id="neutered"
              value={true}
              onChange={this.handleNeuterChange}
              checked={this.state.neutered === "true" ? "checked" : ""}
            />
            <Form.Check
              type="radio"
              label="Intact"
              name="neutered"
              id="neutered"
              value={false}
              onChange={this.handleNeuterChange}
              checked={this.state.neutered === "false" ? "checked" : ""}
            />
          </Form.Group>
        </fieldset>
        {/* Activity level radio buttons */}
        <fieldset>
          <Form.Group as={Row} controlId="formHorizontalCheck">
            <Form.Label as="legend" column sm={2}>
              Active/Inactive
            </Form.Label>
            <Form.Check
              type="radio"
              label="Active"
              name="active"
              id="active"
              value={true}
              onChange={this.handleActiveChange}
              checked={this.state.active === "true" ? "checked" : ""}
            />
            <Form.Check
              type="radio"
              label="Inactive"
              name="active"
              id="active"
              value={false}
              onChange={this.handleActiveChange}
              checked={this.state.active === "false" ? "checked" : ""}
            />
          </Form.Group>
        </fieldset>

        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit" onClick={this.updateDog}>
              Save Changes
            </Button>
          </Col>
        </Form.Group>
      </Form>
    );
  }
}

DogEditForm.propTypes = {
    dog : PropTypes.shape ({
        id: PropTypes.number,
        userId: PropTypes.number,
        name: PropTypes.string,
        breed: PropTypes.string,
        age: PropTypes.number,
        active: PropTypes.bool,
        neutered: PropTypes.bool,
    })
}



export default DogEditForm;
