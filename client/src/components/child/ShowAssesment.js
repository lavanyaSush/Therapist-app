import React from 'react'
import {Table,Label} from 'reactstrap'
import axios from '../../config/axios';
import Radio from '@material-ui/core/Radio';

import { FormControlLabel } from '@material-ui/core';
class ShowAssesment extends React.Component{
    constructor(props){
        super(props)
        this.state={
            assesmentDetails:[],
            options:[],
            rawTotal:0,
            resultSubCategory:'',
            optionValue:''
            
        }
    }
    componentDidMount(){
          
        const id=this.props.match.params.id
        const p1=axios.get(`/assesmentResult/${id}`)
        const p2=axios.get('/option/')
        Promise.all([p1,p2])
        .then((response)=>{
            console.log('assesmentdetails',response[0].data)
            this.setState(()=>({assesmentDetails:response[0].data.results,options:response[1].data}))
            
        })
        .catch((err)=>{
            console.log(err)
        })
        
    }
    handleOption=(event) =>{
       console.log('target',event.target.attributes)
        const question = event.target.attributes[2].nodeValue
       // console.log('question',question)
        const subcategory = event.target.attributes[3].nodeValue
        this.setState(()=>({resultSubCategory:subcategory}))
        const option=event.target.value
        const id=event.target.oid

        console.log('option value',option)
        //console.log('added',this.state.optionAdded)
        
        const data={
            question,
            option:id, 
            subcategory
        }
        axios.put(`/assesmentResult/${this.props.match.params.id}`,data)
        .then((response)=>{
            console.log(response.data)
            
           
        })
        .catch((err)=>{
            console.log(err)
        })
        this.setState((prevState)=>({rawTotal:prevState.rawTotal+parseInt(option)}))
    
    
    }
    
    handleSubmit=(event)=>{
        event.preventDefault()
        const rawScore=this.state.rawTotal
        console.log(rawScore)
        const data={
            subcategory:this.state.resultSubCategory,
            rawScore
        }
        axios.put(`/assesmentResult/${this.props.match.params.id}`,data)
        .then((response)=>{
            console.log('after score added',response.data)
           
            this.setState(()=>({rawTotal:0,resultSubCategory:''}))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    render(){
        console.log(this.state.assesmentDetails)
     console.log(this.state.rawTotal)
        return(
            <div>
                
                 <h2>Showing </h2>
                
                           {this.state.assesmentDetails.map((data,index)=>{
                               //console.log('data',data)
                               return(
                               <div key={index}>
                               <Table >
                               <thead>
                                <tr><th>category</th></tr>
                                <tr>
                                    <th>Item</th>
                                    <th key={index}>{data.subcategory.name}</th>
                                    <th>Always</th>
                                    <th>Frequently</th>
                                    <th>Occasionally</th>
                                    <th>Seldom</th>
                                    <th>Never</th>
                            </tr>
                               </thead>
                               <tbody>
                                  {data.questions.map((que,index)=>{
                                      return <tr key={index}>
                                      <td>{index}</td>
                                      <td>{que.question.title}</td>
                                      {this.state.options.map((option,index)=>{
                                          return<td key={index}>
                                          {/* <Radio  
                                          id={option._id}
                                          question={que.question._id} subcategory={data.subcategory._id}  value={option.points}
                                          onChange={this.handleOption}key={index}
                                           />
                                         */}
                                          <Label>
                                           <input type="radio"  id={option._id} 
                                           question={que.question._id} subcategory={data.subcategory._id} 
                                           value={option.points} onChange={this.handleOption}key={index}
                                           name={que.question.title}
                                           />
                                           </Label>
                                          </td>
                                      })}
                                      
                                      </tr>
                                      
                                  })} 
                                
                               </tbody>
                               </Table>
                              
                               <><form onSubmit={this.handleSubmit}><input type="submit"value="ADDRESULT"/></form></>
                               </div>
                               )
                           })}
                            <> <form onSubmit={this.handleFinalSubmit}><input type="submit"value="submit"/></form></>
           </div>
        )
    }
}
export default ShowAssesment