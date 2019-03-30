import React from 'react'
import { connect } from 'react-redux';
const  ViewCategories=(props)=> {
        
    return(
        <div>
            <h2>Listing Categories-{props.categories.length}</h2>
        </div>
    )
    }


const mapStateToProps=(state,props)=>{
    return {
        categories : state.categories
    }
}
export default connect(mapStateToProps)(ViewCategories)