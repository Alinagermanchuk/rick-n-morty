import { Formik } from "formik";
import { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Nav,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "reactfire";
import * as yup from "yup";
import { signInFirebaseUser, signUpFirebaseUser } from "../services/firebase";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("First Name is a required field"),
  lastName: yup.string().required("Last Name is a required field"),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const loginInitialValues = {
  email: "test@test.com",
  password: "test@test.com",
};

const registerInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export function AuthPage({ isLoginForm }) {
  const auth = useAuth();
  const [errorMsg, setErrorMsg] = useState();

  const schema = isLoginForm ? loginSchema : registerSchema;
  const initialValues = isLoginForm
    ? loginInitialValues
    : registerInitialValues;

  async function onSubmitHandler(values) {
    try {
      if (isLoginForm) {
        await signInFirebaseUser(auth, values);
      } else {
        await signUpFirebaseUser(auth, values);
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
  }

  return (
    <Container>
      <Row className="my-4">
        {isLoginForm ? (
          <h3 style={{ textAlign: "center" }}>Login</h3>
        ) : (
          <h3 style={{ textAlign: "center" }}>Register an account</h3>
        )}
      </Row>
      <Row>
        <Col sm={1} md={3} />
        <Col sm={10} md={6}>
          <Formik
            validationSchema={schema}
            onSubmit={onSubmitHandler}
            initialValues={initialValues}
            // validator={() => ({})}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => {
              return (
                <Form noValidate onSubmit={handleSubmit}>
                  {!isLoginForm && (
                    <Row className="mb-3">
                      <Form.Group as={Col} md="4" className="w-50">
                        <Form.Label>First Name</Form.Label>
                        <InputGroup hasValidation>
                          <Form.Control
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            isInvalid={touched.firstName && !!errors.firstName}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.firstName}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>

                      <Form.Group as={Col} md="4" className="w-50">
                        <Form.Label>Last Name</Form.Label>
                        <InputGroup hasValidation>
                          <Form.Control
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            isInvalid={touched.lastName && !!errors.lastName}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.lastName}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                    </Row>
                  )}
                  <Row className="mb-3">
                    <Form.Group as={Col} md="4" className="w-100">
                      <Form.Label>Email</Form.Label>
                      <InputGroup hasValidation>
                        <InputGroup.Text id="inputGroupPrepend">
                          @
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          placeholder="Email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          isInvalid={touched.email && !!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="4" className="w-100">
                      <Form.Label>Password</Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          isInvalid={touched.password && !!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Row>
                  {errorMsg && (
                    <Alert className="mt-3" variant="danger">
                      {errorMsg}
                    </Alert>
                  )}
                  <Row>
                    <Col>
                      <Button
                        type="submit"
                        className="w-100"
                        variant="outline-dark"
                      >
                        {isLoginForm ? "Login" : "Register"}
                      </Button>
                    </Col>
                    <Col style={{ display: "flex", alignItems: "center" }}>
                      {isLoginForm ? (
                        <p
                          style={{
                            marginBottom: 0,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          Don't have an account?
                          <Nav.Link
                            as={Link}
                            to="/register"
                            style={{
                              color: "gray",
                              textDecoration: "underline",
                              padding: "5px",
                            }}
                          >
                            REGISTER!
                          </Nav.Link>
                        </p>
                      ) : (
                        <p
                          style={{
                            marginBottom: 0,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          Already have an account? &nbsp;
                          <Nav.Link
                            as={Link}
                            to="/login"
                            style={{
                              color: "gray",
                              textDecoration: "underline",
                              padding: "5px",
                            }}
                          >
                            LOGIN!
                          </Nav.Link>
                        </p>
                      )}
                    </Col>
                  </Row>
                </Form>
              );
            }}
          </Formik>
        </Col>
        <Col sm={1} md={3} />
      </Row>
    </Container>
  );
}
