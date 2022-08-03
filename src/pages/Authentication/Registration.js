import React, { useReducer, useState, useEffect } from 'react';
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthLayout from "../../layout/AuthLayout";
import { checkDisableButton } from "../../utility/utils";


const Registration = () => {
    // for button
    const [isDisabled, setIsDisabled] = useState(true);
    /** ******************* form based action *******************************/
    const [formInput, setFormInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            email: {
                value: '',
                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                isValid: false,
                helperText: '',
                touched: false,
                label: 'Email Address'
            },
            password: {
                value: '',
                helperText: '',
                isValid: false,
                touched: false,
                label: 'Password',
                minLength: 6
            },
            confirmPassword: {
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
        console.log('In: ', formInput);
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
            const input = formInput.confirmPassword;
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

    // sign up action
    const signUp = async event => {
        event.preventDefault();
        // TODO
        // TODO: add a loader
    };

    return (
        <AuthLayout>
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

                        <Form.Group className="mb-3" controlId="formConfirmPassword">
                            <Form.Label> { formInput.confirmPassword.label } <span style={{ color: 'red' }}> * </span></Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control type="password" placeholder="Password"
                                              isInvalid={formInput.confirmPassword.touched && !formInput.confirmPassword.isValid}
                                              name={formInput.confirmPassword.name} defaultValue={formInput.confirmPassword.value}
                                              onChange={event => handleInput(event, inputKeys[2])}
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
                        <Button variant="primary" type="submit"
                                disabled={isDisabled} className="float-right">
                            Sign up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </AuthLayout>
    );
};

export default Registration;
