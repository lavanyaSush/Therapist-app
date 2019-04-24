import React from 'react'
import axios from '../../config/axios';
import {Link} from 'react-router-dom'
// import {Button,Table} from 'reactstrap'
// import Display from './DisplayAssesments'
class ShowChild extends React.Component{
    constructor(){
        super()
        this.state={
            child :{},
            assesmentDetails:[],
            noOfAssesmentsDone:0,
            isData:false
        }
    }
    componentDidMount(){
        const id=this.props.match.params.id
        let assesments=[]
        const p1=axios.get('/assesmentResult')
        const p2=axios.get(`/child/${id}`)
        Promise.all([p1,p2])
        .then((response)=>{
            const assesmentDetails=response[0].data
            let count=0
            assesmentDetails.forEach((data)=>{
                if(data.assesment.child===this.props.match.params.id){
                    assesments.push(data)
                    count++
               }
            })
            console.log('assesments array',assesments)
            this.setState(()=>({noOfAssesmentsDone:count,assesmentDetails:assesments,isData:true,child:response[1].data}))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    calage=(dob)=> { 
        //console.log(dob)
       var diff_ms = Date.now() - dob.getTime();
       var age_dt = new Date(diff_ms); 
     
       return Math.abs(age_dt.getUTCFullYear() - 1970);
   }

    render(){
       // console.log(this.state.assesmentDetails)
        return(
            <div>
               <h2>No of Assesments Done--{this.state.noOfAssesmentsDone}</h2>
                <h2>Showing  child information</h2>
                <h3>Child Name---{this.state.child.name}</h3>
                <h3>Major Diagnosis---{this.state.child.majorConcerns}</h3>
                <h4>Listing Assesments done</h4>
                <ul>
                {this.state.assesmentDetails.map((assesment,index)=>{
                  //  return <li key={index}>{assesment}</li>
                  console.log(assesment.assesment)
                  console.log(assesment.assesment.assesmentDate)
                  return <li key={index}><Link to={`/child/${this.props.match.params.id}/assesment/${assesment.assesment._id}`}>Assesment.{index+1} </Link>on --{assesment.assesment.assesmentDate}</li>
                })}
                </ul>
                {/* <Table>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.state.child.name}</td>
                            <td>{this.state.child.gender}</td>
                            
                        </tr>
                    </tbody>
                </Table>
                
                <Button onClick={()=>{
                    const confirmDelete=window.confirm('Are you sure to delete')
                    if(confirmDelete){
                    axios.delete(`/child/${this.state.child._id}`)
                    .then((response)=>{
                        console.log(response.data)
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                }
                }}>delete</Button>
                <Link to={`/child/edit/${this.state.child._id}`}>Edit</Link> */}
                {/* {this.state.isData&&<Display assesmentDetails={this.state.assesmentDetails}/>} */}
              
            </div>
        )}
        
}
export default ShowChild
