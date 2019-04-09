import React, {Component} from "react"
import pawprint from "../images/pawprint.png"


class DogCard extends Component {

    render() {
            return (<div className="dogCards">
             <div className="card dog-card" style={{width: '20rem'}}>
            <div className="card-body">
              <img className="dog-card-image clickable" alt="paw-print" src={this.props.dog.image ? this.props.dog.image : pawprint} onClick={() => this.props.history.push(`dogs/${this.props.dog.id}`)}/>
              <h4 className="dog-card-subtitle mb-2 text-muted green">{this.props.dog.name}</h4>
              <h5 className="dog-card-text">
                {this.props.dog.breed}
              </h5>
            </div>
            <button onClick={()=> {this.props.history.push(`/${this.props.dog.id}/edit`)}}>Edit</button>
            <button onClick={() => this.props.deleteEntry("dogs", this.props.dog.id, "dogs")}
            >Delete</button>
          </div>
          </div>
        )}}



export default DogCard;