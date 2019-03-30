import React from 'react'
import { connect } from 'react-redux';
const  ViewSubCategories=(props)=> {
        
    return(
        <div>
            <h2>Listing Sub Categories-{props.subCategories.length}</h2>
        </div>
    )
    }


const mapStateToProps=(store,props)=>{
    return {
        subCategories : store.subCategories
    }
}
export default connect(mapStateToProps)(ViewSubCategories)