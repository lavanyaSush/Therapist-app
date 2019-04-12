import React from 'react'
import axios from '../../config/axios';
import {Table} from 'reactstrap'
class ShowQuestions extends React.Component{
    constructor(){
        super()
        this.state={
            allQuestions:[],
            icon:''
            
        }
    }
    componentDidMount(){
       axios.get('assesmentResult')
       .then((response)=>{
           
       })

    }
    
    render(){
        return(
            <div>
                <h2>ShowQuestions--{this.state.allQuestions.length}</h2>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ThresholdKey</th>
                            <th>Icon</th>
                            <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.allQuestions.map((question,index)=>{
                            return <tr key={index}>
                            <td>{index}</td>
                            <td>{question.thresholdKey}</td>
                            <td><img alt='' src={this.state.icon}/></td>
                            <td>{question.title}</td>
                            </tr>
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }
    
}
export default ShowQuestions