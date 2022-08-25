import React from "react";
import { useDispatch } from "react-redux";
import { Container, Navbar, Form, Button, Nav } from 'react-bootstrap';
import { logout } from "../services/auth.service";
import { handleLogout } from "../redux/states/authSlice";
import { toast, ToastContainer } from "react-toastify";
import ToastComponent from "./ToastComponent";
import 'react-toastify/dist/ReactToastify.css';
import { SOMETHING_WENT_WRONG } from "../config/constants";

const NavigationBar = ({ loaderCallback }) => {

    const dispatch = useDispatch();

    // log out action
    const signOut = async event => {
        event.preventDefault();
        loaderCallback(true);
        await logout()
            .then(response => {
                dispatch(handleLogout());
            })
            .catch(error => {
                const errorMessage = error?.response?.data?.error ?? SOMETHING_WENT_WRONG;
                toast.error(<ToastComponent messages={errorMessage}/>);
                loaderCallback(false);
            });
    };

    return (
        <Navbar bg="dark" variant="dark">
            <ToastContainer position={"top-right"}
                            autoClose={3000}
                            hideProgressBar={false}
                            closeOnClick
                            pauseOnFocusLoss
                            draggable/>
            <Container>
                <Navbar.Brand href="/"> IP Management </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav>
                    <Nav.Link href="/ip-address"> IP Address </Nav.Link>
                    <Nav.Link href="/audit-log"> Audit Log </Nav.Link>
                </Nav>

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
