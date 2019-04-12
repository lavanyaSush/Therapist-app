import React from 'react'
import {Form,Input,Label,FormGroup} from 'reactstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class ChildForm extends React.Component{
    constructor(props){
        super(props)
        console.log('props from edit',props)
        this.state={
            name :props.name? props.name:'',
            nameError :'',
            gender :props.gender? props.gender:'',
            age :'',
            ageError :'',
            dob :props.dob? props.dob:'',
            majorConcerns:props.majorConcerns? props.majorConcerns:'',
            majorConcernsError :'',
            motherName :props.motherName? props.motherName:'',
            motherNameError :'',
            phoneNumber:props.phoneNumber? props.phoneNumber:'',
            phoneNumberError :'',
            location :props.location? props.location:'',
            locationError:'',
            email:props.email? props.email:'',
            emailError :'',
            childPhoto:props.childPhoto? props.childPhoto:null

        }
        this.handleChange=this.handleChange.bind(this)
    }
    checkForErrors = ()=>{
        let isError = false
        let errors ={}
        console.log('entered checkforerrors')
        if(this.state.name.length<5){
            isError = true
           errors.nameError ='name must be minimum 5 characers'
        }
        if(!this.state.email.includes('@')){
            isError = true
            errors.emailError = 'enter valid email'
        }
        if(this.state.motherName.length<3){
            isError = true
            errors.motherNameError = 'mother name must be atleast 3 characters'
        }
        if(this.state.phoneNumber.length<10){
            isError = true
            errors.phoneNumberError = 'phone number should be 10 numbers'
        }
        if(this.state.location.length===0){
            isError = true
            errors.locationError = 'location should not be empty'
        }
        if(isError){
            this.setState(()=>({...this.state,...errors}))
            
        }
        return isError
    }
    handleSubmit=(event)=>{
        event.preventDefault()
       
        const formData = new FormData()
        
        formData.append('name' , this.state.name)
        formData.append('gender' ,this.state.gender)
        formData.append('age' ,this.state.age)
        formData.append('dob' ,this.state.dob)
        formData.append('majorConcerns',this.state.majorConcerns)
        formData.append('motherName',this.state.motherName)
        formData.append('phoneNumber',this.state.phoneNumber)
        formData.append('location',this.state.location)
        formData.append('email',this.state.email)
        formData.append('childPhoto',this.state.childPhoto)
        console.log(formData)
        const errors =this.checkForErrors()
        if(!errors){
        this.props.handleSubmit(formData)
        this.setState(()=>{
            return{
                name : '',
               // nameError :'',
                gender :'',
                age :'',
                dob :'',
                majorConcerns:'',
                //majorConcernsError :'',
                motherName :'',
                //motherNameError :'',
                phoneNumber:'',
                //phoneNumberError :'',
                location :'',
                //locationError:'',
                email:'',
                //emailError :'',
                childPhoto:null
            }
        
        
        })
    }
    }
    handleChangee=(date)=> {
        this.setState({
          dob: date
        })
      }
      handleDate=(event)=>{
          const dob=event.target.value
          console.log(dob)
          this.setState(()=>({dob}))
      }
    handleChange(event){
        event.persist()
        this.setState(()=>({
            [event.target.name]:event.target.value
        }))
    }
    handleGender =(event)=>{
        const gender=event.target.value
        this.setState(()=>({gender}))
    }
    handlePhoto=(event)=>{
        const childPhoto=event.target.files[0]
        console.log(childPhoto)
        childPhoto.src=''
        this.setState(()=>({childPhoto}))
    }
    render(){
    return(
    <div>
        <Form action="/child" method="post"onSubmit={this.handleSubmit}>
            <FormGroup>
                <Label>Name
                    <Input type="text" value={this.state.name} name="name"onChange={this.handleChange}/>
                    <p>{this.state.nameError}</p>
                </Label>
            </FormGroup>
           
            <FormGroup>
                <Label>gender
                    <select value={this.state.value}onChange={this.handleGender}>
                        <option value="select">select</option>
                        <option  value="boy">Boy</option>
                        <option value="girl" >Girl</option>
                    </select>
                </Label>
            </FormGroup>
            <FormGroup>
                <Label>majorConcerns
                    <textarea value={this.state.majorConcerns} name="majorConcerns"onChange={this.handleChange}/>
                </Label>
            </FormGroup>
            
            <FormGroup>
                <Label>DateOfBirth
            <DatePicker
                selected={this.state.dob} 
                //when day is clicked
                onChange={this.handleChangee} //only when value has changed
                />
                </Label>
                </FormGroup>
            <FormGroup>
                <Label>MotherName
                    <Input type="text" value={this.state.motherName} name="motherName"onChange={this.handleChange}/>
                    <p>{this.state.motherNameError}</p>
                </Label>
            </FormGroup>
            <FormGroup>
                <Label>email
                    <Input type="text" value={this.state.email} name="email" onChange={this.handleChange}/>
                    <p>{this.state.emailError}</p>
                </Label>
            </FormGroup>
            <FormGroup>
                <Label>phoneNumber
                    <Input type="text" value={this.state.phoneNumber} name="phoneNumber"onChange={this.handleChange}/>
                    <p>{this.state.phoneNumberError}</p>
                </Label>
            </FormGroup>
            <FormGroup>
                <Label>Location
                    <Input type="text" value={this.state.location} name="location"onChange={this.handleChange}/>
                    <p>{this.state.locationError}</p>
                </Label>
            </FormGroup>
            <FormGroup>
                <Label>childPhoto
                    <input type="file" name="childPhoto" encType="multipart/form-data" 
                     accept="image/*" onChange={this.handlePhoto}/>
                </Label>
            </FormGroup>
            <input type="submit" value="submit"/>
        </Form>

    </div>
)
}
}
export default ChildForm