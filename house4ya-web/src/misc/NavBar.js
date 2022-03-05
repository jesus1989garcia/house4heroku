import React, { Component } from 'react' 
import house4yaLogo from '../imgs/house4ya.logo.png'
import { Link, withRouter } from 'react-router-dom'
import AuthService from '../services/AuthService'
import { withAuthConsumer } from '../context/AuthStore'
import {faBars, faChevronUp} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class NavBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      active: false
    }
  }

  handleLogout = (e) => {
    AuthService.logout()
    .then(() => this.props.onUserChange(null))
    setTimeout(() => {
      this.props.history.push('/signin')
    }, 1000);
    
  }

  ToggleClass = () => {
    this.setState({
      active: !this.state.active
    })
    
  }
  

  render(){
    
    return(
      <nav className="navbar" role="navigation" aria-label="main navigation" >
    
       

        <div className="navbar-item-box false">
         <Link to='/home' id="logo-box">
             <img src={house4yaLogo} alt="house4ya logo" />
         </Link>
         <Link to='/profile' className="button" >
               Profile
         </Link>
          
         <Link to='/upload_house' className={`button ${this.state.active}`}>Upload property</Link>
         <Link to='/properties' className={`button ${this.state.active}`}>Own properties</Link>
         <Link to='/favourites' className={`button ${this.state.active}`}>See favourites</Link>
         <Link to='/signup' className={`button is-primary ${this.state.active}`} href="todo">
            <strong>Sign up</strong>
         </Link>
         <Link to='/signin' className={`button is-light ${this.state.active}`} href="todo">
           Log in
          </Link>
          
          <button className={`navbar-logout-btn ${this.state.active}`} onClick={this.handleLogout}>Log out</button>
          <div className="burguer" onClick={this.ToggleClass}><FontAwesomeIcon icon={this.state.active ? faChevronUp : faBars} className="house-icon"></FontAwesomeIcon></div>
        </div>    
      
    
  </nav>
    )

  }
  
}

export default withAuthConsumer(withRouter(NavBar))
