import React from 'react'
import {Form,Input,FormGroup,Label} from 'reactstrap'
import axios from '../../config/axios';
import {setUser} from '../../actions/user'
import {connect} from 'react-redux'
//import {Link,Redirect} from 'react-router-dom'
import jwtDecode from 'jwt-decode'
class Login extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            email:'',
            emailError:'',
            password :'',
            passwordError:'',
            redirectList : false,
            isLogin : localStorage.getItem('authToken')
            
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleForm=this.handleForm.bind(this)
    }
    
    handleChange(event){
        event.persist()
        this.setState(()=>({
            [event.target.name] : event.target.value
        }))
    }
    checkforErrors = ()=>{
        let isError = false
        let errors ={}
        console.log('entered checkforerrors')
        
        if(!this.state.email.includes('@')){
            isError = true
            errors.emailError = 'enter valid email'
        }
        if(this.state.password.length<8){
            isError = true
            errors.passwordError = 'pasword must be atleast 8 characters'
        }
        if(isError){
            this.setState(()=>({...this.state,...errors}))
            
        }
        return isError
    }
    handleForm(event){
        event.preventDefault()
        const formData={
        email : this.state.email,
        password : this.state.password
    }
    const errors=this.checkforErrors()
    if(!errors){
    axios.post('/user/login',formData)
    .then((response)=>{
        console.log('response',response.data)
        const tn =response.data.token.token
        //console.log(tn)
        //const user = token.user
        //console.log('user',user.username)
        localStorage.setItem('authToken', tn)
        //console.log(response.data)
        this.props.dispatch(setUser(jwtDecode(tn)))
        this.setState(()=>{
            return{
                email:'',
                emailError:'',
                password : '',
                passwordError:'',
                redirectList:true,
                isLogin : true
                
            }
        })
    })
    .catch((err)=>{
        console.log(err)
    })
    }
}
    render(){
        return(
            <div>             
               {this.state.isLogin&&<h2>hello user</h2>}
               {!this.state.isLogin&& <Form onSubmit={this.handleForm}> 
               <FormGroup>
                <Label>Email
                    <Input type="text" value={this.state.email} name="email"onChange={this.handleChange}/>
                    <p>{this.state.emailError}</p><br/>
                </Label>
                </FormGroup><br/>
                <FormGroup>
                <Label>Password
                    <Input type="password" value={this.state.password}name="password" onChange={this.handleChange}/>
                    <p>{this.state.passwordError}</p>
                </Label>
                </FormGroup><br/>
                <input type="submit" value="submit"/>
                </Form>
            }
            </div>
        )
    }
}
export default connect()(Login)