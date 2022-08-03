import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import Datatable from "../../components/Datatable";
import { getAllIp } from "../../services/ip.service";
// import { Link } from "react-router-dom";

const Dashboard = () => {
    const initialParams = {
        orderBy: 'DESC',
        sortBy: 'id',
        pageOffset: 10,
        page: 1
    };

    const [params, setParams] = useState(initialParams);
    const [dataList, setDataList] = useState([]);

    /** Get all/paginated ip address data for table **/
    useEffect( () => {
        getDataList();
    }, []);

    const getDataList = async () => {
        await getAllIp(params)
            .then(res => {
                const response = res.data.data;
                // TODO: set pagination info
                setDataList(response);
            })
            .catch(error => {
                // TODO: add a toaster
                console.log('error..', error);
            });
        // TODO: add a loader
    };

    return (
        <DashboardLayout>
            <Row className="mb-5">
                <Col>
                    <Card >
                        <Card.Body>
                            <Form className="text-left">
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label> IP address </Form.Label>
                                    <Form.Control type="text" placeholder="Ex: 172.0.0.1" required />
                                    <Form.Text className="text-muted">
                                        Validation error message
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label> Label/Comment</Form.Label>
                                    <Form.Control type="text" placeholder="Ex: BC2 server" required />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="float-right">
                                    Submit
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Datatable data={dataList}/>
                </Col>
            </Row>

            <Row className="mb-5 mt-0 pb-5 pt-0">
                <Col className="mt-0 pt-0">
                    <Card className="mt-0 pt-0">
                        <Card.Body className="mt-0">
                            <div className="float-right">
                                <Button variant="primary" type="button" >
                                    Prev
                                </Button>
                                <span className="ml-2 mr-2"> 1 - 20 of 100</span>
                                <Button variant="primary" type="button" >
                                    Next
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </DashboardLayout>
    );
};

export default Dashboard;
