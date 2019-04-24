import React from 'react'
import axios from '../../config/axios';
//import {Table} from 'reactstrap'
class ShowQuestions extends React.Component{
    constructor(props){
        super(props)
        this.state={
           data:[],
           formattedData: []
        }
    }
    componentDidMount(){
        console.log('id',this.props.id)
       axios.get(`/assesmentResult/`)
        .then(response => {
            console.log('response from server',response.data)
            this.setState(() => ({ data: response.data }))
    })
}


    fetchResults = () => {
        this.state.data.forEach((assessment) => {
            assessment.results.forEach((result) => {
                this.state.formattedData.push(result) 
            })
        })
    }
    
    render(){
        console.log(this.state.data)
        return(
            <div>
                <h2>listing data-{this.state.data.length}</h2>
{/*                 
                { this.fetchResults()}
                
                <ul>
                    { this.state.formattedData.map(function(result){
                        return(
                            <li>
                                { result.subcategory.name }
                                <ul>
                                    { result.questions.map(rQuestion => {
                                        return (
                                            <li>{ rQuestion.question.title } </li> 
                                        )
                                    })}
                                </ul>

                            </li> 
                        )
                    })}
                </ul> */}
                
                {/* <Table>
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
                </Table> */}
            </div>
        )
    }
    
}
export default ShowQuestions