import React, { Component } from 'react'
import AuthService from '../services/AuthService'
import {Redirect} from 'react-router-dom'
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


const validations= {
  password: (value) => {
    let message;
    if (!value){
      message = 'Introduce a password'
    }
    return message
  },
  username: (value) => {
    let message;
    if (!value){
      message = 'Choose  username'
    }
    return message
  },
  email: (value) => {
    let message;
    if (!value) {
      message = 'Email is required';
    } else if (!EMAIL_PATTERN.test(value)) {
      message = 'Invalid email pattern';
    }
    return message;
  },


}

class Register extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: {
        email: '',
        username: '',
        password: ''
      },
      errors: {},
      isRegistered: false
    }
  }

  handleChange = (event) => {
    let {name, value } = event.target
    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      },
      errors: {
        ...this.state.errors,
        [name]: validations[name] && validations[name](value)
      }
      
    })
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    if ( this.isValid() ) {
      AuthService.register(this.state.user)
      .then(
      (user) => this.setState({isRegistered: true}),
      (error) => {
        const {message, errors } = error.response.data
        this.setState({
          errors: {
            ...this.state.errors,
            ...errors,
            email: !errors && message
          }
        })
      }
    )
    }
    
  }

 

  isValid = () => {
    return !Object.keys(this.state.user)
    .some(err => this.state.errors[err])
  }


  render() {
    
    if (this.state.isRegistered) {
      return (<Redirect to="/edit_profile" />)
    }
    return(
      
        <form  onSubmit={this.handleFormSubmit} className="signup-form">
          
          <div>
            <input type="text" name="username" placeholder="username" value={this.state.user.username} onChange={(e) => this.handleChange(e)} />
          </div>
          <div>
            <input type="email" name="email" placeholder="email" value={this.state.user.email} onChange={(e) => this.handleChange(e)} />
          </div>
          <div>{this.state.errors.email}</div>
          <div>
            <input type="password" name="password" placeholder="password" value={this.state.user.password} onChange={(e) => this.handleChange(e) } />
          </div>
          <div>{this.state.errors.password}</div>

          <button className="register-btn" type="submit">Register</button>
          
          
        </form>
      
        
    )
  }
}

export default Register