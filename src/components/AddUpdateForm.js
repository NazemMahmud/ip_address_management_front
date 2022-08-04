import React, { useEffect, useReducer, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import ToastComponent from "./ToastComponent";
import { storeIp, updateIp } from "../services/ip.service";
import { checkDisableButton } from "../utility/utils";
import 'react-toastify/dist/ReactToastify.css';
import { DATA_CREATE_SUCCESS, DATA_CREATE_FAILED, DATA_UPDATE_FAILED } from "../config/constants";

const AddUpdateForm = ({ updateData, ipAddCallback, ipUpdateCallback, loaderCallback }) => {
    const [isDisabled, setIsDisabled] = useState(true);

    // ip address add / update form
    const [formInput, setFormInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            ip: {
                value: "",
                pattern: /(?:^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$)|(?:^(?:(?:[a-fA-F\d]{1,4}:){7}(?:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,2}|:)|(?:[a-fA-F\d]{1,4}:){4}(?:(?::[a-fA-F\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,3}|:)|(?:[a-fA-F\d]{1,4}:){3}(?:(?::[a-fA-F\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,4}|:)|(?:[a-fA-F\d]{1,4}:){2}(?:(?::[a-fA-F\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,5}|:)|(?:[a-fA-F\d]{1,4}:){1}(?:(?::[a-fA-F\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,6}|:)|(?::(?:(?::[a-fA-F\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,7}|:)))(?:%[0-9a-zA-Z]{1,})?$)/,
                isValid: false,
                helperText: "",
                touched: false
            },
            label: {
                value: "",
                isValid: false,
                helperText: "",
                touched: false
            },
        }
    );
    const inputKeys = Object.keys(formInput);

    /** If there is a data to populate, then populate the form for update action  */
    useEffect(() => {
        if (updateData.id) {
            const formData = { ...formInput };
            formData.ip.value = updateData.ip;
            formData.ip.isValid = true;
            formData.label.value = updateData.label;
            formData.label.isValid = true;
            setFormInput(formData);
        }
    }, [updateData]);

    const formValidation = (input, inputIdentifier) => {
        switch (inputIdentifier) {
            case 'ip':
                input.isValid = !!(formInput.ip.value.match(formInput.ip.pattern));
                input.helperText = !input.isValid ? 'Invalid IP address' : '';
                break;
            case 'label':
                input.isValid = input.value.length;
                input.helperText = !input.isValid ? 'Label/comment is required' : '';
                break;
            default:
                break;
        }

        setFormInput({
            ...formInput,
            [inputIdentifier]: input
        });
    };

    // to enable/disable submit button
    useEffect(() => {
        setIsDisabled(checkDisableButton(formInput));
    }, [formInput]);

    // handle form input validation
    const handleInput = (event, inputIdentifier) => {
        const input = formInput[inputIdentifier];
        input.value = event.target.value;
        input.touched = true;
        formValidation(input, inputIdentifier);
    };

    // reset form after submit successful
    const resetForm = () => {
        const formData = { ...formInput };
        for (let item in formData) {
            formData[item].value = '';
            formData[item].isValid = false;
            formData[item].touched = false;
        }
        setFormInput({ ...formInput, ...formData });
    };


    // create new entry API call
    const create = async event => {
        event.preventDefault();
        const formData = {};
        for (let item in formInput) {
            formData[item] = formInput[item].value;
        }
        // to start loader
        loaderCallback(true);
        await storeIp(formData)
            .then(response => {
                resetForm();
                ipAddCallback(response.data.data);
                toast.success(<ToastComponent messages={DATA_CREATE_SUCCESS} />);
            })
            .catch(error => {
                const errorMessage = error?.response?.data?.error ?? DATA_CREATE_FAILED;
                loaderCallback(false);
                toast.error(<ToastComponent messages={errorMessage}/>);
            });
    };

    // update API call
    const update = async event => {
        event.preventDefault();
        const formData = {};
        for (let item in formInput) {
            formData[item] = formInput[item].value;
        }

        // to start loader
        loaderCallback(true);
        await updateIp(formData, updateData.id)
            .then(response => {
                updateData = {
                    ...updateData,
                    ip: formData.ip,
                    label: formData.label,
                };
                ipUpdateCallback(updateData);
                resetForm();
                toast.success(<ToastComponent messages={response.data.data.message} />);
            })
            .catch(error => {
                const errorMessage = error?.response?.data?.error ?? DATA_UPDATE_FAILED;
                loaderCallback(false);
                toast.error(<ToastComponent messages={errorMessage}/>);
            });
    };

    return (
        <div>
            <ToastContainer position={"top-right"}
                            autoClose={3000}
                            hideProgressBar={false}
                            closeOnClick
                            pauseOnFocusLoss
                            draggable/>
            <Form className="text-left" onSubmit={updateData.id ? update : create}>
                <Form.Group className="mb-3" controlId="formIP">
                    <Form.Label> IP address <span style={{ color: 'red' }}> * </span> </Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control type="text" placeholder="Ex: 127.0.0.1"
                                      isInvalid={formInput.ip.touched && !formInput.ip.isValid}
                                      name={formInput.ip.name} value={formInput.ip.value}
                                      onChange={event => handleInput(event, inputKeys[0])}/>
                        {
                            formInput.ip.touched && !formInput.ip.isValid ?
                                <Form.Control.Feedback type="invalid">
                                    {formInput.ip.helperText}
                                </Form.Control.Feedback> : <></>
                        }
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLabel">
                    <Form.Label> Label/Comment <span style={{ color: 'red' }}> * </span> </Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control type="text" placeholder="Ex: BC2 server"
                                      isInvalid={formInput.label.touched && !formInput.label.isValid}
                                      name={formInput.label.name} value={formInput.label.value}
                                      onChange={event => handleInput(event, inputKeys[1])}/>
                        {
                            formInput.label.touched && !formInput.label.isValid ?
                                <Form.Control.Feedback type="invalid">
                                    {formInput.label.helperText}
                                </Form.Control.Feedback> : <></>
                        }
                    </InputGroup>
                </Form.Group>

                <Button variant="primary" type="submit" className="float-right"
                        disabled={isDisabled}>
                    {updateData.id ? 'Update' : 'Submit'}
                </Button>

            </Form>
        </div>

    );
};

export default AddUpdateForm;
