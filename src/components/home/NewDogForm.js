import React, {Component} from "react"
import {Form, Col, Button, Row} from "react-bootstrap"
import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'avgepfaf';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/doakhgbvc/upload';

class NewDogForm extends Component {
    state={
        name: "",
        breed: "",
        neutered: true,
        active: false,
        age: 1,
        userId: parseInt(sessionStorage.getItem("credentials")),
        uploadedFileCloudinaryUrl: ""
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


    //Creates dog object from state and posts to database
    addNewDog = evt => {
        evt.preventDefault()
        const dog = {
            name: this.state.name,
            breed: this.state.breed,
            neutered: this.state.neutered,
            active: this.state.active,
            age: this.state.age,
            userId: this.state.userId,
            image: this.state.uploadedFileCloudinaryUrl
        }
        this.props.addNewEntry("dogs", dog, "dogs")
        .then(this.props.history.push("/"))
    }


    //Handles image drop
    onImageDrop(files) {
      this.setState({
        uploadedFile: files[0]
      });

      this.handleImageUpload(files[0]);
    }



      //Handles image uploading
      handleImageUpload(file) {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

        upload.end((err, response) => {
          if (err) {
            console.error(err);
          }

          if (response.body.secure_url !== '') {
            this.setState({
              uploadedFileCloudinaryUrl: response.body.secure_url
            });
          }
        });
      }




    render() {
        return(
          <div>
            <h1>Enter Dog Details</h1>
            <Form className="dog-form">
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
      <Dropzone
          onDrop={this.onImageDrop.bind(this)}
          accept="image/*"
          multiple={false}>
            {({getRootProps, getInputProps}) => {
              return (
                <div
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <div className="boxed">
                  {
                  <p>Drag a picture of your dog here to upload!</p>
                  }
                  </div>
                </div>
             )
            }}
      </Dropzone>
      <div>
        <div className="FileUpload">
          ...
        </div>

        <div>
          {this.state.uploadedFileCloudinaryUrl === '' ? null :
          <div>
            <p>{this.state.uploadedFile.name}</p>
            <img src={this.state.uploadedFileCloudinaryUrl} />
          </div>}
        </div>
      </div>
</div>

        )


    }

  }

export default NewDogForm;