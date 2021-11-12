import React, { Component } from 'react'
import HouseService from '../services/HouseService'
import UserService from '../services/UserService'
import WrappedMap from './MapRender'

class detailHouse extends Component {
  constructor(props){
    super(props)
    this.state = {
      house: ''
    }
  }
    
    

    fetchHouse = () => {
      HouseService.getHouseDetail(this.props.match.params.id)
      .then(ResHouse => {
        this.setState({ house: ResHouse })
      })
    }

    componentDidMount() {
      this.fetchHouse()
    }

    handleFavourite = () => {
      UserService.addFavs(this.props.match.params.id)
    }

    deleteFav = () => {
      UserService.deleteFav(this.props.match.params.id)
      
    }
    

  

  render() {
    const estatu = [this.state.house]
    
    return (
      <div className="detail-house">
        <hr width="50%"></hr>
        <div>
          <p style={{color:"white", margin:"3%"}}>{this.state.house.price}£</p>
        </div>
        <div>
          <div>
            { estatu.filter(casa => casa.id === this.props.match.params.id).map(hous => <div className="gallery">{hous.photos.map(photo =>
              
                <img src={photo} alt="ima" className="gal-img"></img>
                
                 )}</div>) }

          </div>
            
        </div>
        <div className="text-box-detail">
          <h3>{this.state.house.address}</h3>
          <p>{this.state.house.description}</p>
        </div>
        <div>
          <h4 style={{color:"white", margin:"3%"}}>contact: 655254254</h4>
        </div>
        <div className="btns-detail">
          <button onClick={this.handleFavourite} >add favs</button>
          <button onClick={this.deleteFav}> delete favourite</button>
        </div>
        <div className="map-detail">
            <WrappedMap lat={this.state.house.latitude} lng={this.state.house.longitude}></WrappedMap>
            
        </div>
       

      </div>
    )
  }
}

export default detailHouse