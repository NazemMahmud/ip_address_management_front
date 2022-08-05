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
        if (!accessToken) {
            handleLoaderCallback(false);
            navigate("/login");
        }
        /* eslint-disable-next-line */
    }, [accessToken, navigate]);

    // to show/hide loader
    const handleLoaderCallback = data => {
        props.logoutCallback(data);
    };

    return (
        <div>
            <NavigationBar loaderCallback={handleLoaderCallback}/>

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
