import React, {Component} from "react"
import {Modal, Button, Dropdown} from "react-bootstrap"
import APIManager from "../../modules/APIManager"

class EditEntryModal extends Component {
    state = {
        dogId: "",
        date: "",
        collectionId: this.props.collectionItem.id,
        name: "",
        serving: "",
        time: "",
        dogName: "",
        id: this.props.collectionItem.id,
        foodId: "",
        exerciseId: "",
        errorMessage: ""
    }





    // Handles input changes
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    // Submits exercise or food conditionally
    submitModal = evt => {
        evt.preventDefault()
        let errorMessage = ""
            if(this.state.serving){
              if(!isNaN(parseInt(this.state.serving))){
                const updatedEntry = {
                  dogId: parseInt(this.state.dogId),
                  date: this.state.date,
                  id: parseInt(this.state.collectionId),
                  serving: parseInt(this.state.serving),
                  foodId: this.state.foodId

              }
              this.props.editAndRetrieveExpand("foodEntries", updatedEntry, "expandedFoodEntries", this.state.dogId, "food")
              this.props.onHide()
              } else {
                errorMessage = "Please enter a number"
                this.setState({errorMessage : errorMessage})
              }
            } else if(this.state.time){
              if(!isNaN(parseInt(this.state.time))){
                const updatedEntry = {
                    dogId: parseInt(this.state.dogId),
                    date: this.state.date,
                    id: parseInt(this.state.collectionId),
                    time: parseInt(this.state.time),
                    exerciseId: this.state.exerciseId
                }
                this.props.editAndRetrieveExpand("exerciseEntries", updatedEntry, "expandedExerciseEntries", this.state.dogId, "exercise")
                this.props.onHide()
            } else {
              errorMessage = "Please enter a number"
              this.setState({errorMessage : errorMessage})
            }}
    }

    //Mounts single exercise or food entry conditionally
    componentDidMount(){
        if(this.props.collectionItem.serving){
        APIManager.getSingleExpandedEntry("foodEntries", this.props.collectionItem.id, this.props.match.params.dogId, "dog")
        .then(entry => {
            this.setState({
                dogId: entry.dogId,
                dogName: entry.dog.name,
                serving: entry.serving,
                date: entry.date,
                id: entry.id,
                foodId: entry.foodId,
                name: this.props.collectionItem.food.name
        })

    })} else if (this.props.collectionItem.time){
        APIManager.getSingleExpandedEntry("exerciseEntries", this.props.collectionItem.id, this.props.match.params.dogId, "dog")
        .then(entry => {
            this.setState({
                dogId: entry.dogId,
                dogName: entry.dog.name,
                time: entry.time,
                date: entry.date,
                id: entry.id,
                exerciseId: entry.exerciseId,
                name: this.props.collectionItem.exercise.name
            })
        })
    }
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
            {this.state.foodId ? "Edit Food Entry" : "Edit Exercise Entry"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <h3>{this.state.name}</h3>
          <form>
          <div className="form-group">
          <label htmlFor="time/serving">{this.state.foodId ? "Servings:" : "Time (In Minutes)"}</label>
            <input
              type="text"
              className="form-control"
              id={this.state.foodId ? "serving" : "time"}
              aria-describedby="emailHelp"
              onChange={this.handleFieldChange} value={this.state.foodId ? this.state.serving : this.state.time}
            />
            <p>{this.state.errorMessage}</p>
          </div>
            <label htmlFor="dropdown">Dog: </label><br/>
            <label>{this.state.dogName}</label>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              onChange={this.handleFieldChange}
              value={this.state.date}
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