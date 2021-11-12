import React, { Component } from 'react'
import UserService from '../services/UserService'
import { Link } from 'react-router-dom'
import {faHome} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Favourites extends Component {
  constructor(props){
    super(props)
    this.state = {
      favourites: [],
      deletingTarget: ''
    }
  }

  fetchFavourites = () => {
    UserService.listFavs()
    .then(favourites => 
      this.setState({
         favourites: favourites
      })
    )
  }

  componentDidMount() {
    this.fetchFavourites()
  }

  
  
  

  render() {
    return(
      <div className="properties">
        <div className="prop-box"> 
          <h1 className="prop-title">Your favourites</h1>
          {this.state.favourites.map(fav =>
          <div>
            <hr style={{color:"white"}} />
            <Link to={`/home/${fav.id}`} className="fav-address"> 
              <FontAwesomeIcon icon={faHome} className="house-icon"></FontAwesomeIcon>
              <h3 >{fav.address}</h3>
            </Link>
          </div>
        )}
        </div>
        
      </div>
      

    )
  }
}

export default Favourites
