import React from 'react';
import './App.css';
import NavBar from './misc/NavBar';
// import Card from './components/Cards';
import Login from './components/login';
import Register from './components/Register';
import { Switch, Route, Redirect} from 'react-router-dom'
import Profile from './components/Profile';
import Home from './components/Home';
import HouseForm from './components/HouseForm';
import Properties from './components/Properties';
import detailHouse from './components/detailHouse';
import DeleteProperty from './components/DeleteProperty';
import EditHouse from './components/EditHouse';
import Favourites from './components/Favourites';
import EditProfile from './components/EditProfile';
import Maps from './components/Maps';
import WrappedMap from './components/MapRender'
import SearchBox from './components/searchBox';
import 'react-rangeslider/lib/index.css'
import PrivateRoute from './guards/PrivateRoute';


function App() {
  return (
    <div className="App">
     <NavBar/>
     <Switch>
       <Route exact path='/home' component={ Home } />
      <Route path='/signin' component={ Login } />
      <Route  path='/signup' component={ Register } />
      <PrivateRoute exact path='/profile' component={ Profile } />
      <PrivateRoute path='/upload_house' component={ HouseForm } />
      <PrivateRoute path='/properties' component={ Properties } />
      <Route path='/house' component={ detailHouse } />
      <Route path='/home/:id' component={ detailHouse } />
      <Route path='/property/:house/:owner' component={ DeleteProperty } />
      <Route path='/edit_property/:house/:owner' component={ EditHouse } />
      <PrivateRoute path='/favourites' component={ Favourites } />
      <PrivateRoute path='/edit_profile' component={EditProfile} />
      {/* <Route path='/map_places' component={Maps} /> */}
      <PrivateRoute path='/map/:owner/:house' component={Maps} />
      <Route path='/map_render' component={WrappedMap} />
      <Route path='/search' component={SearchBox} />
      
      {/* <Redirect to='/home' /> */}
     </Switch>
      
       
        
    </div>
  );
}

export default App;
