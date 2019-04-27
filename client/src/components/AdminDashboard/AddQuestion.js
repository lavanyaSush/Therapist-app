import React from 'react'
//import axios from '../axios/config';
import axios from '../../config/axios';
//import QuestionForm from './QuestionForm'
import QuestionForm from './QForm'
//import { Link } from 'react-router-dom'


class AddQuestion extends React.Component {

    handleSubmit = (data) => {
        axios.post("/question", data )
            .then(response => {
                const data = response.data
                console.log(data)
                // this.props.history.push("/question/list")

            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                {/* <h2>add</h2> */}
                <QuestionForm handleSubmit={this.handleSubmit} title="Add New Question" />
              

            </div>
        )

    }
}
export default AddQuestion