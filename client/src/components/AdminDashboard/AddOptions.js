import React from 'react'
import {Form,FormGroup,Label,Input} from 'reactstrap'
import axios from '../../config/axios'
class AddOption extends React.Component{
    constructor(){
        super()
        this.state={
            name:'',
            nameError:'',
            points:'',
            pointsError:''
        }
    }
    handleName=(event)=>{
        const name=event.target.value
       // console.log(name)
        this.setState(()=>({name}))
    }
    handlePoints=(event)=>{
        const points=event.target.value
        this.setState(()=>({points}))
    }
    handleSubmit=(event)=>{
        event.preventDefault()
        //console.log('entered submit')
        const formData={
            name:this.state.name,
            points :this.state.points
        }
        console.log(formData)
        axios.post('/option',formData)
        .then((response)=>{
            console.log(response.data)
            this.setState(()=>{
                return{
                    name:'',
                    points :''
                }
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    render(){
        return(
            <div>
                <h2>Add Options</h2>
                <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label>Name
                        <Input type="text" value={this.state.name} onChange={this.handleName}/>
                        <p>{this.state.nameError}</p><br/>
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>points
                        <Input type="text" value={this.state.points} onChange={this.handlePoints}/>
                        <p>{this.state.pointsError}</p>
                    </Label>
                </FormGroup>
                    <input type="submit" value="submit"/>
               </Form>
            </div>
        )
    }
}
export default AddOption