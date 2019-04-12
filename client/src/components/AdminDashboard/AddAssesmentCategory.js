import React from 'react'
import {Form,FormGroup,Label,Input} from 'reactstrap'
import axios from '../../config/axios';
class AddAssesmentCategory extends React.Component{
    constructor(){
        super()
        this.state={
            name:''
           
        }
    }
    handleName=(event)=>{
        const name=event.target.value
        this.setState(()=>({name}))
    }
    handleSubmit=(event)=>{
        event.preventDefault()
        const formData={
            name:this.state.name
        }
        console.log(formData)
        axios.post('/assesmentCategory',formData)
        .then((response)=>{
            console.log('response from server',response.data)
            this.setState(()=>({name:''}))
        })
        .catch((err)=>{
            console.log(err)
        })
        
    }
    render(){
        return(
            <div>
                <h2>Add AssesmentCategory </h2>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label>name
                            <Input type="text" value={this.state.name} onChange={this.handleName}/><br/>
                        </Label>
                    </FormGroup>
                    <input type="submit" value="submit"/>
                </Form>
            </div>
        )
    }
}
export default AddAssesmentCategory