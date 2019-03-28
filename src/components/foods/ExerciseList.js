import React, {Component} from "react"
import PropTypes from "prop-types"
import FoodExerciseCard from "./FoodExerciseCard"
import AddEntryModal from "./AddEntryModal"

class ExerciseList extends Component {
    state = {
        showModal: false
    }

    handleModal = evt => {
        evt.preventDefault()
        this.setState({
            showModal: true
        })
    }

    render(){
        //Function to close modal
        let modalClose = () => this.setState({showModal: false})
        return(
            <div>
                <h1>My Exercises</h1>
                {this.props.exercises.map(exercise => {
                    return <FoodExerciseCard collection={exercise} handleModal={this.handleModal}/>
                })}
                <button onClick={() => this.props.history.push("/exercise/new")}>Add New Exercise</button>
                {this.state.showModal === true ? <AddEntryModal show={this.state.showModal} onHide={modalClose} addNewEntry={this.props.addNewEntry} dogs={this.props.dogs}{...this.props}/> : ""}
            </div>
        )
    }


}


ExerciseList.propTypes = {
    exercises: PropTypes.array.isRequired
}

export default ExerciseList;