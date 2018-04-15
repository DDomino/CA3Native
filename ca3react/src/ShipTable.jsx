
import React, { Component } from 'react';

import {
    NavLink
} from 'react-router-dom';


class ShipTable extends Component {
    
    constructor(props){
        super(props);
        this.state = {dataFromServer: []}
        this.head = this.head.bind(this);
        this.body = this.body.bind(this);
    }


    componentDidMount(){
       
        this.props.facade.fetchAllSpaceships()
        .then(res=> { 
            this.setState({dataFromServer: res.results})})
        .catch(err => console.log(err))
      }

    head() {
        return (
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Model</td>
                    <td>Hyperdrive</td>
                    <td>Cost</td>
                </tr>
                
            </thead>
        )
    }

    body(){
        const results = this.state.dataFromServer;
        const inner = results.map((rowData, index) => {
            return (
                <tr key={index}>
                    <td>{rowData.name}</td>
                    <td>{rowData.model}</td>
                    <td>{rowData.hyperdrive_rating}</td>
                    <td>{rowData.cost_in_credits}</td>
                </tr>
            )
        })

        return (
            <tbody>
                {inner}
            </tbody>
        )
    }

    render(){
        return(
            <div>
                <table>
                    {this.head()}
                    {this.body()}
                </table>
                <NavLink activeClassName="active" to="/loginPage">
                    <button >Back</button>
                </NavLink>
            </div>
        )
    }
}

export default ShipTable;


