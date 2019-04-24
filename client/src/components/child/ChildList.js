import React from 'react'
import {Link} from 'react-router-dom'
import TableDisplay from './TableDisplay'
// import DataDisplay from '../child/DataTable'
class ChildList extends React.Component{
    
    render(){
        console.log('in child list')
        return(
            <div>
                
                <TableDisplay />
                {/* <DataDisplay/> */}
                <Link to="/child/new">AddChild </Link><br/>
                
            </div>
        )
    }
   
}
export default ChildList