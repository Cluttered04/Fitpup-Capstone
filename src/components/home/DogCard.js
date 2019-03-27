import React, {Component} from "react"


class DogCard extends Component {


    render() {
            return (<div className="dogCards">
             <div className="card" style={{width: '18rem'}}>
            <div className="card-body">
              {/* <img class="card-image" alt="paw-print" src="https://www.sidewalkdog.com/wp-content/uploads/2018/04/Logo-Placeholder-Sidewalk-Dog-2.jpg"/> */}
              <h4 className="card-subtitle mb-2 text-muted">{this.props.dog.name}</h4>
              <h5 className="card-text">
                {this.props.dog.breed}
              </h5>
            </div>
            <button onClick={()=> {this.props.history.push(`/${this.props.dog.id}/edit`)}}>Edit</button><button onClick={() => this.props.deleteDog(this.props.dog.id)}>Delete</button>
          </div>
          </div>
        )}}



export default DogCard;