import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Container, Form as BSForm, Row } from 'react-bootstrap';

const RegisterPage = () => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    mobile: '',
    gender: '',
    city: '',
    terms: false,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
    mobile: Yup.string().matches(/^[0-9]{10}$/, 'Enter valid 10-digit number').required('Mobile is required'),
    gender: Yup.string().required('Gender is required'),
    city: Yup.string().required('City is required'),
    terms: Yup.boolean().oneOf([true], 'Accept terms to continue'),
  });

  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await axios.post('/api/auth/register', values);
      alert(res.data.message);
      resetForm();
      navigate('/login');
    } catch (error) {
      const msg = error.response?.data?.message || 'Registration failed';
      alert(msg);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Body>
              <h3 className="text-center mb-4">Register</h3>
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ values, handleChange, handleBlur, errors, touched }) => (
                  <Form>
                    <BSForm.Group className="mb-3">
                      <BSForm.Label>Name</BSForm.Label>
                      <BSForm.Control
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.name && !!errors.name}
                      />
                      <BSForm.Control.Feedback type="invalid">{errors.name}</BSForm.Control.Feedback>
                    </BSForm.Group>

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

                    <BSForm.Group className="mb-3">
                      <BSForm.Label>Mobile</BSForm.Label>
                      <BSForm.Control
                        name="mobile"
                        value={values.mobile}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.mobile && !!errors.mobile}
                      />
                      <BSForm.Control.Feedback type="invalid">{errors.mobile}</BSForm.Control.Feedback>
                    </BSForm.Group>

                    <BSForm.Group className="mb-3">
                      <BSForm.Label>Gender</BSForm.Label><br />
                      <BSForm.Check
                        inline
                        label="Male"
                        type="radio"
                        name="gender"
                        value="male"
                        checked={values.gender === 'male'}
                        onChange={handleChange}
                        isInvalid={touched.gender && !!errors.gender}
                      />
                      <BSForm.Check
                        inline
                        label="Female"
                        type="radio"
                        name="gender"
                        value="female"
                        checked={values.gender === 'female'}
                        onChange={handleChange}
                        isInvalid={touched.gender && !!errors.gender}
                      />
                      <div className="text-danger small">{touched.gender && errors.gender}</div>
                    </BSForm.Group>

                    <BSForm.Group className="mb-3">
                      <BSForm.Label>City</BSForm.Label>
                      <BSForm.Control
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.city && !!errors.city}
                      />
                      <BSForm.Control.Feedback type="invalid">{errors.city}</BSForm.Control.Feedback>
                    </BSForm.Group>

                    <BSForm.Group className="mb-3">
                      <BSForm.Check
                        type="checkbox"
                        id="terms"
                        name="terms"
                        label="I accept the terms and conditions"
                        checked={values.terms}
                        onChange={handleChange}
                        isInvalid={touched.terms && !!errors.terms}
                      />
                      <div className="text-danger small">{touched.terms && errors.terms}</div>
                    </BSForm.Group>

                    <div className="d-grid">
                      <Button type="submit" variant="primary" size="lg">Register</Button>
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

export default RegisterPage;
