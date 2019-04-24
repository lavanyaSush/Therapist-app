import React from 'react'
import axios from '../../config/axios';
import {Table} from 'reactstrap'
class ChildAssesmentResult extends React.Component{
    constructor(){
        super()
        this.state={
            finalResult:[]
        }
    }
    componentDidMount(){
        console.log(this.props.match.params.id)
        const id=this.props.match.params.id
        axios.get(`/assesmentResult/${id}`)
        .then((response)=>{
            console.log(response.data.results)
            this.setState(()=>({finalResult:response.data.results}))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    render(){
        return(
            <div>
                <h3>In Child Assesment Result</h3>
                {this.state.finalResult.map((result,index)=>{
                    return(
                        <div>
                            <Table>
                    <thead>
                        <tr key={index}><th>{result.subcategory.name}</th></tr>
                        <tr>
                            <th>Title</th>
                            <th>Selected option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.questions.map((que,index)=>{
                            return <tr key={index}>
                            <td>{que.question.title}</td>
                            <td>{que.option.name}</td>
                            </tr>
                        })}
                    </tbody>
                </Table>
                <h5>RawScore Total...{result.rawScore}</h5>
                            </div>

                    )
                })}
                
                {/* <ul>
                {this.state.finalResult.map((result,index)=>{
                    return <li key={index}>{result.subcategory.name}
                    <ul>
                        {result.questions.map((que,index)=>{
                            return <li key={index}>{que.question.title}....{que.option.name}
                           </li>
                        })}
                    </ul>
                   <h4>RawScore... {result.rawScore}</h4>
                    </li>
                  // console.log(result.subcategory.name)
                })}

                </ul> */}
            </div>
        )
    }
}
export default ChildAssesmentResult