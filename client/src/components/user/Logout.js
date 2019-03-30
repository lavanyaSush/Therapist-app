import React from 'react'
import axios from '../../config/axios';
import {setUser} from '../../actions/user'
import {connect} from 'react-redux'
class  Logout extends React.Component{
    constructor(props){
        super(props)
        this.state={
            logoutMessage : false
        }
    }
    componentDidMount(){
        axios.delete('/user/logoutfromall',{ headers: { 'x-auth': localStorage.getItem('authToken') } })
        .then((response)=>{
            console.log(response.data)
            
            this.setState(()=>({logoutMessage:true}))
            this.props.dispatch(setUser({}))
            localStorage.removeItem('authToken')

            this.props.history.push('/')
        })
        .catch((err)=>{
            console.log(err)
            
        })
    }
    render(){
        return(
            <div>
            {this.state.logoutMessage && 
            <h2>logout successfull</h2>
            }
        
        </div>
        )
    }
    
}
export default connect()(Logout)