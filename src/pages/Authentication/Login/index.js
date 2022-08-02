import React from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import AuthLayout from "../../../layout/AuthLayout";
import { Link } from "react-router-dom";


const Login = () => {
    return (
        <AuthLayout>
            <Card className="w-50">
                <Card.Body>
                    <Form className="text-left">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"/>
                            <Form.Text className="text-muted">
                                Validation error message
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out"/>
                        </Form.Group>
                        <Link to="/register"> Sign up a new account</Link>
                        <Button variant="primary" type="submit" className="float-right">
                            Sign in
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </AuthLayout>
    );
};

export default Login;
