import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Button, Container, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import './ManageUser.css';

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/api/auth/getusers');
        setUsers(res.data);
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="view-contacts-page" id="print-area">
      <Container>
        <Row className="justify-content-center mb-4">
          <Col md={10}>
            <h2 className="text-center view-title">Manage Users</h2>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={10}>
            <Card className="view-contacts-card">
              <Card.Body>

                {/*Show loading spinner */}
                {loading && (
                  <div className="text-center py-4">
                    <Spinner animation="border" variant="primary" />
                  </div>
                )}

                {/*error alert if any */}
                {error && !loading && (
                  <Alert variant="danger" className="text-center">
                    {error}
                  </Alert>
                )}

                {/* Show users table if data loaded and no error */}
                {!loading && !error && (
                  <>
                    <Table bordered responsive className="text-center view-contacts-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Mobile</th>
                          <th>Gender</th>
                          <th>City</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user, index) => (
                          <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td>{user.gender}</td>
                            <td>{user.city}</td>
                            <td>
                              <Button variant="outline-primary" size="sm" className="me-2">Edit</Button>
                              <Button variant="outline-danger" size="sm">Delete</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>

                    {users.length === 0 && (
                      <div className="text-center py-4">
                        <p className="text-muted">No users found.</p>
                      </div>
                    )}
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ManageUser;
