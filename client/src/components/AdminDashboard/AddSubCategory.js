import React from 'react'
//import axios from '../axios/config';
import axios from '../../config/axios';
import SubCategoryForm from './SubCategoryForm'
//import { Link } from 'react-router-dom'


class AddSubCategory extends React.Component {

    handleSubmit = (data) => {
        axios.post("/subcategory", data)
            .then(response => {
                const data = response.data
                console.log(data)
                //this.props.history.push("/subcategory/list")

            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                {/* <h2>add</h2> */}
                <SubCategoryForm handleSubmit={this.handleSubmit} title="Add New SubCategory" />
              

            </div>
        )

    }
}
export default AddSubCategory