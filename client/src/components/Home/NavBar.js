import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
const NavBar =(props)=>{
    const {isAuth,user} =props.user
    //console.log('user from Home',user)
    return(
        
        <div>
            <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
            <a class="navbar-brand" href="#">Therapist App</a>
                
            <div >
            {!isAuth?
            <div>
            <Link className="btn btn-primary" to="/register">Register     </Link>
            <Link className="btn btn-primary" to="/login">Login</Link>
            </div>:<>
             <ul className="navbar-nav ">

             <li className="nav-item dropdown">
                 <Link className="nav-link dropdown-toggle " to="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                     <span className="text-white">Actions</span>
                 </Link>
                 <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                 {user.role=='admin'?<div> <Link className="dropdown-item"to="/option/new">AddOption</Link>
                <Link className="dropdown-item"to="/icon/new">AddIcon</Link>
                <Link className="dropdown-item"to="/question/new">AddQuestion</Link>
                 <Link className="dropdown-item"to="/category/new"> AddCategory </Link>
                <Link className="dropdown-item"to="/subcategory/new">AddSubCategory</Link> 
                <Link className="dropdown-item"to="/discipline/list">ListDisciplines</Link></div>
                :<div>
                     <Link className="dropdown-item"to="/child/list">ChildList</Link>
                <Link className="dropdown-item"to="/child/assesment/new">AddAssesment</Link>
                  </div>   }
                
               
                 </div>
             </li>
             <li className="nav-item ">
              <Link className="nav-link" to="/user">Home </Link>
               </li>
               <li className="nav-item ">
                <Link className="btn btn-primary" to='/logout' style={{float:'right'}}role="button">LogOut</Link></li></ul></>
        }
            {/* {isAuth&&
            <div>
                          
                <Link to="/option/new">AddOption</Link><br/>
                <Link to="/icon/new">AddIcon</Link><br/>
                <Link to="/question/new">AddQuestion</Link><br/>
                 <Link to="/category/list"> ViewCategory </Link><br/>
                <Link to="/subcategory/list"> ViewSubCategories</Link><br/> 
                <Link to="/discipline/list">ListDisciplines</Link><br/>
                <Link to="/child/list">ChildList</Link><br/>
                <Link to="/child/assesment/new">AddAssesment</Link><br/>
                <Link to="/assesmentCategory/list">ListAssesmentCategory</Link><br/>
                <Link to="/user/logout">Logout</Link>
            </div>} */}
            </div>
           
            </nav>
        </div>
    )
}
const mapStateToProps =(state)=>{
    return{
    user : state.user
    }
}
export default connect(mapStateToProps)(NavBar)