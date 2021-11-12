import React, { Component } from 'react'
import HouseService from '../services/HouseService'
import { withRouter, useHistory, Link } from 'react-router-dom'

class EditHouse extends Component {
  constructor(props){
    super(props)
    this.state = {
      house : {
        address: '',
        squareMetres: '',
        description: '',
        photos : ''
        
        
      }
    }
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    HouseService.editHouse(this.props.match.params.owner, this.props.match.params.house, this.state.house)
  }

  

  handleFormPhotosSubmit = (event) => {
    event.preventDefault()
    HouseService.editHousePhotos(this.props.match.params.owner, this.props.match.params.house, this.state.house.photos)
  }

  handleChange = (event) => {
    const {name, value, files} = event.target
    this.setState({
      house: {
        ...this.state.house,
      [name]: files && files ? files : value
      }
      
    })
  
  }

  goHome = (e) => {
    setTimeout(() => this.props.history.push("/home"), 1000 )
  }

  


  componentDidMount() {
    HouseService.getHouseDetail(this.props.match.params.house)
    .then(resHouse => this.setState({
      house: { ...this.state.house,
              address: resHouse.address,
              squareMetres: resHouse.squareMetres,
              description: resHouse.description,
              photos: resHouse.photos
      }
    }))
  }

  render() {
    return(
      <withRouter>
         <div className="edit-house">
        <h2>Edit your property</h2>
        <form onSubmit={this.handleFormSubmit} id='form-edit-house'>
          <input name='address' type='text'  placeholder='adress' onChange={(e) => this.handleChange(e)} value={this.state.house.address} ></input>
          <input name='squareMetres' type='number' placeholder='size' onChange={(e) => this.handleChange(e)} ></input>
          <textarea rows="7" name='description' type='textbox' placeholder='write a description'onChange={(e) => this.handleChange(e)} value={this.state.house.description}  ></textarea>
          <input  name='interested' type='hidden' value={this.state.house.interested} onChange={(e) => this.handleChange(e)} />
          <button type='submit' onClick={this.goHome}>update</button>
          <Link to={`/map/${this.props.match.params.owner}/${this.props.match.params.house}`} className="address-link">add address </Link>
        </form>
    
          <form onSubmit={this.handleFormPhotosSubmit} id="form-edit-images">
            <input name='photos'  type='file' multiple /*form='form-house'*/  placeholder='search image'  onChange={(e) => this.handleChange(e)} ></input>
            <button type='submit' >upload photos</button>
          </form>
      <h4>You have  {this.state.house.photos.length} photos</h4>
          
             
      
        
      </div>
      </withRouter>
     
    )
  }
}

export default EditHouse