import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import NavBar from './components/Home/NavBar'
import Footer from './components/Home/Footer'
import Login from './components/user/Login'
//import Register from './components/user/RegisternoUi'
import AddChild from './components/child/AddChild'
import AddCategory from './components/AdminDashboard/AddCategory'
import AddSubCategory from './components/AdminDashboard/AddSubCategory';
import AddOption from './components/AdminDashboard/AddOption'
import AddIcon from './components/AdminDashboard/AddIcon'
import AddQuestion from './components/AdminDashboard/AddQuestion'
import ListCategories from './components/AdminDashboard/ViewCategories'
import ListSubCategory from './components/AdminDashboard/ViewSubCategories'
import ChildList from './components/child/ChildList'
import ShowChild from './components/child/ShowChild'
import EditChild from './components/child/EditChild'
import Logout from './components/user/Logout'
import AddAssesment from './components/child/AddAssesment'
import ListDiscipline from './components/AdminDashboard/ListDiscipline'
import AddDiscipline from './components/AdminDashboard/AddDiscipline'
import AddAssesmentCategory from './components/AdminDashboard/AddAssesmentCategory'
import ListAssesmentCategory from './components/AdminDashboard/ListAssesmentCategory'
import ShowAssesment from './components/child/ShowAssesment'
import ShowQuestions from './components/child/ShowQuestions';
import ChildAssesmentResult from './components/child/ShowAssesmentResult'
import Register from './components/user/Register'
import PrivateRoute from './components/Home/Routehiding'
class App extends Component {
  render() {
    const style = {
      background: '#f2f2f2',
      height: '550px'
    }
    return (
      <BrowserRouter>
     
       <NavBar/>
       <div >
       
        <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <PrivateRoute exact path="/child/new" component={AddChild}exact={true}/>
        <PrivateRoute exact path="/category/new" component={AddCategory}/>
        <PrivateRoute exact path="/subcategory/new" component={AddSubCategory}/>
        <PrivateRoute exact path="/discipline/list" component={ListDiscipline}/>
        <PrivateRoute exact path="/discipline/new" component={AddDiscipline}/>
        <PrivateRoute exact path="/assesmentCategory/new" component={AddAssesmentCategory}/>
        <PrivateRoute exact path="/assesmentCategory/list" component={ListAssesmentCategory}/>
        <PrivateRoute exact path="assesment/questions/list" component={ShowQuestions}/>
        <PrivateRoute exact path="/assesment/:id" component={ShowAssesment}/>
        <PrivateRoute exact path="/option/new" component={AddOption}/>
        <PrivateRoute exact path="/icon/new" component={AddIcon}/>
        <PrivateRoute exact path="/question/new" component={AddQuestion}/>
        <PrivateRoute exact path="/category/list" component={ListCategories}/>
        <PrivateRoute exact path="/subcategory/list" component={ListSubCategory}/>
        <PrivateRoute exact path="/child/list" component={ChildList} exact={true}/>
        <PrivateRoute exact path="/child/:id/assesment" component={ShowChild} exact={true}/>
        <PrivateRoute exact path="/child/:id/assesment/:id" component={ChildAssesmentResult} />
        <PrivateRoute exact path="/child/edit/:id" component={EditChild} exact={true}/>
        <PrivateRoute exact path="/child/assesment/new" component={AddAssesment} exact={true}/>
        <PrivateRoute exact path="/logout" component={Logout}/>
        </Switch>
        
      </div>
      {/* <Footer/> */}
      </BrowserRouter>
      
    );
  }
}

export default App;
