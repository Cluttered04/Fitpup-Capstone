import React, {Component} from "react"
import {Modal, Button} from "react-bootstrap"

class AddEntryModal extends Component {
    state = {
        dogId: "",
        date: "",
        foodId: "",
        serving: "",
        exerciseId: "",
        time: ""
    }






    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    submitModal = evt => {
        evt.preventDefault()
        if(this.props.match.path === "/food"){
            const newEntry = {
                dogId: parseInt(this.state.dogId),
                date: this.state.date,
                foodId: parseInt(this.state.foodId),
                serving: parseInt(this.state.serving)
            }
            this.props.addNewEntry("foodEntries", newEntry, "foodEntries")
        } else if(this.props.match.path === "/exercise"){
            const newEntry = {
                dogId: parseInt(this.state.dogId),
                date: this.state.date,
                exerciseId: parseInt(this.state.exerciseId),
                time: parseInt(this.state.time)
            }
            this.props.addNewEntry("exerciseEntries", newEntry, "exerciseEntries")
        } this.props.onHide()
    }





    render() {
        return(

            <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <h3>{this.props.match.path === "/food" ? this.props.food : this.props.exercise}</h3>
          <form>
          <div className="form-group">

            <label htmlFor="taskName">{this.props.match.path === "/food" ? "New Food Entry" : "New Exercise Entry"}</label>
            <input
              type="text"
              className="form-control"
              id=""
              aria-describedby="emailHelp"
              onChange={this.handleFieldChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Due Date</label>
            <input
              type="date"
              className="form-control"
              id="newDueDate"
              onChange={this.handleFieldChange}
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

export default AddEntryModal