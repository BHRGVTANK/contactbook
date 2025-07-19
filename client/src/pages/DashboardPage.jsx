// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import { Row, Col, Card, Table, Container } from 'react-bootstrap';
import './Dashboard.css';

const Dashboard = () => {
  const [contacts] = useState([
    { id: 1, name: 'hello', email: 'hello@gmail.com', phone: '1234554321' },
    { id: 2, name: 'bhrgv', email: 'bhrgv@gmail.com', phone: '1122334455' }
  ]);

  return (
    <div className="dashboard-page">
      <Container>
        <Row className="justify-content-center mb-4">
          <Col md={10}>
            <h2 className="dashboard-welcome">Welcome, bhargavtank</h2>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={10}>
            <Card className="dashboard-card">
              <Card.Body>
                <h4 className="text-center mb-4">Your Contacts Overview</h4>
                <div className="table-responsive">
                  <Table bordered hover className="dashboard-table text-center">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map((contact) => (
                        <tr key={contact.id}>
                          <td>{contact.name}</td>
                          <td>{contact.email}</td>
                          <td>{contact.phone}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
