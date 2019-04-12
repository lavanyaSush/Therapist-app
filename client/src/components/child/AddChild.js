import React from 'react'
//import {Redirect} from 'react-router-dom'
import ChildForm from './ChildForm'
import axios from '../../config/axios';
class AddChild extends React.Component{
    
    handleSubmit=(formData)=>{
        console.log(formData)
        axios.post('/child',formData)
        .then((response)=>{
            console.log(response.data)
           //this.props.history.push('/child/assesment/new')
        })
        .catch((err)=>{
            console.log(err)
        })
        
    }
    render(){
        return(
            <div>
                <ChildForm handleSubmit={this.handleSubmit}/>
                </div>
        )
    }
        
}
export default AddChild