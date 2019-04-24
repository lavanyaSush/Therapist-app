import React from 'react'
import axios from '../../config/axios';
import {Link} from 'react-router-dom'
class  ListCategories extends React.Component {
    constructor(){
        super()
        this.state={
            categories:[]
        }
    }
    componentDidMount(){
        console.log('in component did mount')
        axios.get('/category')
        .then((response)=>{
            console.log('response from server',response.data)
            this.setState(()=>({categories:response.data}))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
       
    render(){
    return(
        <div>
            <div className="container">
            <div className="row">
            <div className="col">
            <h2>Listing Categories-</h2>
            {/* <ul>
                {this.state.categories.map((category)=>{
                    return <li key={category._id}>{category.name}</li>
                })}
            </ul> */}
            </div>
            <Link to="/category/new"> AddCategory</Link>
            </div>
            </div>
           
           
        </div>
    )
    }
}
export default ListCategories


