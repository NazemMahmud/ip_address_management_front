import React, { useReducer, useState, useEffect } from 'react';
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../layout/AuthLayout";
import { checkDisableButton, formatSubmitData } from "../../utility/utils";
import { registration } from "../../services/auth.service";
import { toast, ToastContainer } from "react-toastify";
import ToastComponent from "../../components/ToastComponent";
import 'react-toastify/dist/ReactToastify.css';
import { REGISTRATION_ERROR_MESSAGE } from "../../config/constants";
import LoaderComponent from "../../components/LoaderComponent";

const Registration = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    // for button
    const [isDisabled, setIsDisabled] = useState(true);
    /** ******************* form based action *******************************/
    const [formInput, setFormInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            name: {
                key: "name",
                value: "",
                isValid: false,
                touched: false,
                helperText: '',
                label: 'Name'
            },
            email: {
                key: "email",
                value: '',
                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                isValid: false,
                helperText: '',
                touched: false,
                label: 'Email Address'
            },
            password: {
                key: "password",
                value: '',
                helperText: '',
                isValid: false,
                touched: false,
                label: 'Password',
                minLength: 6
            },
            confirmPassword: {
                key: "password_confirmation",
                value: '',
                isValid: false,
                helperText: '',
                touched: false,
                label: 'Confirm Password'
            }
        }
    );
    const inputKeys = Object.keys(formInput);

    // to enable/disable submit button
    useEffect(() => {
        setIsDisabled(checkDisableButton(formInput));
    }, [formInput]);

    /**
     * In case: confirm password already touched and matched with password
     * But later password is updated, need to invalid field for confirm_password or vice versa
     * @param password
     */
    const checkConfirmPassword = password => {
        const input = formInput.confirmPassword;
        if (input.touched && input.value !== password) {
            input.isValid = false;
            input.helperText = "Password doesn't match";
        } else if (input.touched && input.value === password) {
            input.isValid = true;
            input.helperText = '';
        }

        setFormInput({
            ...formInput,
            confirmPassword: input
        });
    };

    const formValidation = (input, inputIdentifier) => {
        switch (inputIdentifier) {
            case 'name':
                input.isValid = input.value.length;
                input.helperText = !input.isValid ? 'Name is required' : '';
                break;
            case 'email':
                input.isValid = !!(formInput.email.value.match(formInput.email.pattern));
                input.helperText = !input.isValid ? 'Invalid email address' : '';
                break;
            case 'password':
                input.isValid = input.value.length >= formInput.password.minLength;
                input.helperText = !input.isValid ? 'Password is required (min. length is 6)' : '';
                checkConfirmPassword(input.value);
                break;
            case 'confirmPassword':
                input.isValid =  formInput.confirmPassword.value === formInput.password.value;
                input.helperText = (!input.isValid) ? "Password doesn't match" : '';
                break;
            default:
                input.isValid = !!input.value.length;
        }

        setFormInput({
            ...formInput,
            [inputIdentifier]: input
        });
    };

    // register form: on change of an input field action
    const handleInput = (event, inputIdentifier) => {
        const input = formInput[inputIdentifier];
        input.value = event.target.value;
        input.touched = true;
        formValidation(input, inputIdentifier);
    };

    /** ****** Form Submission section  *******/

    // sign up action
    const signUp = async event => {
        event.preventDefault();
            setIsLoading(true);
        await registration(formatSubmitData(formInput))
            .then(response => {
                setIsLoading(false);
                toast.success(<ToastComponent messages={response.data.data.message} />);
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            })
            .catch(error => {
                setIsLoading(false);
                const errorMessage = error?.response?.data?.error ?? REGISTRATION_ERROR_MESSAGE;
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
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label> { formInput.name.label } <span style={{ color: 'red' }}> * </span></Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control type="name" placeholder="Enter Name"
                                              isInvalid={formInput.name.touched && !formInput.name.isValid}
                                              name={formInput.name.name} defaultValue={formInput.name.value}
                                              onChange={event => handleInput(event, inputKeys[0])}
                                />
                                {
                                    formInput.name.touched && !formInput.name.isValid ?
                                        <Form.Control.Feedback type="invalid">
                                            {formInput.name.helperText}
                                        </Form.Control.Feedback> : <></>
                                }
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label> { formInput.email.label } <span style={{ color: 'red' }}> * </span></Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control type="email" placeholder="Enter Email"
                                              isInvalid={formInput.email.touched && !formInput.email.isValid}
                                              name={formInput.email.name} defaultValue={formInput.email.value}
                                              onChange={event => handleInput(event, inputKeys[1])}
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
                                                  onChange={event => handleInput(event, inputKeys[2])}
                                    />

                                    {
                                        formInput.password.touched && !formInput.password.isValid  ?
                                            <Form.Control.Feedback type="invalid">
                                                {formInput.password.helperText}
                                            </Form.Control.Feedback> : <></>
                                    }
                                </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formConfirmPassword">
                            <Form.Label> { formInput.confirmPassword.label } <span style={{ color: 'red' }}> * </span></Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control type="password" placeholder="Password"
                                              isInvalid={formInput.confirmPassword.touched && !formInput.confirmPassword.isValid}
                                              name={formInput.confirmPassword.name} defaultValue={formInput.confirmPassword.value}
                                              onChange={event => handleInput(event, inputKeys[3])}
                                />

                                {
                                    formInput.confirmPassword.touched && !formInput.confirmPassword.isValid  ?
                                        <Form.Control.Feedback type="invalid">
                                            {formInput.confirmPassword.helperText}
                                        </Form.Control.Feedback> : <></>
                                }
                            </InputGroup>
                        </Form.Group>

                        <Link to="/login"> Already have an new account ? Sign In</Link>
                        <Button variant="primary" type="submit" disabled={isDisabled}
                                className="float-right"  onClick={signUp}>
                            Sign up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </AuthLayout>
    );
};

export default Registration;
