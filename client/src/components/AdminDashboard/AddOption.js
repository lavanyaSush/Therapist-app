import React from 'react';
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
import axios from '../../config/axios';
import FormLabel from '@material-ui/core/FormLabel';
//import {Form,FormGroup,Label,Input} from 'reactstrap'

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


class AddOption extends React.Component{
    constructor(){
        super()
        this.state={
            name:'',
            nameError:'',
            points:'',
            pointsError:''
        }
    }
    handleName=(event)=>{
        const name=event.target.value
       // console.log(name)
        this.setState(()=>({name}))
    }
    handlePoints=(event)=>{
        const points=event.target.value
        this.setState(()=>({points}))
    }
    handleSubmit=(event)=>{
        event.preventDefault()
        //console.log('entered submit')
        const formData={
            name:this.state.name,
            points :this.state.points
        }
        console.log(formData)
        axios.post('/option',formData)
        .then((response)=>{
            console.log(response.data)
            this.setState(()=>{
                return{
                    name:'',
                    points :''
                }
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    render(){
        const { classes } = this.props;
       // console.log(this.props)
        return (
            <React.Fragment>


                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography gutterBottom component="h5" variant="h5" align="center">
                            Add Option
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
                                                onChange={this.handleName}
                                                fullWidth
                                                autoComplete="pname"
                                            />
                                            <FormLabel className={classes.formlabel} error={true}>{this.state.nameError}</FormLabel>
                                        </Grid>
                                    </Grid>
                                    
                                        
                                            <FormLabel className={classes.formlabel} error={true}>{this.state.nameError}</FormLabel>
                                           
                                    <Grid container spacing={24} className={classes.container} alignItems="baseline" justify="center" >
                                        <Grid item xs={2} className={classes.label} >
                                            <Typography variant="button" gutterBottom>Points</Typography>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <TextField
                                                id="points"
                                                name="points"
                                                value={this.state.points}
                                                onChange={this.handlePoints}
                                                fullWidth
                                                autoComplete="pname"
                                            />
                                            <FormLabel className={classes.formlabel} error={true}>{this.state.pointsError}</FormLabel>
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

AddOption.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddOption);