import React, { Component } from 'react'
import HouseService from '../services/HouseService'
import { Link } from 'react-router-dom'

class Properties extends Component {
  constructor(props){
    super(props)

    this.state = {
      properties: []
    }
  
  }

  fetchProperties = () => {
    HouseService.getProperties()
    .then(
      properties => this.setState({ properties: properties.houses })
    )
  }

  componentDidMount() {
    this.fetchProperties()
  }

  

  render() {
    return(
      <div className="properties">
        <h1 className="prop-title"> Your properties</h1>
        {this.state.properties.map(property => 
        <div className="prop-box" key={property.id}>
          <Link  to={`/home/${property.id}`}>
            <hr></hr>
            <h3>{property.address}</h3>
            <div className="btns-prop">
              <button className="edit-btn"><Link to={`/edit_property/${property.id}/${property.owner}`}>Edit and add photos</Link></button> 
              <button className="edit-btn"><Link to={`/property/${property.id}/${property.owner}`} key={property.id}>delete</Link></button>
            </div>
          
        </Link>
         </div> 
          )}
      </div>
      
    )
  }
}

export default Properties