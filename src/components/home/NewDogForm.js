import React, {Component} from "react"
import {Form, Col, Button, Row} from "react-bootstrap"

class NewDogForm extends Component {
    state={
        name: "",
        breed: "",
        neutered: true,
        active: false,
        age: 1,
        userId: 2
        // parseInt(sessionStorage.getItem("activeUser"))
    }

    //Handles text input changes
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    //Handles Age radio changes
    handleOptionChange = evt => {
        this.setState({
            age: evt.target.value
        })
    }

    //Handles Neuter/Intact radio changes
    handleNeuterChange = evt => {
        this.setState({
            neutered: evt.target.value
        })
    }

    //Handles activity level radio changes
    handleActiveChange = evt => {
        this.setState({
            active: evt.target.value
        })
    }

    //Function to convert neuter or spay status and activity level to boolean to save in db
    strToBoolean = value => {
        if (value && typeof value === "string"){
            if(value.toLowerCase() === "true") return true;
            else if(value.toLowerCase() === "false") return false;
        } return value
    }

    //Creates dog object from state and posts to database
    addNewDog = evt => {
        evt.preventDefault()
        const dog = {
            name: this.state.name,
            breed: this.state.breed,
            neutered: this.strToBoolean(this.state.neutered),
            active: this.strToBoolean(this.state.active),
            age: parseInt(this.state.age),
            userId: this.state.userId
        }
        // this.props.addNewDog(dog)
        this.props.addNewEntry("dogs", dog, "dogs")
        .then(this.props.history.push("/"))
    }

    render() {
        return(
            <Form>
  <Form.Group as={Row} >
    <Form.Label column sm={2}>
      Dog Name
    </Form.Label>
    <Col sm={10}>
      <Form.Control type="text" placeholder="Dog Name" onChange={this.handleFieldChange} id="name"/>
    </Col>
  </Form.Group>

  <Form.Group as={Row} >
    <Form.Label column sm={2}>
      Breed
    </Form.Label>
    <Col sm={10}>
      <Form.Control type="text" placeholder="Dog Breed" onChange={this.handleFieldChange} id="breed" />
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
      <Button type="submit" onClick={this.addNewDog}>Add Dog</Button>
    </Col>
  </Form.Group>
</Form>

        )


    }

}

export default NewDogForm;