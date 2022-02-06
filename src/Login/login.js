import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import axios from "axios";
import validator from "validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [state, setState] = React.useState({
    phoneNumber: "",
    password: "",
  });

  const [errors, setError] = React.useState({});

  const headers = {
    "cb-client-api-key": "6df22a6a-c971-493f-9161-6ecfc72ddc35",
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    console.log(isValid);
    console.log(errors);
    if (isValid) {
      axios
        .post("http://3.135.237.248:5222/v0.0.1/auth/login", state, {
          headers: headers,
        })
        .then((res) => {
          toast.success("Login success");
          console.log(res.data);
        })
        .catch((err) => {
          toast.error(" invalid credentials");
          console.log(err);
        });
    }
  };

  const validate = () => {
    let errorBox = {};
    if (
      !validator.isNumeric(state.phoneNumber) ||
      state.phoneNumber.length <= 0
    ) {
      errorBox["phoneNumber"] = "Enter numeric data !";
    }
    if (state.password.length <= 0) {
      errorBox["password"] = "Password must not be null !";
    }

    console.log(errorBox.phoneNumber);
    if (Object.keys(errorBox).length > 0) {
      setError(errorBox);
      return false;
    } else {
      return true;
    }
  };

  return (
    <Container fluid className="mains">
      <Row>
        <Col className="content">
          <Form className="Login" onSubmit={handleSubmit}>
            <h4 className="heading">Login</h4>

            <Form.Group className="mb-3">
              <Form.Label className="phone">Phone Number</Form.Label>
              <Form.Control
                id="phoneNumber"
                className="input-login"
                type="text"
                value={state.phoneNumber}
                onChange={handleChange}
                placeholder="Enter phone number.."
              />
            </Form.Group>
            {errors["phoneNumber"] && (
              <p className="valid" style={{ fontSize: 12, color: "red" }}>
                {errors["phoneNumber"]}
              </p>
            )}

            <Form.Group className="mb-3">
              <Form.Label className="phone">Password</Form.Label>
              <Form.Control
                id="password"
                className="input-login"
                type="password"
                value={state.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </Form.Group>
            {errors["password"] && (
              <p className="valid" style={{ fontSize: 12, color: "red" }}>
                {errors["password"]}
              </p>
            )}
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Row>
                <Col>
                  {" "}
                  <Form.Check type="checkbox" label="Remember my password" />
                </Col>
                <Col>
                  {" "}
                  <a href="##" className="forgot-password">
                    Forgot Password?
                  </a>
                </Col>
              </Row>
            </Form.Group>
            <Button className="btnSubmit" variant="primary" type="submit">
              Submit
            </Button>
            <p className="message">Don't have an account?</p>
            {/* <Form.Text className="message">Don't have an account?</Form.Text> */}
            <Button className="createAccount" variant="primary" type="submit">
              Create Account
            </Button>
          </Form>
        </Col>
        <Col className="imageBg">
          <div>
            <img src="/login.png" alt="mobile" />
          </div>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}

export default Login;
