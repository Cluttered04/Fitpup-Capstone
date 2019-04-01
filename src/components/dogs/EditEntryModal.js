import React, {Component} from "react"
import {Modal, Button, Dropdown} from "react-bootstrap"

class EditEntryModal extends Component {
    state = {
        dogId: "",
        date: "",
        collectionId: this.props.collectionItem.id,
        collectionName: this.props.collectionItem.name,
        serving: "",
        time: "",
        dogName: "",
    }





    // Handles input changes
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    // Submits exercise or food conditionally, returns alert if dog is not selected
    submitModal = evt => {
        evt.preventDefault()
        if(Number.isInteger(parseInt(this.state.dogId))){
            if(this.props.collectionItem.serving){
                const updatedEntry = {
                    dogId: parseInt(this.state.dogId),
                    date: this.state.date,
                    foodId: parseInt(this.state.collectionId),
                    serving: parseInt(this.state.serving)
                }
                this.props.editAndRetrieveAll("foodEntries", updatedEntry, "foodEntries")
            } else if(this.props.collectionItem.time){
                const updatedEntry = {
                    dogId: parseInt(this.state.dogId),
                    date: this.state.date,
                    exerciseId: parseInt(this.state.collectionId),
                    time: parseInt(this.state.time)
                }
                this.props.editAndRetrieveAll("exerciseEntries", updatedEntry, "exerciseEntries")
            } this.props.onHide()
        } else {
            alert("Please select a dog")
        }

    }





    render() {
        console.log(this.props.collectionItem)
        return(

            <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            {this.props.collectionItem.serving ? "Edit Food Entry" : "Edit Exercise Entry"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <h3>{this.state.collectionName}</h3>
          <form>
          <div className="form-group">
          <label htmlFor="time/serving">{this.props.collectionItem.serving ? "Servings:" : "Time (In Minutes)"}</label>
            <input
              type="text"
              className="form-control"
              id={this.props.collectionItem.serving ? "serving" : "time"}
              aria-describedby="emailHelp"
              onChange={this.handleFieldChange} value={this.props.collectionItem.serving ? this.props.collectionItem.serving : this.props.collectionItem.time}
            />
          </div>
            <label htmlFor="dropdown">Dog: </label><br/>
            <select onChange={this.handleFieldChange} id="dogId">
                <option>Select a dog</option>
                {this.props.dogs.map(dog => {
                   return <option id="dogId" name="dogId" value={dog.id} key={dog.id}>{dog.name}</option>
                })}
            </select>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              onChange={this.handleFieldChange}
              value={this.props.collectionItem.date}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.submitModal}

          >
            Submit
          </button>
        </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
        )
    }
}

export default EditEntryModal