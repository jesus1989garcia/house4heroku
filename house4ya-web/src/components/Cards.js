import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import UserService from '../services/UserService'

class Card  extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      
    }
  }


  render() {

  
    return(
      <Link  to={`/home/${this.props.house.id}`} key={this.props.house.id} style={{ textDecoration: 'none' ,color: "black"}}>
        <div className="card">
        <div className="card-left">
          <div className="title-card">
            <h3>{this.props.house.address}</h3>
            <hr style={{ color: "#1eb84c"}} />
            <br/>
          </div> 
              <p>{this.props.house.description}</p>
          </div>
        <div className="card-right">
            <img src={this.props.house.photos[0]} alt={`${this.props.house.address}'s photo `} className="card-image"/>
    <div className="price-tag"><p>{`${this.props.house.price} £`}</p></div>
            <br/>
            <p>{this.props.house.squareMetres} m2</p>
        </div>
        </div>
          
  
</Link>
    )
  
}
}

export default Card

