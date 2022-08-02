import React from 'react';
import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthLayout from "../../../layout/AuthLayout";


const Registration = () => {
    return (
        <AuthLayout>
            <Card className="w-50">
                <Card.Body>
                    <Form className="text-left">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address *</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"/>
                            <Form.Text className="text-muted">
                                Validation error message
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password *</Form.Label>
                            <Form.Control type="password" placeholder="Password"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formConfirmPassword">
                            <Form.Label>Confirm Password *</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password"/>
                        </Form.Group>

                        <Link to="/login"> Already have an new account ? Sign In</Link>
                        <Button variant="primary" type="submit" className="float-right">
                            Sign up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </AuthLayout>
    );
};

export default Registration;
