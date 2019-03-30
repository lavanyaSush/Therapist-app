import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Home from './components/Home/Home'
import Login from './components/user/Login'
import Register from './components/user/Register'
import AddChild from './components/child/AddChild'
import AddCategory from './components/AdminDashboard/AddCategory'
import AddSubCategory from './components/AdminDashboard/AddSubCategory';
import AddOption from './components/AdminDashboard/AddOptions'
import ViewCategories from './components/AdminDashboard/ViewCategories'
import ViewSubCategories from './components/AdminDashboard/ViewSubCategories'
import ChildList from './components/child/ChildList'
import ShowChild from './components/child/ShowChild'
import EditChild from './components/child/EditChild'
import Logout from './components/user/Logout'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
      
        <div className="container">
        <div className="row">
        <div className="col-md-8">
        <h2>Welcome to Therapist App</h2>
        </div>
        <div className="col-md-4">
        <Home/>
        </div>
        </div>
        <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/child/new" component={AddChild}/>
        <Route path="/category/new" component={AddCategory}/>
        <Route path="/subcategory/new" component={AddSubCategory}/>
        <Route path="/option/new" component={AddOption}/>
        <Route path="/category/list" component={ViewCategories}/>
        <Route path="/subcategory/list" component={ViewSubCategories}/>
        <Route path="/child/list" component={ChildList} exact={true}/>
        <Route path="/child/:id" component={ShowChild} exact={true}/>
        <Route path="/child/edit/:id" component={EditChild} exact={true}/>
        <Route path="/user/logout" component={Logout}/>
        </Switch>
        
      </div>
      </BrowserRouter>
      
    );
  }
}

export default App;
