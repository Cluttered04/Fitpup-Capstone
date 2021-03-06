import React, { Component } from "react";
import PropTypes from "prop-types";
import FoodExerciseCard from "./FoodExerciseCard";
import AddEntryModal from "./AddEntryModal";
import measuring from "../images/measuring-tape-image.jpg"

class MyFoodsList extends Component {
  state = {
    showModal: false,
    activeItemName: "",
    activeItemId: null,
    foodItem: {},
    search: ""
  };

  //Handles modal visibility and sets specific entry to state for editing
  handleModal = food => {
    this.setState({
      showModal: true,
      foodItem: food
    });
  };

  //Handles search bar field change
  handleFieldChange = evt => {
    evt.preventDefault();
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  render() {
    //Function to close modal
    let modalClose = () => this.setState({ showModal: false });

    //Search bar functionality
    let filteredFoods = this.props.foods.filter(food => {
      return (
        food.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
          -1 || food.brand.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      );
    });


    return (
      <div>
         <div className="background-image-list">
         {/* <img src={measuring} style={{ width: '100vw'}}/> */}

        <h1 className="h1-list">My Foods</h1>
        </div>
        {/* Search bar */}

        <div className="search-bar">
        <input
          id="search"
          value={this.state.search}
          placeholder="Search Food Name or Brand"
          onChange={this.handleFieldChange}
        />
        <br/>
        <button onClick={() => this.props.history.push("/foods/new")}>
          Add New Food
        </button>
        </div>
        {/* Maps through food list and returns cards */}
        <div className="food-list">
        {filteredFoods.map(food => {
          return (
              <FoodExerciseCard
                collection={food}
                handleModal={this.handleModal}
                key={food.id}
                {...this.props}
              />
          );
        })}
        </div>

        {/* Conditionally renders modal on button click */}
        {this.state.showModal === true ? (
          <AddEntryModal
            dogs={this.props.dogs}
            show={this.state.showModal}
            onHide={modalClose}
            addNewFoodEntry={this.props.addNewFoodEntry}
            {...this.props}
            collectionItem={this.state.foodItem}
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
