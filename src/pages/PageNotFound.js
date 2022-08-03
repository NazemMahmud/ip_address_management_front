import React from "react";
import {Container, Row, Col, Card, Form, Button} from 'react-bootstrap';
import {Link} from "react-router-dom";

const PageNotFound = () => {
    return (
        <Container className="vh-100">
            <Row>
                <Col className="vh-100 d-flex justify-content-center align-items-center">
                    <Card className="w-50 h-50 " style={{ backgroundColor: '#ff991f' }}>
                        <Card.Body className="d-flex justify-content-center align-items-center">
                            <h1> 404... Page Not Found </h1>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default PageNotFound;
