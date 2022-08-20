import React, { useEffect, useReducer, useState } from 'react';
import { Card, Button, Form, InputGroup } from 'react-bootstrap';
import AuthLayout from "../../layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkDisableButton, formatSubmitData } from "../../utility/utils";
import { login } from "../../services/auth.service";
import { handleLogin } from "../../redux/authSlice";
import { toast, ToastContainer } from "react-toastify";
import ToastComponent from "../../components/ToastComponent";
import 'react-toastify/dist/ReactToastify.css';
import { LOGIN_ERROR_MESSAGE } from "../../config/constants";
import LoaderComponent from "../../components/LoaderComponent";
// import { useLoginUserQuery } from "../../redux/api/authApi";


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const [ loginUser, { isError, error, isSuccess }] = useLoginUserQuery();
    const { accessToken } = useSelector(state => state.auth);

    const [isLoading, setIsLoading] = useState(false);
    // for sign in button
    const [isDisabled, setIsDisabled] = useState(true);

    // redirect if logged in
    useEffect(() => {
        if (accessToken) {
            navigate("/");
        }
    }, [accessToken, navigate]);

    /** ******************* form based action *******************************/
    const [formInput, setFormInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            email: {
                key: 'email',
                value: '',
                /* eslint-disable-next-line */
                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                isValid: false,
                helperText: '',
                touched: false,
                label: 'Email Address'
            },
            password: {
                key: 'password',
                value: '',
                helperText: '',
                isValid: false,
                touched: false,
                label: 'Password',
                minLength: 6
            }
        }
    );
    const inputKeys = Object.keys(formInput);

    // to enable/disable submit button
    useEffect(() => {
        setIsDisabled(checkDisableButton(formInput));
    }, [formInput]);

    const formValidation = (input, inputIdentifier) => {
        switch (inputIdentifier) {
            case 'email':
                input.isValid = !!(formInput.email.value.match(formInput.email.pattern));
                input.helperText = !input.isValid ? 'Invalid email address' : '';
                break;
            case 'password':
                input.isValid = input.value.length >= formInput.password.minLength;
                input.helperText = !input.isValid ? 'Password is required (min. length is 6)' : '';
                break;
            default:
                break;
        }

        setFormInput({
            ...formInput,
            [inputIdentifier]: input
        });
    };

    // login form: on change of an input field action
    const handleInput = (event, inputIdentifier) => {
        const input = formInput[inputIdentifier];
        input.value = event.target.value;
        input.touched = true;
        formValidation(input, inputIdentifier);
    };

    /** **************** Form Submit ***********/
        // sign up action
    const signIn = async event => {
            event.preventDefault();
            const formData = formatSubmitData(formInput);
            setIsLoading(true);
            // await loginUser(formData)
            //     .unwrap()
            //     .then(() => {
            //         setIsLoading(false);
            //     }).catch(error => {
            //     setIsLoading(false);
            //     const errorMessage = error?.response?.data?.error ?? LOGIN_ERROR_MESSAGE;
            //     toast.error(<ToastComponent messages={errorMessage}/>);
            // });
            await login(formData)
                .then(response => {
                    setIsLoading(false);
                    dispatch(handleLogin(response.data.data));
                })
                .catch(error => {
                    setIsLoading(false);
                    const errorMessage = error?.response?.data?.error ?? LOGIN_ERROR_MESSAGE;
                    toast.error(<ToastComponent messages={errorMessage}/>);
                });
        };

    return (
        <AuthLayout>
            <ToastContainer position={"top-right"}
                            autoClose={3000}
                            hideProgressBar={false}
                            closeOnClick
                            pauseOnFocusLoss
                            draggable/>

            <LoaderComponent isLoading={isLoading} />

            <Card className="w-50">
                <Card.Body>
                    <Form className="text-left">
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label> { formInput.email.label } <span style={{ color: 'red' }}> * </span></Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control type="email" placeholder="Enter Email"
                                              isInvalid={formInput.email.touched && !formInput.email.isValid}
                                              name={formInput.email.name} defaultValue={formInput.email.value}
                                              onChange={event => handleInput(event, inputKeys[0])}
                                />
                                {
                                    formInput.email.touched && !formInput.email.isValid ?
                                        <Form.Control.Feedback type="invalid">
                                            {formInput.email.helperText}
                                        </Form.Control.Feedback> : <></>
                                }
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label> { formInput.password.label } <span style={{ color: 'red' }}> * </span></Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control type="password" placeholder="Password"
                                              isInvalid={formInput.password.touched && !formInput.password.isValid}
                                              name={formInput.password.name} defaultValue={formInput.password.value}
                                              onChange={event => handleInput(event, inputKeys[1])}
                                />

                                {
                                    formInput.password.touched && !formInput.password.isValid  ?
                                        <Form.Control.Feedback type="invalid">
                                            {formInput.password.helperText}
                                        </Form.Control.Feedback> : <></>
                                }
                            </InputGroup>
                        </Form.Group>

                        <Link to="/register"> Don't have any account ? Sign Up</Link>
                        <Button variant="primary" type="submit" onClick={signIn}
                                disabled={isDisabled} className="float-right">
                            Sign in
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </AuthLayout>
    );
};

export default Login;
