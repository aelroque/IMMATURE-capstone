import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setErrMsg('');
  }, [username, password]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/register',
        JSON.stringify({ username, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          //withCredentials: true
        }
      );
      console.log(response);
      setSuccess(true);
      setUsername('');
      setPassword('');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed');
      }
    }
  };

  return (
    <Container className="small-container">
      <Helmet>
        <title>Register</title>
      </Helmet>
      {success ? (
        <section>
          <h1>Registration Success!</h1>
          <p>
            <Navigate to="/signin">Sign In</Navigate>
          </p>
        </section>
      ) : (
        <section>
          <p>{errMsg}</p>
          <h1 className="my-3">Sign Up</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <div className="mb-3">
              <Button type="submit">Sign Up</Button>
            </div>
            <div className="mb-3">
              Already have an account? <Link to="/signin">Sign-In</Link>
              <br />
            </div>
          </Form>
        </section>
      )}
      ,
    </Container>
  );
}
export default Register;
