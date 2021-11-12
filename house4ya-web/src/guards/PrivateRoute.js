import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthStore';

const PrivateRoute = ({component: Component, ...rest}) => (
  <AuthContext.Consumer>
    {({ isAuthenticated }) => (
      <Route render={
        props => isAuthenticated() ? 
          <Component {...props} /> : 
          <Redirect to="/signin" />
        }
        {...rest}  
      />
    )}
  </AuthContext.Consumer>
)

export default  PrivateRoute