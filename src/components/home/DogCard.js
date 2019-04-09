import React, {Component} from "react"


class DogCard extends Component {

    render() {
            return (<div className="dogCards">
             <div className="card dog-card" style={{width: '20rem'}}>
            <div className="card-body">
              <img className="dog-card-image clickable" alt="paw-print" src={this.props.dog.image ? this.props.dog.image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB4CAMAAADheK3eAAAAbFBMVEX///8AAAD09PT6+vrp6emBgYHOzs7k5OQwMDDt7e3T09Pa2trKysrX19fd3d3w8PA9PT0rKyuYmJh1dXVfX18hISFvb2+2trapqakSEhJISEjExMQ2NjaHh4e+vr5QUFCPj48ZGRmgoKBnZ2cTlwcEAAAEV0lEQVRoge1a25aiMBA0gCIOyF2F0QXh//9xR665FGOAnj2z51CPtKTopLtT6bjbbdiwYcOGDRv+ZxhuVedJdJr8ge84P8Hrl0fWIrHRZx32xT085vH0hy3E+c5GHGSreQsGY0xLbPDEjEmOeQFvrEmZS4GYZQZv/CMa2ZWQ2JTGFvw6yMajScd8lQdnn4PNUGxqHCzHQxm8GGylyvygYz6qo/d+GalqS+iY1cGH5PkEttCnIlYCjI1htAc2ZlExW2j0drrNHNnOVMxnNPqtMdnIxD5+lPnSmJRkpmWGs31vTLefZUYRxtLGFENmtJstAxr92dTuBJkyun0aVAuWvZLWLBBzQVe4L1OO+XdgYXsyYhhHDbMD6iq/nazGCQzfrLON1oER7pK7pzp8E9uQmXCyYXVuNiQrBMykIhCUqur1HEVYQEm82wUKgfd6jDaMVTLMj+JYlPSKHuo8UytJtoa4ascI+eyQnW63KqCT1rgcDaMko7p1xfGPBnzMWL6CmB8sHPd4Mbw7l3fOU2JesU2JQZN5/XODfz5WZmmzipYTy5IuHby2svHpuA1+CL8WVadxuN1O+gWtlqYvGNbaGgoWL+X5VQh40ek8mt/fXU1iQ9kDLoPN7HLIE94Yo/7Ia84xD//oMYPNgXvTvdyLSnpjCIyCP+fx668nRZFyf/fO9cUd8IksKga9M0cFmGUvVfhnn48kQ5Iq3uSLHCLA/NZpCaZcU7WOeJB5pshQxJNWYYMCel7vQ/34VEcGowibt/98gAF0xIKHmGcdDpFA0qkmpqoB2KyFhsulVUzggfh9Xg1f/lzMDKdbv/OhNnN0ZxsflUQhazpuFNdJksSVZ0hvo+OIrhxFsp5PKyfiK1RYCtwGnOxUM0LBZ48+26qVd8iBLutKJPB22dvelTiclNoBKjcyx9jEB3UudHH3Qv8kr2RWt5aqxu0wxC5knlN8pfjulhlW1gZZv9aQeZYeFeKo77plaNgWYTehqEs182zJhVKv90FvdUTefp2vWp5yyr+D3S32vheaaA/i0EoeUPaX9JzPny7X5YF9Rg6tyFeCU7/kTwFmsuqcnNDre924RAho+lRSWpSriXFPV0JzuyFUQILLlIniJaE5YZ6HU0pC0G3Gu66KJquNKkizLI0pLlLeJNSI/jRh2DRtfdjrxaC8JfsCbKtizC5Y3wIdtSZB2QDUXuQWdF113MKeBt1VLL6p+AdOO7CP/B2orr4nBdA0aMLbes5nXtMTGzErozqEJD19eE/xDhQFW2moaoGimuhtjjJyguleREyR0uoxRw/rL6xg/0AD5Wrm2fWrw/oytpCYaw8vBLzx/g3M0we89fVzcujj43rwzp573cNQWH/bj0VBeOOFpa2W9tWTDU/D2UN16FQK5Z1EikldguJxmCiM1vVR52EaBnVJ9Aca99mzpnVlfV+PTeMLNLQv2HEeBEUdHX7kf41vQOnIhg0bNmzYsOEX4y8ChTA9LR+ufgAAAABJRU5ErkJggg=="} onClick={() => this.props.history.push(`dogs/${this.props.dog.id}`)}/>
              <h4 className="dog-card-subtitle mb-2 text-muted">{this.props.dog.name}</h4>
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