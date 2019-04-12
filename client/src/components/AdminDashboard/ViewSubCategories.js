import React from 'react'
import axios from '../../config/axios';
import {Link} from 'react-router-dom'
// import { connect } from 'react-redux';
// const  ViewSubCategories=(props)=> {
        
//     return(
//         <div>
//             <h2>Listing Sub Categories-{props.subCategories.length}</h2>
//         </div>
//     )
//     }


// const mapStateToProps=(store,props)=>{
//     return {
//         subCategories : store.subCategories
//     }
// }
// export default connect(mapStateToProps)(ViewSubCategories)

class ListSubCategory extends React.Component{
    constructor(){
        super()
        this.state={
            subCategories:[]
        }
    }
    componentDidMount(){
        axios.get('/subcategory')
        .then((response)=>{
            this.setState(()=>({subCategories:response.data}))
                  
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    render(){
        return(
            <div>
                <h2>Subcategories list---{this.state.subCategories.length}</h2>
                <ul>
                    {this.state.subCategories.map((subCategory)=>{
                        return <li key={subCategory._id}>{subCategory.name}</li>
                    })}
                </ul>
                <Link to="/subcategory/new">AddSubCategory</Link>
            </div>
        )
    }
}
export default ListSubCategory