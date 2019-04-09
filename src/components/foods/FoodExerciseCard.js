import React, {Component} from "react"
import PropTypes from "prop-types"
import {Card} from "react-bootstrap"
import AddEntryModal from "./AddEntryModal"


class FoodExerciseCard extends Component {


    render() {
        const foodStatus = this.props.match.path
        return(
            <Card style={{ width: '12rem'}} className="food-card">
            <Card.Body>
                <Card.Title  className="clickable green" onClick={() => this.props.handleModal(this.props.collection)} value={this.props.collection.id}>{this.props.collection.name}</Card.Title>
                <Card.Subtitle className="clickable" onClick={this.props.handleModal} className="mb-2 text-muted">{this.props.collection.brand ? this.props.collection.brand : ""}</Card.Subtitle>
                <Card.Text>
                {this.props.collection.serving? `Serving Size: ${this.props.collection.serving}`  : ""}
                </Card.Text>
                <Card.Text className="orange">
                {this.props.collection.calories? `Calories: ${this.props.collection.calories}` : ""}
                </Card.Text>
                {this.props.collection.userId !== 1 ? <button onClick={() => this.props.history.push(`${foodStatus}/${this.props.collection.id}/edit`)}>Edit</button> : ""}
            </Card.Body>
            </Card>
        )
    }
}

export default FoodExerciseCard
