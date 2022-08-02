import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AuthLayout = props => {
    return (
        <Container className="vh-100">
            <Row>
                <Col className="vh-100 d-flex justify-content-center align-items-center">
                    { props.children }
                </Col>
            </Row>
        </Container>
    );
};

export default AuthLayout;
