import React, { Component } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import DogManager from "../../modules/DogManager"
import PropTypes from "prop-types"

class DogEditForm extends Component {
  state = {
    name: "",
    breed: "",
    age: 1,
    active: true,
    neutered: true,
    activeUser: 2
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

    //Function to convert neuter or spay status and activity level to boolean to save in db
    strToBoolean = value => {
        if (value && typeof value === "string"){
            if(value.toLowerCase() === "true") return true;
            else if(value.toLowerCase() === "false") return false;
        } return value
    }

  componentDidMount(){
    DogManager.getSingleDog(this.props.match.params.dogId)
    .then(dog =>
        this.setState({
            userId: dog.userId,
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
          userId: this.state.activeUser,
          name: this.state.name,
          breed: this.state.breed,
          age: this.state.age,
          active: this.strToBoolean(this.state.active),
          neutered: this.strToBoolean(this.state.neutered)
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
                checked={this.state.age === 1}
              />
              <Form.Check
                type="radio"
                label="4 Months - Adult"
                name="age"
                id="age"
                value={2}
                onClick={this.handleOptionChange}
                checked={this.state.age === 2}
              />
              <Form.Check
                type="radio"
                label="Adult"
                name="age"
                id="age"
                value={3}
                onClick={this.handleOptionChange}
                checked={this.state.age === 3}
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
              checked={this.state.neutered === true}
            />
            <Form.Check
              type="radio"
              label="Intact"
              name="neutered"
              id="neutered"
              value={false}
              onChange={this.handleNeuterChange}
              checked={this.state.neutered === false}
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
              checked={this.state.active === true}
            />
            <Form.Check
              type="radio"
              label="Inactive"
              name="active"
              id="active"
              value={false}
              onChange={this.handleActiveChange}
              checked={this.state.active === false}
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
