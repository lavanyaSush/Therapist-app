import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
const NavBar =(props)=>{
    const {isAuth,user} =props.user
    console.log('user from Home',user)
    return(
        
        <div>
            <nav className="navbar navbar-expand-lg navbar-primary" style={{ background: "#000066" }}>
                {/* <i className="material-icons lg-48" style={{ color: '#ffcc66' }}>
                    gavel
                </i> */}
                <Link className="navbar-brand" to='/'><img src={process.env.PUBLIC_URL + '/icon.png'} height="40px" width="40px" alt="" />{' '}Therapist App</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">

                    </ul>
                
            <div className="form-inline my-2 my-lg-0">
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
                 <Link className="dropdown-item"to="/category/list"> ViewCategory </Link>
                <Link className="dropdown-item"to="/subcategory/new">AddSubCategory</Link> 
                <Link className="dropdown-item"to="/discipline/new">AddDiscipline</Link></div>
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
           </div>
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