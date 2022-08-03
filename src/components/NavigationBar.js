import React from "react";
import { useDispatch } from "react-redux";
import { Container, Navbar, Form, Button } from 'react-bootstrap';
import { logout } from "../services/auth.service";
import { handleLogout } from "../redux/authentication";

const NavigationBar = () => {

    const dispatch = useDispatch();

    // log out action
    const signOut = async event => {
        event.preventDefault();
        // TODO: add a loader
        await logout()
            .then(response => {
                dispatch(handleLogout());
            })
            .catch(error => {
                console.log('error..', error);
            });
    };

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                </Navbar.Collapse>
                <Form inline className="mx-3">
                    <Button variant="secondary" type="button" onClick={signOut} className="border-0 bg-transparent">Logout</Button>
                </Form>
            </Container>
        </Navbar>
    );
};


export default NavigationBar;
