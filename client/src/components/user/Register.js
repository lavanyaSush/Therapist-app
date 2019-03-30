import React from 'react'
import axios from '../../config/axios'
import {Form,Input,Label,FormGroup} from 'reactstrap'
class Register extends React.Component{
    constructor(){
        super()
        this.state={
            username : '',
            usernameError : '',
            email : '',
            emailError :'',
            password : '',
            passwordError :'',
            noticeMsg :''
        }
        this.emailChange = this.emailChange.bind(this)
        //this.passwordChange = this.passwordChange.bind(this)
        this.submitHandle = this.submitHandle.bind(this)
    }
    //es6 arrow functions for event handlers where you dont have to bind this keyword
    nameChange=(event)=>{
        const username=event.target.value
        this.setState(()=>({username}))
    }
    //regular method used fro event handlers
    emailChange(event){
        const email=event.target.value
        this.setState(()=>({email}))
    }
    passwordChange(event){
        const password=event.target.value
        this.setState(()=>({password}))
    }
    checkforErrors = ()=>{
        let isError = false
        let errors ={}
        console.log('entered checkforerrors')
        if(this.state.username.length<5){
            isError = true
           errors.usernameError ='username must be minimum 5 characers'
        }
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
    submitHandle(event){
        event.preventDefault()
        //client side validations
        const formData = {
            username : this.state.username,
            email : this.state.email,
            password : this.state.password
        }
        const err = this.checkforErrors()
        if(!err){
        axios.post('/user/register',formData)
        .then((response)=>{
            console.log(response.data)
            this.setState(()=>{
                return {
                username :'',
                usernameError :'',
                email:'',
                emailError:'',
                password : '',
                passwordError:'',
                noticeMsg :response.data.notice
                }

            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    


    }
    render(){
        return (
            <div>
                <h2>Register with us</h2>
                {this.state.noticeMsg&&<p>{this.state.noticeMsg}</p>}
                <Form onSubmit={this.submitHandle}>
                <FormGroup>
                    <Label>Username
                        <Input type="text" value={this.state.username}  onChange={this.nameChange}/>
                        <p>{this.state.usernameError}</p>
                        <br/>
                    </Label>
                    </FormGroup>
                    <FormGroup>
                    <Label>Email
                        <Input type="text" value={this.state.email}  onChange={this.emailChange}/>
                        <p>{this.state.emailError}</p>
                        <br/>
                    </Label>
                    </FormGroup>
                    <FormGroup>
                    <Label>Password
                        <Input type="password" value={this.state.password}  onChange={this.passwordChange.bind(this)}/>
                        <p>{this.state.passwordError}</p>
                    </Label>
                    </FormGroup><br/>
                    <input type="submit" value="submit" />
                </Form>
            </div>
        )
    }
}
export default Register