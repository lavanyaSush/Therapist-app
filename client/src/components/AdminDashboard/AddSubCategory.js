import React from 'react'
import {Form,FormGroup,Label,Input} from 'reactstrap'
import axios from '../../config/axios';
class AddSubCategory extends React.Component{
    constructor(){
        super()
        this.state={
            name:'',
            categories:[],
            category :''
        }
    }
    componentDidMount(){
        axios.get('/category')
        .then((response)=>{
            console.log(response.data)
            const categories = response.data
            this.setState(()=>({categories}))

        })
        .catch((err)=>{
            console.log(err)
        })
    }
    handleName=(event)=>{
        const name=event.target.value
        this.setState(()=>({name}))
    }
    handleCategory=(event)=>{
        const category=event.target.value
        console.log(category)
        this.setState(()=>({category}))
    }
    handleSubmit=(event)=>{
        event.preventDefault()
        const formData={
            name:this.state.name,
            category : this.state.category
        }
        console.log(formData)
        axios.post('/subcategory',formData)
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
                <h2>Add SubCategory </h2>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label>Select Category
                            <select  value={this.state.category} onChange={this.handleCategory}>
                            <option value="select">select</option>
                            {this.state.categories.map((category)=>{
                                return (
                                
                                <option key={category._id}  name={category._id}value={category._id}>{category.name}</option>
                                )
                            })}
                                
                            </select>
                        </Label>
                    </FormGroup>
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
export default AddSubCategory