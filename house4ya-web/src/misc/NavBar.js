import React, { Component } from 'react' 
import house4yaLogo from '../imgs/house4ya.logo.png'
import { Link, withRouter } from 'react-router-dom'
import AuthService from '../services/AuthService'
import { withAuthConsumer } from '../context/AuthStore'

class NavBar extends Component {
  constructor(props){
    super(props)
  }

  handleLogout = (e) => {
    AuthService.logout()
    .then(() => this.props.onUserChange(null))
    setTimeout(() => {
      this.props.history.push('/signin')
    }, 1000);
    
  }

  render(){
    return(
      <nav className="navbar" role="navigation" aria-label="main navigation" >
    
       

        <div className="navbar-item-box">
         <Link to='/home' id="logo-box">
             <img src={house4yaLogo} alt="house4ya logo" />
         </Link>
         <Link to='/profile' className="button" >
               Profile
         </Link>
          
         <Link to='/upload_house' className='button'>Upload property</Link>
         <Link to='/properties' className='button'>Own properties</Link>
         <Link to='/favourites' className='button'>See favourites</Link>
         <Link to='/signup' className="button is-primary" href="todo">
            <strong>Sign up</strong>
         </Link>
         <Link to='/signin' className="button is-light" href="todo">
           Log in
          </Link>
          
          <button className="navbar-logout-btn" onClick={this.handleLogout}>Log out</button>
        </div>    
      
    
  </nav>
    )

  }
  
}

export default withAuthConsumer(withRouter(NavBar))
