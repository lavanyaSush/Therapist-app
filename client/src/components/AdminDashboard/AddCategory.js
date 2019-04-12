import React from 'react'
import {Form,FormGroup,Label,Input} from 'reactstrap'
import axios from '../../config/axios';
class AddCategory extends React.Component{
    constructor(){
        super()
        this.state={
            name:'',
            assesmentCategories:[],
            assesmentCategory:''
           
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
    handleassesmentCategory=(event)=>{
        const assesmentCategory=event.target.value
        this.setState(()=>({assesmentCategory}))
    }
    handleName=(event)=>{
        const name=event.target.value
        this.setState(()=>({name}))
    }
    handleSubmit=(event)=>{
        event.preventDefault()
        const formData={
            name:this.state.name,
            assesmentCategory:this.state.assesmentCategory
        }
        console.log(formData)
        axios.post('/category',formData)
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
                <h2>Add Category </h2>
                <Form onSubmit={this.handleSubmit}>
                {/* <FormGroup>
                        <Label>Select  assesmentCategory
                            <select value={this.state.assesmentCategory} onChange={this.handleassesmentCategory}>
                                <option value="select">select</option>
                                {this.state.assesmentCategories.map((assesmentCategory)=>{
                                    return <option key={assesmentCategory._id} value={assesmentCategory._id}>{assesmentCategory.name}</option>
                                }) }
                                
                            </select>
                        </Label>
                    </FormGroup> */}
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
export default AddCategory