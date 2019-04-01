import React, { Component } from "react";
import PropTypes from "prop-types";
import FoodExerciseCard from "./FoodExerciseCard";
import AddEntryModal from "./AddEntryModal";

class MyFoodsList extends Component {
  state = {
    showModal: false,
    activeItemName: "",
    activeItemId: null,
    foodItem: {}
  };

  handleModal = (food) => {
     this.setState({
        showModal: true,
        foodItem: food,
    });
  };

  render() {
    //Function to close modal
    let modalClose = () => this.setState({ showModal: false });
    return (
      <div>
        <h1>My Foods</h1>
        {this.props.foods.map(food => {
          return (
            <div>
              <FoodExerciseCard
                collection={food}
                handleModal={this.handleModal}
                key={food.id}
                {...this.props}
              />
            </div>
          );
        })}
        <button onClick={() => this.props.history.push("/foods/new")}>
          Add New Food
        </button>
        {this.state.showModal === true ? (
          <AddEntryModal
            dogs={this.props.dogs}
            show={this.state.showModal}
            onHide={modalClose}
            addNewFoodEntry={this.props.addNewFoodEntry}
            {...this.props} collectionItem={this.state.foodItem}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

MyFoodsList.propTypes = {
  foods: PropTypes.array.isRequired
};

export default MyFoodsList;
