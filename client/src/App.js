import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import NavBar from './components/Home/NavBar'
import Footer from './components/Home/Footer'
import Login from './components/user/Login'
//import Register from './components/user/RegisternoUi'
import AddChild from './components/child/AddChild'
import AddCategory from './components/AdminDashboard/AddCategory'
import AddSubCategory from './components/AdminDashboard/AddSubCategory';
import AddOption from './components/AdminDashboard/AddOptions'
import AddIcon from './components/AdminDashboard/AddIcon'
import AddQuestion from './components/AdminDashboard/AddQuestion'
import ListCategories from './components/AdminDashboard/ViewCategories'
import ListSubCategory from './components/AdminDashboard/ViewSubCategories'
import ChildList from './components/child/ChildList'
import ShowChild from './components/child/ShowChild'
import EditChild from './components/child/EditChild'
import Logout from './components/user/Logout'
import AddAssesment from './components/child/AddAssessment'
import ListDiscipline from './components/AdminDashboard/ListDiscipline'
import AddDiscipline from './components/AdminDashboard/AddDiscipline'
import AddAssesmentCategory from './components/AdminDashboard/AddAssesmentCategory'
import ListAssesmentCategory from './components/AdminDashboard/ListAssesmentCategory'
import ShowAssesment from './components/child/ShowAssesment'
import ShowQuestions from './components/child/ShowQuestions';
import ChildAssesmentResult from './components/child/ShowAssesmentResult'
import Register from './components/user/Register'
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
        <Route path="/child/new" component={AddChild}exact={true}/>
        <Route path="/category/new" component={AddCategory}/>
        <Route path="/subcategory/new" component={AddSubCategory}/>
        <Route path="/discipline/list" component={ListDiscipline}/>
        <Route path="/discipline/new" component={AddDiscipline}/>
        <Route path="/assesmentCategory/new" component={AddAssesmentCategory}/>
        <Route path="/assesmentCategory/list" component={ListAssesmentCategory}/>
        <Route path="assesment/questions/list" component={ShowQuestions}/>
        <Route path="/assesment/:id" component={ShowAssesment}/>
        <Route path="/option/new" component={AddOption}/>
        <Route path="/icon/new" component={AddIcon}/>
        <Route path="/question/new" component={AddQuestion}/>
        <Route path="/category/list" component={ListCategories}/>
        <Route path="/subcategory/list" component={ListSubCategory}/>
        <Route path="/child/list" component={ChildList} exact={true}/>
        <Route path="/child/:id/assesment" component={ShowChild} exact={true}/>
        <Route path="/child/:id/assesment/:id" component={ChildAssesmentResult} />
        <Route path="/child/edit/:id" component={EditChild} exact={true}/>
        <Route path="/child/assesment/new" component={AddAssesment} exact={true}/>
        <Route path="/logout" component={Logout}/>
        </Switch>
        
      </div>
      {/* <Footer/> */}
      </BrowserRouter>
      
    );
  }
}

export default App;
