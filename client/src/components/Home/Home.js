import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
const Home =(props)=>{
    const {isAuth} =props.user
    return(
        
        <div>
            {!isAuth&&
            <div>
            <Link to="/register">Register     </Link>
            <Link to="/login">Login</Link>
            </div>}
            {isAuth&&
            <div>
                <Link to="/child/new">AddChild    </Link><br/>
                <Link to="/category/new"> Addcategory  </Link><br/>
                <Link to="/subcategory/new">AddSubCategory   </Link><br/>
                <Link to="/category/list"> ViewCategory   </Link><br/>
                <Link to="/subcategory/list"> ViewSubCategories   </Link><br/>
                <Link to="/child/list">ChildList</Link><br/>
                <Link to="/user/logout">Logout</Link>
            </div>}
        </div>
    )
}
const mapStateToProps =(state)=>{
    return{
    user : state.user
    }
}
export default connect(mapStateToProps)(Home)