import React from 'react'
import {Form,FormGroup,Label} from 'reactstrap'
import axios from '../../config/axios';
import DatePicker from 'react-datepicker'
import Select from 'react-select'


class AddAssesment extends React.Component{
    constructor(){
        super()
        this.state={
            children :[],
            child:null,
            assesmentDate:new Date(),
            disciplines:[],
            discipline:'',
            assesmentCategories:[],
            assesmentCategory:''

        }
    }
    componentDidMount(){
        const p1=axios.get('/child')
        const p2 = axios.get('/discipline')
        //const p3=axios.get('/assesmentCategory')
        Promise.all([p1,p2])
        .then((response)=>{
            this.setState(()=>{
                return{
                children:response[0].data,
                disciplines:response[1].data,
                //assesmentCategories:response[2].data
                }
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    handleChild=(child)=>{
        //const child=event.target.value
        //console.log(subchild)
       // console.log(child)
        this.setState(()=>({child:child.value}))
        
    
    } 
    handleDiscipline=(event)=>{
        const discipline=event.target.value
        this.setState(()=>({discipline}))
    }
    handleassesmentCategory=(event)=>{
        const assesmentCategory=event.target.value
        this.setState(()=>({assesmentCategory}))
    }
    handleChangee=(date)=> {
        this.setState({
          assesmentDate: date
        })
      }
     handleSubmit=(event) =>{
         event.preventDefault()
         const formData={
             child:this.state.child,
             discipline:this.state.discipline,
             assesmentDate:this.state.assesmentDate,
         }
         axios.post('/assesment',formData)
         .then((response)=>{
             console.log('response',response.data)
             let data=response.data
             console.log(data)
            //  this.setState(()=>{
            //      return{
            //          child:'',
            //          discipline:'',
            //          assesmentDate:new Date(),
            //          assesmentCategory:''
            //      }
            //  })
            this.props.history.push(`/assesment/${data._id}`)
         })
         .catch((err)=>{
             console.log(err)
         })
     }
    
    render(){
        let options=[]
        options=this.state.children.map((child)=>{
            return {value:child._id,label:child.name}
        })       
        return(
            <div>
                 <div className="container">
                <div className="row">
                <div className="col">
               
                <h2>AddAssesment</h2>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label>select child
                            <Select  className="basic-single" 
                             classNamePrefix="select"
                            //  value={this.state.child} 
                            // label={this.state.child}
                            style={{width:'150px'}}
                            onChange={this.handleChild} 
                            options={options}/>
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>DateOfAssesment
                            <DatePicker      selected={this.state.assesmentDate} 
                                //when day is clicked
                                onChange={this.handleChangee} //only when value has changed
                                />
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>Select  Discipline
                            <select value={this.state.discipline} onChange={this.handleDiscipline}>
                                <option value="select">select</option>
                                {this.state.disciplines.map((discipline)=>{
                                    return <option key={discipline._id} value={discipline._id}>{discipline.name}</option>
                                }) }
                                
                            </select>
                        </Label>
                    </FormGroup>
                   
                    <input type="submit" value="submit"/>
                </Form>
               </div>
               </div>
               </div>
               </div>
        )
    }
}
export default AddAssesment