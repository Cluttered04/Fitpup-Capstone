import React, {Component} from "react"
import PropTypes from "prop-types"
import FoodExerciseCard from "./FoodExerciseCard"
import AddEntryModal from "./AddEntryModal"

class MyFoodsList extends Component {
    state={
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
        let modalClose = () => this.setState({ showModal: false })
        return(
            <div>
            <h1>My Foods</h1>
            {this.props.foods.map(food => {
                return <FoodExerciseCard collection={food} handleModal={this.handleModal} {...this.props} deleteEntry={this.props.deleteEntry}/>
            })}
            <button onClick={() => this.props.history.push("/food/new")}>Add New Food</button>
            {this.state.showModal === true ? <AddEntryModal dogs={this.props.dogs} show={this.state.showModal} onHide={modalClose} addNewEntry={this.props.addNewEntry} {...this.props}/> : ""}
            </div>
        )
    }
}


MyFoodsList.propTypes = {
    foods: PropTypes.array.isRequired
}

export default MyFoodsList


