import React from 'react'
import {Table} from 'reactstrap'
class ListQuestions extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div>
                <Table >
                    <thead>
                        <tr>
                            <th>sensoryprocessing</th>
                        </tr>
                        <tr>
                        <th>Item </th>
                        <th>Auditory Processing</th>
                        </tr>
                        
                    </thead>
                </Table>
            </div>
        )
    }
}
export default ListQuestions