import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavigationBar from "../components/NavigationBar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const DashboardLayout = props => {

    const navigate = useNavigate();
    const { accessToken } = useSelector(state => state.auth);

    // redirect if not logged in
    useEffect(() => {
        console.log('sadsad: ', accessToken);
        if (!accessToken) {
            navigate("/login");
        }
    }, [accessToken, navigate]);

    return (
        <div>
            <NavigationBar />

            <Container className="vh-100">
                <Row className="mt-5">
                    <Col className="vh-100">
                        { props.children }
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default DashboardLayout;
