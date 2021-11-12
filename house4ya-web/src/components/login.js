import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { withAuthConsumer } from '../context/AuthStore';
import AuthService from '../services/AuthService'
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


const validations = {
  email: (value) => {
    let message
    if(!value) {
      message = "please type your email"
    } else if (!EMAIL_PATTERN.test(value)){
      message = "invalid email pattern"
    }
    return message
  },
  password: (value) => {
    let message
    if (!value) {
      message = "please introduce your password"
    }
    return message
  }
}

class Login extends  Component {
  constructor(props){
    super(props)
    this.state = {
      user: {
        email: '',
        password: ''
      },
      errors: {},
      isAuthenticated: false,
      touch: {}
    }
  }

  handleChange = (event) => {
    let {name, value} = event.target
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
    if (this.isValid()) {
      AuthService.login(this.state.user)
        .then(
          (user) => {
            this.setState({ isAuthenticated: true }, () => {
              this.props.onUserChange(user)
            })
          },
            
          (error) => {
            const { message, errors } = error.response.data;
            this.setState({
              errors: {
                ...this.state.errors,
                ...errors,
                password: !errors && message
              }
            })
          }
        )
    }
  }

  handleBlur = (event) => {
    const {name} = event.target
    this.setState({
      touch: {
        ...this.state.touch,
        [name]: true
      }
    })
  }

  isValid = () => {
    return !Object.keys(this.state.user)
    .some(attr => this.state.errors[attr])
  }
  


  render(){
    if (this.state.isAuthenticated) {
      return <Redirect to="/home"></Redirect>
    }
    return(
      
      <form onSubmit={this.handleFormSubmit} className="login-form">
        <div>
          <input type="email" name="email" placeholder="email" onBlur={this.handleBlur} onChange={(e) => this.handleChange(e)} value={this.state.user.email} />
        </div>
        <div>{this.state.errors.email}</div>
        <div>
          <input type="password" name="password" placeholder="password" onBlur={this.handleBlur} onChange={(e) => this.handleChange(e) } value={this.state.user.password} />
        </div>
        <div>{this.state.errors.password}</div>
        <div>
          <button type="submit" >Sign in</button>
        </div>
      </form>
    )
  }
}

export default withAuthConsumer(Login)