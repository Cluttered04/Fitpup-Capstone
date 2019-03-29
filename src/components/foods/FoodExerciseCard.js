import React, {Component} from "react"
import PropTypes from "prop-types"
import {Card} from "react-bootstrap"


class FoodExerciseCard extends Component {


    render() {
        const foodStatus = this.props.match.path
        const collectionParam = this.props.match.path.split("/")[1]
        return(
            <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title onClick={this.props.handleModal}>{this.props.collection.name}</Card.Title>
                <Card.Subtitle onClick={this.props.handleModal} className="mb-2 text-muted">{this.props.collection.brand ? this.props.collection.brand : ""}</Card.Subtitle>
                <Card.Text>
                {this.props.collection.serving? `Serving Size: ${this.props.collection.serving}`  : ""}
                </Card.Text>
                <Card.Text>
                {this.props.collection.calories? `Calories: ${this.props.collection.calories}` : ""}
                </Card.Text>
                {this.props.collection.userId !== 1 ? <button onClick={() => this.props.history.push(`${foodStatus}/${this.props.collection.id}/edit`)}>Edit</button> : ""}
                {this.props.collection.userId !== 1 ? <button onClick={() => this.props.deleteEntry(collectionParam, this.props.collection.id, collectionParam)}>Delete</button> : ""}
            </Card.Body>
            </Card>
        )
    }
}

export default FoodExerciseCard
