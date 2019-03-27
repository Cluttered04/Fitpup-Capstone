import React, {Component} from "react"
import PropTypes from "prop-types"
import {Card} from "react-bootstrap"


class FoodExerciseCard extends Component {



    render() {
        return(
            <Card style={{ width: '18rem' }}>
            <Card.Body onClick={this.props.handleModal}>
                <Card.Title>{this.props.collection.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{this.props.collection.brand ? this.props.collection.brand : ""}</Card.Subtitle>
                <Card.Text>
                {this.props.collection.serving? `Serving Size: ${this.props.collection.serving}`  : ""}
                </Card.Text>
                <Card.Text>
                {this.props.collection.calories? `Calories: ${this.props.collection.calories}` : ""}
                </Card.Text>
            </Card.Body>
            </Card>
        )
    }
}

export default FoodExerciseCard
