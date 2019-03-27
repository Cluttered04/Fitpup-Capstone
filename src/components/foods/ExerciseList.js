import React, {Component} from "react"
import PropTypes from "prop-types"
import FoodExerciseCard from "./FoodExerciseCard"

class ExerciseList extends Component {
    render(){
        return(
            <div>
                <h1>My Exercises</h1>
                {this.props.exercises.map(exercise => {
                    return <FoodExerciseCard collection={exercise}/>
                })}
                <button>Add New Exercise</button>
            </div>
        )
    }


}


ExerciseList.propTypes = {
    exercises: PropTypes.array.isRequired
}
export default ExerciseList;