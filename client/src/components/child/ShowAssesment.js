import React from 'react'
import {Table,Label} from 'reactstrap'
import axios from '../../config/axios';
class ShowAssesment extends React.Component{
    constructor(props){
        super(props)
        this.state={
            assesmentDetails:[],
            options:[],
            rawTotal:0,
            resultSubCategory:''
            
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
       
        const question = event.target.attributes[2].nodeValue
        const subcategory = event.target.attributes[3].nodeValue
        this.setState(()=>({resultSubCategory:subcategory}))
        const option=event.target.value
        const id=event.target.id

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
                               console.log('data',data)
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
                                      console.log('que',que)
                                      console.log('que question',que.question)
                                      return <tr key={index}>
                                      <td>{index}</td>
                                      <td>{que.question.title}</td>
                                      {this.state.options.map((option,index)=>{
                                          return<td key={index}>
                                          <Label>
                                           <input type="radio"  id={option._id} 
                                           question={que.question._id} subcategory={data.subcategory._id} 
                                           value={option.points} onChange={this.handleOption}key={index}/>
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
                                
                               
                  
            {/* <ul>
            {this.state.assesmentDetails.map((data,index)=>{
                return <li key={index}>{data.subcategory.name}
                
                <ul>
                    {data.questions.map((que,index)=>{
                        return <li key={index}>{que.question.title}
                        {this.state.options.map((option,index)=>{
                            return <>
                        <input type="radio"  id={option._id} question={que.question._id} subcategory={data.subcategory._id} value={option.points} onChange={this.handleOption}key={index}/>{option.name}{"  "}</>
                        })} 
                    </li>
                    })}
                </ul>
                <> <form onSubmit={this.handleSubmit}><input type="submit"value="next"/></form></>
                </li>
               
            })}
            <> <form onSubmit={this.handleFinalSubmit}><input type="submit"value="submit"/></form></>
            </ul> */}
            </div>
        )
    }
}
export default ShowAssesment