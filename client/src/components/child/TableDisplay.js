import React from 'react'
import {Table} from 'reactstrap'
import axios from '../../config/axios';
import {Link} from 'react-router-dom'
class TableDisplay extends React.Component{
    constructor(){
        super()
        this.state={
            children :[]
        }
    }
    componentDidMount(){
        console.log('entered cdid mount')
        axios.get('/child')
        .then((response)=>{
            console.log(response.data)
            this.setState(()=>({children:response.data}))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
     calage(dob) { 
         console.log(dob)
        var diff_ms = Date.now() - dob.getTime();
        var age_dt = new Date(diff_ms); 
      
        return Math.abs(age_dt.getUTCFullYear() - 1970);
    }
    render(){
        return(
            <div>
                <h2>Listing Children-{this.state.children.length}</h2>
                <Table>
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>name</td>
                            <td>age</td>
                            <td>gender</td>
                            <td>majorConcerns</td>
                            <td>MotherEmail</td>
                            <td>photo</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.children.map((child,index)=>{
                            return(   <tr key={child._id}>
                                    <td>{index+1}</td>
                                    <td><Link to={`/child/${child._id}`}>{child.name}</Link></td>
                                    <td>{this.calage(new Date(child.dob))}</td>
                                    <td>{child.gender}</td>
                                    <td>{child.majorConcerns}</td>
                                    <td>{child.email}</td>
                                    <td><img src={child.childPhoto}
                                    width="100"
                                    height="100"/></td>
                            </tr>)
                            })}
                                              
                    </tbody>
                </Table>
            </div>
        )
    }
}
export default TableDisplay