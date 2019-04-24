import React from 'react'
import {Form,FormGroup,Label,Input} from 'reactstrap'
import axios from '../../config/axios';
class AddQuestion extends React.Component{
    constructor(){
        super()
        this.state={
            subcategories :[],
            subCategory:'',
            title:'',
            titleError:'',
            thresholdKey:'',
            icons:[],
            icon:'',
            serverOptions:[],
            options:[],
            isChecked:false
        }
    }
    componentDidMount(){
        const p1= axios.get('/subcategory')
        const p2 = axios.get('/icon')
        const p3=axios.get('/option')
        //const p4=axios.get('/category')
        Promise.all([p1,p2,p3])
        .then((response)=>{
            this.setState(()=>{
                return{
                    subcategories:response[0].data,
                    icons:response[1].data,
                    serverOptions:response[2].data
                }
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    handleSubCategory=(event)=>{
        const subCategory=event.target.value
        //console.log(subcategory)
        this.setState(()=>({subCategory}))
    }
    handleTitle=(event)=>{
        const title=event.target.value
        //console.log(title)
        this.setState(()=>({title}))
    }
    handleKey=(event)=>{
        const thresholdKey=event.target.value
        this.setState(()=>({thresholdKey}))
    }
    handleOption=(event)=>{
        const id=event.target.id
        const options=[]
        let optionObj={}
        
        const isChecked=event.target.checked
        if(isChecked){
            if(!options.includes(id)){
                optionObj.option=id
                options.push(optionObj)

            }
            console.log(options)
            
        }
        //console.log(isChecked)
        this.setState((prevState)=>({options:prevState.options.concat(options)}))
    }
    handleIcon=(event)=>{
        const id=event.target.id
        const isChecked=event.target.checked
        console.log(id)
        if(isChecked){
        this.setState(()=>({icon:id}))
        }
    }
    handleSubmit=(event)=>{
        event.preventDefault()
        // const formData = new FormData()
        // formData.append('title',this.state.title)
        // formData.append('subCategory',this.state.subcategory)
        // formData.append('options',this.state.options)
        // formData.append('thresholdKey',this.state.thresholdKey)
        const formData={
            title :this.state.title,
            thresholdKey : this.state.thresholdKey,
            subCategory:this.state.subCategory,
            options :this.state.options,
            icon:this.state.icon
        }
        axios.post('/question',formData)
        .then((response)=>{
            console.log(response.data)
            this.setState(()=>{
                return{
                    title:'',
                    thresholdKey:'',
                    subCategory:'',
                    options:[],
                    icon:null,
                    isChecked:false
                }
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    render(){
        // console.log(this.state.options)
        return(
            <div>
                <h2>Add question</h2>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label>select subcategory
                            <select value={this.state.subCategory} onChange={this.handleSubCategory}>
                                <option value="select">select</option>
                                {this.state.subcategories.map((subcategory)=>{
                                    return <option key={subcategory._id} value={subcategory._id}>{subcategory.name}</option>
                                }) }
                                
                            </select>
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>Title
                            <Input type="text" value={this.state.title} onChange={this.handleTitle}/>
                            <p>{this.state.titleError}</p>
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>Options<br/>
                                
                                {this.state.serverOptions.map((option)=>{
                                    return (
                                    <div>
                                        <Label>{option.name}  {" "} 
                                            <input type="checkbox"  id={option._id} value={option._id} defaultChecked={false} onChange={this.handleOption}/>
                                        </Label>
                                    </div>
                                    )
                                })}
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>ThresholdKey
                            <select value={this.state.thresholdKey} onChange={this.handleKey}>
                                <option key="1" value=''>{''}</option>
                                <option key="2" value='L'>L</option>
                                <option key="3" value='H'>H</option>
                            </select>
                       </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>Select icon
                            {/* <select class="selectpicker" value={this.state.icon} onChange={this.handleIcon}>
                                <option value='select'>select</option>
                                
                                {this.state.icons.map((iconImage)=>{
                                    return <option style={{backgroundImage:`url(${iconImage.icon})`}} value={iconImage._id}>visual</option>
                                })}
                               
                            </select> */}
                            {
                                this.state.icons.map((iconImage)=>{
                                    return (
                                        <div>
                                             <img alt='' key={iconImage._id}src={iconImage.icon}width="20" height="20"/>{'   '}
                                             <input  type="checkbox" defaultChecked={false}id={iconImage._id}onChange={this.handleIcon}/>
                                        </div>
                                   
                                    )
                                })
                            }
                            
                        </Label>
                    </FormGroup>
                    <input type="submit" value="submit"/>
                </Form>
            </div>
        )
    }
}
export default AddQuestion