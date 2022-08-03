import React from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { Button, Card, Form, Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const data = [
        {
            id: 1,
            ip: '127.0.0.1',
            label: 'localhost'
        },
        {
            id: 2,
            ip: '127.0.0.1',
            label: 'localhost'
        },
        {
            id: 3,
            ip: '127.0.0.1',
            label: 'localhost'
        },
        {
            id: 4,
            ip: '127.0.0.1',
            label: 'localhost'
        },
        {
            id: 5,
            ip: '127.0.0.1',
            label: 'localhost'
        },
        {
            id: 6,
            ip: '127.0.0.1',
            label: 'localhost'
        },
        {
            id: 7,
            ip: '127.0.0.1',
            label: 'localhost'
        },
        {
            id: 8,
            ip: '127.0.0.1',
            label: 'localhost'
        },
        {
            id: 9,
            ip: '127.0.0.1',
            label: 'localhost'
        },
        {
            id: 10,
            ip: '127.0.0.1',
            label: 'localhost'
        },
        {
            id: 11,
            ip: '127.0.0.1',
            label: 'localhost'
        },
        {
            id: 12,
            ip: '127.0.0.1',
            label: 'localhost'
        }
    ];
    return (
        <DashboardLayout>
            <Row className="mb-5">
                <Col>
                    <Card >
                        <Card.Body>
                            <Form className="text-left">
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label> IP address </Form.Label>
                                    <Form.Control type="text" placeholder="Ex: 172.0.0.1" required />
                                    <Form.Text className="text-muted">
                                        Validation error message
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label> Label/Comment</Form.Label>
                                    <Form.Control type="text" placeholder="Ex: BC2 server" required />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="float-right">
                                    Submit
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card>
                        <Card.Body className="m-0 p-0">
                            <Table striped bordered hover size="sm" className="mb-0 pb-0" >
                                <thead>
                                    <tr>
                                        <th>IP Address</th>
                                        <th>Label</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map(info =>
                                            <tr>
                                                <td> {info.ip} </td>
                                                <td> {info.label} </td>
                                                <td>
                                                    <Button variant="warning" type="button">
                                                        Update
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mb-5 mt-0 pb-5 pt-0">
                <Col className="mt-0 pt-0">
                    <Card className="mt-0 pt-0">
                        <Card.Body className="mt-0">
                            <div className="float-right">
                                <Button variant="primary" type="button" >
                                    Prev
                                </Button>
                                <span className="ml-2 mr-2"> 1 - 20 of 100</span>
                                <Button variant="primary" type="button" >
                                    Next
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </DashboardLayout>
    );
};

export default Dashboard;
