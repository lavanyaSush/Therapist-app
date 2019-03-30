import React from 'react'
import ChildForm from './ChildForm'
import axios from '../../config/axios';
class AddChild extends React.Component{
    
    handleSubmit=(formData)=>{
        console.log(formData)
        axios.post('/child',formData)
        .then((response)=>{
            console.log(response.data)
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