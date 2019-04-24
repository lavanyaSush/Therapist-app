import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//import Select from 'react-select'
//import InputAdornment from '@material-ui/core/InputAdornment';
//import CloudUploadIcon from '@material-ui/icons/CloudUpload';
//import InputLabel from '@material-ui/core/InputLabel';
//import MenuItem from '@material-ui/core/MenuItem';
//import FormControl from '@material-ui/core/FormControl';
//import axios from '../axios/config';
import axios from '../../config/axios';
import FormLabel from '@material-ui/core/FormLabel';
import {Label} from 'reactstrap'

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



class QuestionForm extends React.Component{
    constructor(){
        super()
        this.state={
            subcategories :[],
            subCategory:'',
            title:'',
            titleError:'',
            thresholdKey:'',
            icons:[],
            icon:'',
            serverOptions:[],
            options:[],
            isChecked:false
        }
    }
    componentDidMount(){
        const p1= axios.get('/subcategory')
        const p2 = axios.get('/icon')
        const p3=axios.get('/option')
        //const p4=axios.get('/category')
        Promise.all([p1,p2,p3])
        .then((response)=>{
            this.setState(()=>{
                return{
                    subcategories:response[0].data,
                    icons:response[1].data,
                    serverOptions:response[2].data
                }
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    handleSubCategory=(event)=>{
        const subCategory=event.target.value
        //console.log(subcategory)
        this.setState(()=>({subCategory}))
    }
    handleTitle=(event)=>{
        const title=event.target.value
        //console.log(title)
        this.setState(()=>({title}))
    }
    handleKey=(event)=>{
        const thresholdKey=event.target.value
        this.setState(()=>({thresholdKey}))
    }
    handleOption=(event)=>{
        const id=event.target.id
        const options=[]
        let optionObj={}
        
        const isChecked=event.target.checked
        if(isChecked){
            if(!options.includes(id)){
                optionObj.option=id
                options.push(optionObj)

            }
            console.log(options)
            
        }
        //console.log(isChecked)
        this.setState((prevState)=>({options:prevState.options.concat(options)}))
    }
    handleIcon=(event)=>{
        const id=event.target.id
        const isChecked=event.target.checked
        console.log(id)
        if(isChecked){
        this.setState(()=>({icon:id}))
        }
    }
    handleSubmit=(event)=>{
        event.preventDefault()
        const formData={
            title :this.state.title,
            thresholdKey : this.state.thresholdKey,
            subCategory:this.state.subCategory,
            options :this.state.options,
            icon:this.state.icon
        }
        this.props.handleSubmit(formData)
        this.setState(()=>{
            return{
                title:'',
                thresholdKey:'',
                subCategory:'',
                options:'',
                icon:null
            }
        })
    }


    validate = () => {
        let isError = false;
        const errors = {
            nameError: '',


        }

        if (this.state.name.length === 0) {
            isError = true;
            errors.nameError = "Provide Name ";
        }

        this.setState({
            ...this.state,
            ...errors
        })
        return isError
    }

    render() {
        const { classes } = this.props;
       // console.log(this.props)
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
                                            <Typography variant="button" gutterBottom>Title</Typography>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <TextField
                                                id="title"
                                                name="title"
                                                value={this.state.title}
                                                onChange={this.handleTitle}
                                                fullWidth
                                                autoComplete="pname"
                                            />
                                            <FormLabel className={classes.formlabel} error={true}>{this.state.titleError}</FormLabel>
                                        </Grid>
                                    </Grid>
                                    
                                        
                                            
                                       
                                           
                                            <Grid container spacing={24} className={classes.container} alignItems="baseline" justify="center" >
                                        <Grid item xs={2} className={classes.label} >
                                            <Typography variant="button" gutterBottom>SubCategory</Typography>
                                        </Grid>
                                        <Grid item xs={7}>  
                                        <select value={this.state.subCategory} onChange={this.handleSubCategory}>
                                <option value="select">select</option>
                                {this.state.subcategories.map((subcategory)=>{
                                    return <option key={subcategory._id} value={subcategory._id}>{subcategory.name}</option>
                                }) }
                                
                            </select>        
                            <FormLabel className={classes.formlabel} error={true}>{this.state.nameError}</FormLabel>
                        </Grid>
               
                </Grid>
                <Grid container spacing={24} className={classes.container} alignItems="baseline" justify="center" >
                                        <Grid item xs={2} className={classes.label} >
                                            <Typography variant="button" gutterBottom>options</Typography>
                                        </Grid>
                                        <Grid item xs={7}>  
                                        {this.state.serverOptions.map((option)=>{
                                    return (
                                    <div>
                                        <Label>{option.name}  {" "} 
                                            <input type="checkbox"  id={option._id} value={option._id} defaultChecked={false} onChange={this.handleOption}/>
                                        </Label>
                                    </div>
                                    )
                                })}
                            <FormLabel className={classes.formlabel} error={true}>{this.state.nameError}</FormLabel>
                        </Grid>
               
                </Grid>
                <Grid container spacing={24} className={classes.container} alignItems="baseline" justify="center" >
                                        <Grid item xs={2} className={classes.label} >
                                            <Typography variant="button" gutterBottom>ThresholdKey</Typography>
                                        </Grid>
                                        <Grid item xs={7}>  
                                        <select value={this.state.thresholdKey} onChange={this.handleKey}>
                                <option key="1" value=''>{''}</option>
                                <option key="2" value='L'>L</option>
                                <option key="3" value='H'>H</option>
                            </select>
                            <FormLabel className={classes.formlabel} error={true}>{this.state.nameError}</FormLabel>
                        </Grid>
               
                </Grid>
                <Grid container spacing={24} className={classes.container} alignItems="baseline" justify="center" >
                                        <Grid item xs={2} className={classes.label} >
                                            <Typography variant="button" gutterBottom>Icon</Typography>
                                        </Grid>
                                        <Grid item xs={7}>  
                                        {
                                this.state.icons.map((iconImage)=>{
                                    return (
                                        <div>
                                             <img alt='' key={iconImage._id}src={iconImage.icon}width="20" height="20"/>{'   '}
                                             <input  type="checkbox" defaultChecked={false}id={iconImage._id}onChange={this.handleIcon}/>
                                        </div>
                                   
                                    )
                                })
                            }
                            
                            <FormLabel className={classes.formlabel} error={true}>{this.state.nameError}</FormLabel>
                        </Grid>
               
                </Grid>





                                    <Grid container spacing={0} alignItems="center" justify="center">

                                        <div className={classes.buttons}>
                                        <Link to='/category/list'>
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

QuestionForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QuestionForm);