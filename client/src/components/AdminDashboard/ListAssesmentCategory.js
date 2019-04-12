import React from 'react'
import axios from '../../config/axios';
import {Link} from 'react-router-dom'
class  ListAssesmentCategories extends React.Component {
    constructor(){
        super()
        this.state={
            assesmentCategories:[]
        }
    }
    componentDidMount(){
        axios.get('/assesmentCategory')
        .then((response)=>{
            this.setState(()=>({assesmentCategories:response.data}))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
       
    render(){
    return(
        <div>
            <h2>Listing AssesmentCategories-{this.state.assesmentCategories.length}</h2>
            <ul>
                {this.state.assesmentCategories.map((category)=>{
                    return <li key={category._id}>{category.name}</li>
                })}
            </ul>
            <Link to="/assesmentCategory/new"> Add AssesmentCategory</Link>
        </div>
    )
    }
}
export default ListAssesmentCategories


