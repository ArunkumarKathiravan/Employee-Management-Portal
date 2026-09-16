import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import EmployeeList from "./EmployeeList";
import AddEmployeeModal from "./AddEmployeeModal";
import axios from "axios";
import API_URL from '../../constants/Index';
import {Redirect} from 'react-router-dom';

class Main extends Component {
  state = {
    employees: []
  };

  componentDidMount() {
    this.resetState();
  }

  getEmployees = () => {
    var token = localStorage.getItem('token');
    if(token){
      axios.get(API_URL, { headers: {Authorization: `JWT ${localStorage.getItem('token')}`}}).then(res =>
        this.setState({
          employees: res.data
        })
      );
    }
    else{
      return( <Redirect to='http://localhost:8000/'/> )
    }
  };

  resetState = () => {
    this.getEmployees();
  };

  render() {
    return (
      <div className="Main">
        <div className="dashboard-header">
          <h1>Employee directory</h1>
          <p>Manage your team records from one simple workspace.</p>
        </div>
        <Container className="dashboard-content">
          <Row>
            <Col>
              <EmployeeList employees={this.state.employees} resetState={this.resetState} />
            </Col>
          </Row>
          <Row>
            <Col>
              <AddEmployeeModal create={true} resetState={this.resetState} />
            </Col>
          </Row>
        </Container>
      </div>

    );
  }
}

export default Main;
