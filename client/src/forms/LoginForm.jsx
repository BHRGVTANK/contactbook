// src/pages/LoginPage.jsx
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Button, Card, Col, Container, Form as BSForm, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await axios.post('/api/auth/login', values);
      alert(res.data.message || 'Login successful');
      resetForm();
      navigate('/dashboard')
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed';
      alert(msg);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h3 className="text-center mb-4">Login</h3>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ values, handleChange, handleBlur, errors, touched }) => (
                  <Form>
                    <BSForm.Group className="mb-3">
                      <BSForm.Label>Email</BSForm.Label>
                      <BSForm.Control
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.email && !!errors.email}
                      />
                      <BSForm.Control.Feedback type="invalid">{errors.email}</BSForm.Control.Feedback>
                    </BSForm.Group>

                    <BSForm.Group className="mb-3">
                      <BSForm.Label>Password</BSForm.Label>
                      <BSForm.Control
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.password && !!errors.password}
                      />
                      <BSForm.Control.Feedback type="invalid">{errors.password}</BSForm.Control.Feedback>
                    </BSForm.Group>

                    <div className="d-grid mb-3">
                      <Button type="submit" variant="primary" size="lg">Login</Button>
                    </div>

                    <div className="text-center">
                      <small>
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary">Register</Link>
                      </small>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
