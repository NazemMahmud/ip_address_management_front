import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const DashboardLayout = props => {
    return (
        <Container className="vh-100">
            <Row className="mt-5">
                <Col className="vh-100">
                    { props.children }
                </Col>
            </Row>
        </Container>
    );
};

export default DashboardLayout;
