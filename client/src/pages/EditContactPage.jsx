import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Card, Container, Spinner } from 'react-bootstrap';

const EditContactPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await axios.get(`/api/auth/contact/${id}`);
        setForm(res.data); // Assuming API returns single contact object
      } catch (error) {
        alert(error.response?.data?.message || "Failed to fetch contact");
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/auth/contact/${id}`, form); // Correct update endpoint
      navigate('/view-contacts');
    } catch (err) {
      alert("Update failed");
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <h3 className="text-center mb-4">Edit Contact</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
            </Form.Group>

            <div className="d-grid">
              <Button type="submit" variant="primary">Update Contact</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditContactPage;
