import React, { Component } from 'react'
import HouseService from '../services/HouseService'
import Card from './Cards'
import SearchBox from './searchBox'
import backgroundHome from '../imgs/home-img-mct.jpg'
import PriceSlider from './PriceSlider'


class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      houses: [],
      address: null,
      price: 0,
      size: 0,
      property_type: 'all'

    }
  }

  
  handleChange = (value) => {
    this.setState({ 
      
      address: value
      
       })
  }

  handlePriceChange = (value) => {
    this.setState({
      price: value
    })
  }

  handleChangeFilters = (event) => {
    let {name, value } = event.target
    this.setState({ 
      [name]: value
      
       })
  }

 

 fetchHouses = () => {
   HouseService.getHouses()
   .then( houses => this.setState({ houses: houses }))
 }

 componentDidMount() {
   this.fetchHouses()
   
 }

 
 


  render() {
    
    const homeStyle = { height: '90vh',
      width: '100vw',
      backgroundImage: "url(" + backgroundHome + ")",
      backgroundSize: 'cover',
      }

      const homeX = {
        backgroundColor: "black",
        height: "100vh",
        width: "100vw"

      }
      
     
    return (
     
      
      <div className='home'  style={this.state.address ? homeX : homeStyle} >
        <div className="searchBar">
          <div>
            <SearchBox onChange={e => this.handleChange(e)}/>
          </div>
          
          <div className="price-slider">
              <p>£</p>
              <PriceSlider handlePrice={this.handlePriceChange} initialPrice={this.state.price}/>
          </div>
          <div>
            <input type="number" placeholder="m2" name="size" onChange={this.handleChangeFilters} value={this.state.size}/>
          </div>
          <select name="property_type" value={this.state.property_type} onChange={this.handleChangeFilters} >
            <option>all</option>
            <option>house</option>
            <option>flat</option>
            <option>appartament</option>
            <option>penthouse</option>
          </select> 
       </div>
        
        {  
         this.state.houses.filter(casa => (casa.LaCity[0].long_name === this.state.address || casa.LaCity[1].long_name === this.state.address) && (this.state.price < casa.price) && (casa.squareMetres >= this.state.size) && (casa.propertyType === this.state.property_type || this.state.property_type === "all") )  //here goes long name of result suggestions
        .map(  
        house =>   
        <Card house={house} key={house.id} /> 
        
        
      )
      
      } 
      </div>
      
    )
  }
}

export default Home