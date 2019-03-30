import React from 'react'
import axios from '../../config/axios';
import {Link} from 'react-router-dom'
import {Button} from 'reactstrap'
class ShowChild extends React.Component{
    constructor(){
        super()
        this.state={
            child :{}
        }
    }
    componentDidMount(){
        const id=this.props.match.params.id
        axios.get(`/child/${id}`)
        .then((response)=>{
            this.setState(()=>({child:response.data}))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    render(){
        return(
            <div>
                <h2>Show one child information</h2>
                {
                    this.state.child.name
                }
                <Button onClick={()=>{
                    const confirmDelete=window.confirm('Are sure to delete')
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
                <Link to={`/child/edit/${this.state.child._id}`}>Edit</Link>

            </div>
        )
    }
}
export default ShowChild
