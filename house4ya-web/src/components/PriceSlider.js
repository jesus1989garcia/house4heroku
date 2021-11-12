import React, {Component} from 'react'
import Slider from 'react-rangeslider'

class PriceSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      price: 0 
    }
  }

  handlePriceChange = (value) => {
    this.props.handlePrice(value)
  }

  render() {
    const sliderProps = { minimum: 1000, maximum: 99999, step: 1000}
    return (
      <Slider value={this.props.initialPrice} orientation="vertical" onChange={this.handlePriceChange} min={sliderProps.minimum} max={sliderProps.maximum} step={sliderProps.step}/>
    )
  }
  
}

export default PriceSlider