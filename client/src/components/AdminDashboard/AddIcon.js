import React from 'react'
import axios from '../../config/axios';
import {Form,Label,FormGroup,Input} from 'reactstrap'
class AddIcon extends React.Component{
    constructor(){
        super()
        this.state={
            title:'',
            titleError:'',
            icon:null
        }
    }
    handleTitle=(event)=>{
        const title=event.target.value
        this.setState(()=>({title}))
    }
    handleIcon=(event)=>{
        const icon=event.target.files[0]
        icon.src=''
        this.setState(()=>({icon}))
    }
    handleSubmit=(event)=>{
        event.preventDefault()
        const formData=new FormData()
        formData.append('title',this.state.title)
        formData.append('icon',this.state.icon)
        axios.post('/icon',formData)
        .then((response)=>{
            console.log(response.data)
            this.setState(()=>({title:'',icon:null}))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    render(){
        return(
            <div>
                <h2>Add Icon</h2>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label>title
                            <Input type="text" value={this.state.title} onChange={this.handleTitle}/>
                            <p>{this.state.titleError}</p><br/>
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>Icon
                             <input type="file" name="icon" encType="multipart/form-data" 
                                accept="image/*" onChange={this.handleIcon}/>
                        </Label>
                    </FormGroup><br/>
                    <input type="submit" value="submit"/>
                </Form>
            </div>
        )
    }

}
export default AddIcon