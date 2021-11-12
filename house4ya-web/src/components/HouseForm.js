import React , { Component } from 'react'
import HouseService from '../services/HouseService'

class HouseForm extends Component {
  constructor(props){
    super(props)

    this.state = {
     
      address: '',
      description: '',
      squareMetres: '',
      propertyType: 'flat',
      owner: '',
      interested: []
     
        
      
      
    }
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    HouseService.createHouses(this.state)
    //TODO
  }

  handleChange = (event) => {
    let {name, value } = event.target
    this.setState({ 
      
        ...this.state.house,
      [name]: value
      
       })
  }

  goProperties =(e) => {
    setTimeout(() => {
      this.props.history.push('/properties')
    }, 2000);
  }

  render() {
    return(
      <div id="form-house" >
        <hr width="50%"></hr>
        <form onSubmit={this.handleFormSubmit} >
          <input name='address' type='text' placeholder='address' value={this.state.address} onChange={(e) => this.handleChange(e)} />
          <textarea rows="12" name='description' type='text' placeholder='write a description here...' value={this.state.description} onChange={ (e) => this.handleChange(e) } />
          <select name='propertyType' value={this.state.value} onChange={(e) => this.handleChange(e)} >
            <option value="house">House</option>
            <option value="appartament">Appartament</option>
            <option value="flat">Flat</option>
            <option value="penthouse">Penthouse</option>
          </select>
          <input name='price' type='number' placeholder='price' value={this.state.price} onChange={(e) => this.handleChange(e) } />
          <input name='squareMetres' type='number' placeholder='size in square meters'  value={this.state.squareMetres} onChange={ (e) => this.handleChange(e) } />
          <input  className="edit-btn" type='submit' placeholder='upload property'onClick={this.goProperties}/>

        </form>
        <div>

        </div>
      </div>
    )
  }
}

export default HouseForm