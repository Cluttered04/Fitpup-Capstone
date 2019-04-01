import React, {Component} from "react"
import {Modal, Button, Dropdown} from "react-bootstrap"

class AddEntryModal extends Component {
    state = {
        dogId: "",
        date: "",
        collectionId: this.props.collectionItem.id,
        collectionName: this.props.collectionItem.name,
        serving: "",
        time: "",
        dogName: "",
    }






    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    submitModal = evt => {
        evt.preventDefault()
        // if(Number.isInteger(this.state.dogId)){
            if(this.props.match.path === "/foods"){
                const newEntry = {
                    dogId: parseInt(this.state.dogId),
                    date: this.state.date,
                    foodId: parseInt(this.state.collectionId),
                    serving: parseInt(this.state.serving)
                }
                this.props.addNewFoodEntry("foodEntries", newEntry, "foodEntries")
            } else if(this.props.match.path === "/exercises"){
                const newEntry = {
                    dogId: parseInt(this.state.dogId),
                    date: this.state.date,
                    exerciseId: parseInt(this.state.collectionId),
                    time: parseInt(this.state.time)
                }
                this.props.addNewFoodEntry("exerciseEntries", newEntry, "exerciseEntries")
            } this.props.onHide()
        // } else {
        //     alert("Please select a dog")
        // }

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
            {this.props.match.path === "/foods" ? "New Food Entry" : "New Exercise Entry"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <h3>{this.state.collectionName}</h3>
          <form>
          <div className="form-group">
          <label htmlFor="time/serving">{this.props.match.path === "/foods" ? "Servings:" : "Time (In Minutes)"}</label>
            <input
              type="text"
              className="form-control"
              id={this.props.match.path === "/foods" ? "serving" : "time"}
              aria-describedby="emailHelp"
              onChange={this.handleFieldChange} value={this.props.match.path === "/foods" ? this.state.serving : this.state.time}
            />
          </div>
          {/* <label htmlFor="foodOrExercise" id="foodId" value={this.props.match.path === "/foods" ? "foodId" : "exerciseId"}>{this.props.match.path === "/foods" ? this.props.food.name: this.props.exercise.name}</label> */}
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