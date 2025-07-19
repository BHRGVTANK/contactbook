import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Row, Col, Card, Table, Button } from "react-bootstrap";
import "./ViewContacts.css"; // your existing custom design

const ViewContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get("/api/auth/getcontacts");
        setContacts(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch contacts");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleEdit = (id) => {
    navigate(`/editcontact/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contact?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/auth/contact/${id}`);
      setContacts(contacts.filter((contact) => contact._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const renderSkeletonRows = (count = 3) =>
    Array.from({ length: count }).map((_, index) => (
      <tr key={index}>
        <td>
          <Skeleton height={20} />
        </td>
        <td>
          <Skeleton height={20} />
        </td>
        <td>
          <Skeleton height={20} />
        </td>
        <td>
          <Skeleton height={30} width={100} />
        </td>
      </tr>
    ));

  return (
    <div className="view-contacts-page" id="print-area">
      <Row className="justify-content-center mb-4">
        <Col md={10}>
          <h2 className="text-center view-title">All Contacts</h2>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="view-contacts-card">
            <Card.Body>
              {error ? (
                <div className="text-center text-danger py-3">{error}</div>
              ) : (
                <Table
                  bordered
                  responsive
                  className="text-center view-contacts-table"
                >
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      renderSkeletonRows()
                    ) : contacts.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center text-muted py-3">
                          No contacts found.
                        </td>
                      </tr>
                    ) : (
                      contacts.map((contact, index) => (
                        <tr key={index}>
                          <td>{contact.name}</td>
                          <td>{contact.email}</td>
                          <td>{contact.phone}</td>
                          <td>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="me-2"
                              onClick={() => handleEdit(contact._id)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDelete(contact._id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ViewContacts;
