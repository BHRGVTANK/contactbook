import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Container, Form as BSForm, Row } from 'react-bootstrap';
import './AddContactsPage.css';
import axios from 'axios';

const AddContactPage = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    phone: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Enter a valid 10-digit phone number')
      .required('Phone is required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await axios.post('/api/auth/addcontact', values);
      alert(res.data.message || 'Contact added successfully');
      resetForm();
      navigate('/view-contacts');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add contact');
    }
  };

  return (
    <div className="add-contact-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="add-contact-card">
              <Card.Body>
                <h3 className="text-center mb-4">Add New Contact</h3>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ values, handleChange, handleBlur, errors, touched }) => (
                    <Form>
                      <BSForm.Group className="mb-3">
                        <BSForm.Label>Name</BSForm.Label>
                        <BSForm.Control
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.name && errors.name}
                          placeholder="Enter full name"
                        />
                        <BSForm.Control.Feedback type="invalid">
                          {errors.name}
                        </BSForm.Control.Feedback>
                      </BSForm.Group>

                      <BSForm.Group className="mb-3">
                        <BSForm.Label>Email</BSForm.Label>
                        <BSForm.Control
                          name="email"
                          type="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.email && errors.email}
                          placeholder="Enter email address"
                        />
                        <BSForm.Control.Feedback type="invalid">
                          {errors.email}
                        </BSForm.Control.Feedback>
                      </BSForm.Group>

                      <BSForm.Group className="mb-3">
                        <BSForm.Label>Phone</BSForm.Label>
                        <BSForm.Control
                          name="phone"
                          value={values.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.phone && errors.phone}
                          placeholder="Enter phone number"
                        />
                        <BSForm.Control.Feedback type="invalid">
                          {errors.phone}
                        </BSForm.Control.Feedback>
                      </BSForm.Group>

                      <div className="d-grid">
                        <Button type="submit" variant="primary" size="lg">
                          Add Contact
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddContactPage;
