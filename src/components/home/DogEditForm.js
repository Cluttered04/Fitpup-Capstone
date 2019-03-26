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
    activeUser: 1
  };

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
      neuter: evt.target.value
    });
  };

  //Handles activity level radio changes

  handleActiveChange = evt => {
    this.setState({
      active: evt.target.value
    });
  };

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
      const updatedDog = {
          id: this.props.match.params.dogId,
          userId: this.state.activeUser,
          name: this.state.name,
          breed: this.state.breed,
          age: this.state.age,
          active: this.state.active,
          neutered: this.state.neutered

      }
      this.props.editDog(updatedDog)
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
                onChange={this.handleOptionChange}
              />
              <Form.Check
                type="radio"
                label="4 Months - Adult"
                name="age"
                id="age"
                value={2}
                onChange={this.handleOptionChange}
              />
              <Form.Check
                type="radio"
                label="Adult"
                name="age"
                id="age"
                value={3}
                onChange={this.handleOptionChange}
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
            />
            <Form.Check
              type="radio"
              label="Intact"
              name="neutered"
              id="neutered"
              value={false}
              onChange={this.handleNeuterChange}
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
            />
            <Form.Check
              type="radio"
              label="Inactive"
              name="active"
              id="active"
              value={false}
              onChange={this.handleActiveChange}
            />
          </Form.Group>
        </fieldset>

        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit" onClick={this.addNewDog}>
              Add Dog
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
