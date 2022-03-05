import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withAuthConsumer } from '../context/AuthStore'
import UserService from '../services/UserService'



class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: {
        email: '',
        username: '',
        avatar: ''
      }
    }
  }

  componentDidMount() {
    UserService.getProfile()
    .then(
      (user) => this.setState({ user: {...this.state.user, ...user }}),
      (error) => console.error(error)
    )
  }

  render() {
    return(
      <div className="profile-container">
        <div>
           <h2 className="prof-title">Your profile</h2>
        </div>
        <div className="profile-img-container">
          <img src={this.state.user.avatar} alt={this.state.username} className="profile-img"></img>
        </div>
        <div>
          <h6>{this.state.user.username}</h6>
        </div>
        
        <div>
          <h6>{this.state.user.email}</h6>
        </div>
        <Link to='/edit_profile' className="edit-btn-link"><button className="edit-btn">Edit</button></Link>
        
        
        

      </div>
    )
  }
}

export default withAuthConsumer(Profile)

