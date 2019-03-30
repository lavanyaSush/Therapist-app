import React from 'react'
import {Form,FormGroup,Label,Input} from 'reactstrap'
class AddOption extends React.Component{
    constructor(){
        super()
        this.state={
            name:'',
            nameError:'',
            points:''
        }
    }
    handleName=(event)=>{
        const name=event.target.value
        this.setState(()=>({name}))
    }
    handleSubmit=(event)=>{
        
    }
    render(){
        return(
            <div>
                <Form onSubmit={this.handleSubmit}/>
                <FormGroup>
                    <Label>Name
                        <Input type="text" value={this.state.name} onChange={this.handleName}/>
                        <p>{this.state.nameError}</p><br/>
                    </Label>
                </FormGroup>
            </div>
        )
    }
}
export default AddOption