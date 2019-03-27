import React, {Component} from "react"
import PropTypes from "prop-types"
import FoodExerciseCard from "./FoodExerciseCard"

class MyFoodsList extends Component {

    render(){
        return(
            <div>
            <h1>My Foods</h1>
            {this.props.foods.map(food => {
                return <FoodExerciseCard collection={food}/>
            })}
            <button>Add New Food</button>
            </div>
        )
    }
}


MyFoodsList.propTypes = {
    foods: PropTypes.array.isRequired
}

export default MyFoodsList


