import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from '../../config/axios';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  card: {
    maxWidth: 345,
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
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
        return (
            <main className={classes.main}>
              <CssBaseline />
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Add Question
                </Typography>
                <form className={classes.form}>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">Title</InputLabel>
                    <Input id="title" name="title" autoComplete="title" autoFocus />
                  </FormControl>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel htmlFor="subcategory">SubCategory</InputLabel>
                    <Select
                        value={this.state.subCategory}
                        onChange={this.handleSubCategory}
                        inputProps={{
                        name: 'subCategory',
                        id: '',
                        }}
                        
                    >
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    {this.state.subcategories.map((subcategory)=>{
                                                return <MenuItem key={subcategory._id} value={subcategory._id}>{subcategory.name}</MenuItem>
                                            }) }
                        </Select>
                </FormControl>
                <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Options</FormLabel>
                {this.state.serverOptions.map((option)=>{
                                    if(option.name==='always'||option.name==='frequently'||option.name==='occasionally'){
                                    return (
                                    <div>
                                        <FormGroup>
                                        <FormControlLabel
                                           control={
                                        <Checkbox
                                            //checked={this.state.checkedA}
                                            onChange={this.handleOption}
                                            value={option._id}
                                            id={option._id}
                                            />
                                           }
                                           label={option.name}
                                            
                                      />
                                        </FormGroup>
                                    </div>
                                    )
                                        }
                                })}
                </FormControl>
                <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Options</FormLabel>
                {this.state.serverOptions.map((option)=>{
                                    if(option.name==='seldom'||option.name==='never'){
                                    return (
                                    <div>
                                        <FormGroup>
                                        <FormControlLabel
                                           control={
                                        <Checkbox
                                            //checked={this.state.checkedA}
                                            onChange={this.handleOption}
                                            value={option._id}
                                            id={option._id}
                                            />
                                           }
                                           label={option.name}
                                            
                                      />
                                        </FormGroup>
                                    </div>
                                    )
                                        }
                                })}
                </FormControl>
                <FormControl className={classes.formControl} fullWidth>
                    <InputLabel htmlFor="subcategory">ThresholdKey</InputLabel>
                    <Select
                        value={this.state.thresholdKey}
                        onChange={this.handleThresholdKey}
                        inputProps={{
                        name: 'thresholdKey',
                        id: '',
                        }}
                        
                    >
                    {/* <MenuItem value="">
                    <em>None</em>
                    </MenuItem> */}
                    <MenuItem value=''>{''}</MenuItem>
                    <MenuItem value='L'>L</MenuItem>
                    <MenuItem value='H'>H</MenuItem>
                </Select>
                 </FormControl>
               {/* <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Icons</FormLabel>
                {this.state.serverOptions.map((iconImage,index)=>{
                                    if(index<=3){
                                    return (
                                    <div>
                                        <FormGroup>
                                        <FormControlLabel
                                           control={
                                        <Checkbox
                                            //checked={this.state.checkedA}
                                            onChange={this.handleIcon}
                                            value={iconImage._id}
                                            id={iconImage._id}
                                            />
                                           }
                                          // label={iconImage.name}
                                            
                                      />
                                       <img alt='' key={iconImage._id}src={iconImage.icon}width="20" height="20"/>{'   '}
                                        </FormGroup>
                                    </div>
                                    )
                                        }
                                })}
                </FormControl>
                <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Icons</FormLabel>
                {this.state.icons.map((iconImage,index)=>{
                    return(
                        <div>
                        <img alt='' key={iconImage._id}src={iconImage.icon}/>{'   '}</div>
                    
                    )
                                    if(index>3&&index<this.state.icons.length){
                                    return (
                                    <div>
                                        <FormGroup>
                                        <FormControlLabel
                                           control={
                                        <Checkbox
                                            //checked={this.state.checkedA}
                                            onChange={this.handleIcon}
                                            value={iconImage._id}
                                            id={iconImage._id}
                                            />
                                           }
                                        //    label={icon.title}
                                        />
                                         
                                        </FormGroup>
                                        
                                    )
                                   
                                        }
                                })}
                </FormControl> */}
                 <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </Paper>
      
    </main>
  );
}
}
QuestionForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QuestionForm);