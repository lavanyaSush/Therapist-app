import React from 'react';
//import DatePicker from "react-datepicker";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import Select from 'react-select'
// import InputAdornment from '@material-ui/core/InputAdornment';
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
//import axios from '../axios/config';
//import axios from '../../config/axios';
import FormLabel from '@material-ui/core/FormLabel';
import {Input} from 'reactstrap'

import { Link } from 'react-router-dom'

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({

    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    
    paper: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
            marginTop: theme.spacing.unit * 6,
            marginBottom: theme.spacing.unit * 6,
            padding: theme.spacing.unit * 3,
        },
    },

    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: "10%",

    },
    
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit * 3,
        alignContent: 'center'
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    formlabel: {
        fontSize: '12px',
        marginTop: '5px'
    },
    textfield: {
        height: 5,
    },
    labelRoot: {
        fontSize: 15,
        marginBottom: 40
    },
    label: {
        padding: 0
    },
    container: {

        marginBottom: "10px"
    },
    input: {
        display: 'none',
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },

    fileLabel: {
        fontSize: '14px',
        marginTop: '10px'
    }
});



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
        const { classes } = this.props;
        return (
            <React.Fragment>
              <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography gutterBottom component="h5" variant="h5" align="center">
                        {this.props.title}
                    </Typography>
            <React.Fragment>
            <hr />
            <React.Fragment>
            <form className={classes.form}>
                <Grid container spacing={24} className={classes.container} alignItems="baseline" justify="center" >
                    <Grid item xs={2} className={classes.label} >
                        <Typography variant="button" gutterBottom>Name</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <TextField
                            id="name"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            fullWidth
                            autoComplete="pname"
                        />
                    <FormLabel className={classes.formlabel} error={true}>{this.state.nameError}</FormLabel>
                    </Grid>
                </Grid>
                <Grid container spacing={24} className={classes.container} alignItems="baseline" justify="center" >
                    <Grid item xs={2} className={classes.label} >
                        <Typography variant="button" gutterBottom>Gender</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <select value={this.state.value}onChange={this.handleGender}>
                        <option value="select">select</option>
                        <option  value="boy">Boy</option>
                        <option value="girl" >Girl</option>
                        </select>
                    </Grid>
                </Grid>
                <Grid container spacing={24} className={classes.container} alignItems="baseline" justify="center" >
                    <Grid item xs={2} className={classes.label} >
                        <Typography variant="button" gutterBottom>Concerns</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <TextField
                            id="majorConcerns"
                            name="majorConcerns"
                            value={this.state.majorConcerns}
                            onChange={this.handleChange}
                            fullWidth
                            autoComplete="pname"
                        />
                    <FormLabel className={classes.formlabel} error={true}>{this.state.majorConcernsError}</FormLabel>
                    </Grid>
                </Grid>
                <Grid container spacing={24} className={classes.container} alignItems="baseline" justify="center" >
                    <Grid item xs={2} className={classes.label} >
                        <Typography variant="button" gutterBottom>Date</Typography>
                    </Grid>
                    <Grid item xs={7}>
                    <Input type="date" value={this.state.dob} onChange={this.handleDate}/>
                        {/* <DatePicker
                            selected={this.state.dob} 
                            //when day is clicked
                            onChange={this.handleChangee} //only when value has changed
                            /> */}
                    </Grid>
                </Grid>
                <Grid container spacing={24} className={classes.container} alignItems="baseline" justify="center" >
                    <Grid item xs={2} className={classes.label} >
                        <Typography variant="button" gutterBottom>Email</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <TextField
                            id="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth
                            autoComplete="pname"
                        />
                        <FormLabel className={classes.formlabel} error={true}>{this.state.emailError}</FormLabel>
                    </Grid>
                </Grid>
                <Grid container spacing={24} className={classes.container} alignItems="baseline" justify="center" >
                    <Grid item xs={2} className={classes.label} >
                        <Typography variant="button" gutterBottom>Location</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <TextField
                            id="location"
                            name="location"
                            value={this.state.location}
                            onChange={this.handleChange}
                            fullWidth
                            autoComplete="pname"
                        />
                        <FormLabel className={classes.formlabel} error={true}>{this.state.locationError}</FormLabel>
                    </Grid>
                </Grid>
                <Grid container spacing={24} className={classes.container} alignItems="baseline" justify="center" >
                    <Grid item xs={2} className={classes.label} >
                        <Typography variant="button" gutterBottom>MotherName</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <TextField
                            id="motherName"
                            name="motherName"
                            value={this.state.motherName}
                            onChange={this.handleChange}
                            fullWidth
                            autoComplete="pname"
                        />
                        <FormLabel className={classes.formlabel} error={true}>{this.state.nameError}</FormLabel>
                    </Grid>
                </Grid>
                <Grid container spacing={24} className={classes.container} alignItems="baseline" justify="center" >
                    <Grid item xs={2} className={classes.label} >
                        <Typography variant="button" gutterBottom>PhoneNo</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <TextField
                            id="phoneNumber"
                            name="phoneNumber"
                            value={this.state.phoneNumber}
                            onChange={this.handleChange}
                            fullWidth
                            autoComplete="pname"
                        />
                        <FormLabel className={classes.formlabel} error={true}>{this.state.phoneNumberError}</FormLabel>
                    </Grid>
                </Grid>
                <Grid container spacing={24} className={classes.container} alignItems="baseline" justify="center" >
                    <Grid item xs={2} className={classes.label} >
                        <Typography variant="button" gutterBottom>photo</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <input type="file" name="childPhoto" encType="multipart/form-data" 
                        accept="image/*" onChange={this.handlePhoto}/>
                    <FormLabel className={classes.formlabel} error={true}>{this.state.nameError}</FormLabel>
                    </Grid>
                </Grid>
                <Grid container spacing={0} alignItems="center" justify="center">
                    <div className={classes.buttons}>
                    <Link to='/child/list'>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleBack}
                            className={classes.button}
                            fullWidth>
                            Back
                        </Button>
                    </Link>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleSubmit}
                            className={classes.button}
                            fullWidth
                        > Submit
                        </Button>
                    </div>
                </Grid>
        </form>
        </React.Fragment>
        </React.Fragment>
    </Paper>
    </main>
    </React.Fragment>
        );
    }
}

ChildForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChildForm);
 